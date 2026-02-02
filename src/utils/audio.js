export const pcmToWav = (base64Pcm, sampleRate = 24000) => {
    const pcmBuffer = Uint8Array.from(atob(base64Pcm), c => c.charCodeAt(0)).buffer;
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    const length = pcmBuffer.byteLength;

    view.setUint32(0, 0x46464952, true); // "RIFF"
    view.setUint32(4, 36 + length, true);
    view.setUint32(8, 0x45564157, true); // "WAVE"
    view.setUint32(12, 0x20746d66, true); // "fmt "
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // Byte rate
    view.setUint16(32, 2, true); // Block align
    view.setUint16(34, 16, true); // Bits per sample
    view.setUint32(36, 0x61746164, true); // "data"
    view.setUint32(40, length, true);

    return new Blob([header, pcmBuffer], { type: 'audio/wav' });
};
