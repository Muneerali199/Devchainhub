/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {}, // Corrected to object format
        externalDir: true, // Helps with module resolution
        // Remove deprecated/unrecognized options
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true, // Optional: Only if needed
    },
    // Remove deprecated swcMinify from root (now enabled by default)
    // Add output configuration if needed
    output: process.env.NEXT_OUTPUT_MODE === 'export' ? 'export' : undefined,
    // Webpack configuration
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
        };
        return config;
    },
    // Enable modern browser features
    headers: async() => [{
        source: '/(.*)',
        headers: [{
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
        }, ],
    }, ],
};

module.exports = nextConfig;