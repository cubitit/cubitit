import { useState } from 'react';
import { pcmToWav } from '../utils/audio';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const useGemini = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isTtsLoading, setIsTtsLoading] = useState(false);

    const fetchGemini = async (prompt, systemPrompt = "", isJson = false) => {
        if (!apiKey) {
            console.error("Gemini API Key is missing");
            return "System configuration error: API Key missing.";
        }
        setLoading(true);
        setError(null);
        let delay = 1000;

        for (let i = 0; i < 5; i++) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        systemInstruction: { parts: [{ text: systemPrompt }] },
                        ...(isJson && { generationConfig: { responseMimeType: "application/json" } })
                    })
                });

                if (!response.ok) throw new Error('API Error');
                const data = await response.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!text) throw new Error('Empty response');

                if (isJson) {
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        return { architecture: "Architecture draft unavailable.", strategy: "Strategy generation error.", timeline: "Estimation failed." };
                    }
                }
                return text;
            } catch (err) {
                if (i === 4) {
                    setError(err);
                    throw err;
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }
        }
        setLoading(false);
    };

    // Wrapper to handle loading state correctly after the loop
    const generate = async (prompt, systemPrompt = "", isJson = false) => {
        setLoading(true);
        try {
            const result = await fetchGemini(prompt, systemPrompt, isJson);
            return result;
        } finally {
            setLoading(false);
        }
    };

    const playTTS = async (text) => {
        if (!apiKey) return;
        setIsTtsLoading(true);
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Professional assistant voice: ${text}` }] }],
                    generationConfig: {
                        responseModalities: ["AUDIO"],
                        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } }
                    },
                    model: "gemini-2.5-flash-preview-tts"
                })
            });
            const result = await response.json();
            const pcmData = result.candidates[0].content.parts[0].inlineData.data;
            const audioBlob = pcmToWav(pcmData, 24000);
            new Audio(URL.createObjectURL(audioBlob)).play();
        } catch (err) {
            console.error(err);
        } finally {
            setIsTtsLoading(false);
        }
    };

    return { generate, playTTS, loading, isTtsLoading, error };
};
