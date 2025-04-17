/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true // Changed from boolean to object
    },
    typescript: {
        ignoreBuildErrors: false // Ensure strict type checking
    }
};

module.exports = nextConfig;