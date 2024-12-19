/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript : {
        ignoreBuildErrors : true
    },
    images: {
        domains: ['db-document-file.s3.ap-northeast-2.amazonaws.com'],
    },
};

export default nextConfig;


