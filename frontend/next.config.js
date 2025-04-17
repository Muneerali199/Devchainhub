/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        externalDir: true,
        serverComponentsExternalPackages: ['@supabase/supabase-js']
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    output: 'standalone',
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: '**',
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
    // Security headers removed here since they're in vercel.json
};

module.exports = nextConfig;