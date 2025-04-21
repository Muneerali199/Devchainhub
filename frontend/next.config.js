/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', // Disable PWA in dev for faster builds
    register: true,
    skipWaiting: true,
});

const nextConfig = {
    experimental: {
        serverActions: {
            enabled: true,
        },
        externalDir: true,
    },
    serverExternalPackages: ['@supabase/supabase-js'],
    eslint: {
        ignoreDuringBuilds: true, // Consider enabling this only temporarily; fix ESLint issues for production
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    output: 'standalone',
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: '**', // Allows all HTTPS hosts; consider restricting to specific domains for security
        }, ],
        // Optimize image loading for modern formats
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60, // Cache images for 60 seconds
        deviceSizes: [320, 640, 768, 1024, 1280, 1536], // Match common device widths
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Optimize for thumbnails
    },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
        };
        // Add support for WebGL and 3D libraries (used by your Globe component)
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ['raw-loader', 'glslify-loader'],
        });
        return config;
    },
    // Add headers for performance and security
    async headers() {
        return [{
            source: '/(.*)',
            headers: [{
                    key: 'X-DNS-Prefetch-Control',
                    value: 'on',
                },
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=63072000; includeSubDomains; preload',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
            ],
        }, ];
    },
};

// Wrap with PWA for mobile optimization
module.exports = withPWA(nextConfig);