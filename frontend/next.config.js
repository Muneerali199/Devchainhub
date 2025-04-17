/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true, // Simplified to boolean
        externalDir: true,
        serverComponentsExternalPackages: ['@supabase/supabase-js'] // Add this for Supabase
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false, // Recommended to keep false for production
    },
    output: 'standalone', // Recommended for Vercel deployments
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: '**', // Allow all external images
        }, ],
    },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
        };
        return config;
    },
    // Security headers are now handled in vercel.json
};

module.exports = nextConfig;