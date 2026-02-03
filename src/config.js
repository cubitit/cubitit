const config = {
    contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'info@cubitit.com',
    social: {
        facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || 'https://www.facebook.com/CubitItGroup',
        linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://www.linkedin.com/company/cubitit',
    },
    stats: {
        clients: import.meta.env.VITE_STATS_CLIENTS || '100+',
        sectors: import.meta.env.VITE_STATS_SECTORS || '15+',
        support: import.meta.env.VITE_STATS_SUPPORT || '24/7',
        launches: import.meta.env.VITE_STATS_LAUNCHES || 'Zero',
    }
};

export default config;
