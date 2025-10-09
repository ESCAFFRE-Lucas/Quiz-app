import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.public.blob.vercel-storage.com',
            },
        ],
        qualities: [25, 50, 75, 85, 100],
    },
    experimental: {
        globalNotFound: true,
    },
};

export default nextConfig;
