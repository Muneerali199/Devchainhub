/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true, // Make sure this is an object if you need other experimental features
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // other config...
};

module.exports = nextConfig;