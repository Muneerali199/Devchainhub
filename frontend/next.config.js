/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // Correct serverActions format
        serverActions: {
            enabled: true,
        },
        externalDir: true,
        // Moved outside experimental block
    },
    // Server external packages now at root level
    serverExternalPackages: ['@supabase/supabase-js'],
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
        }],
    },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
        };
        return config;
    }
};

module.exports = nextConfig;