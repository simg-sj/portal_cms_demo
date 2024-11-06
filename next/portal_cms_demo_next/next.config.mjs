/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript : {
        ignoreBuildErrors : true
    },
    images: {
        domains: ['db-document-file.s3.ap-northeast-2.amazonaws.com'],
    },
};

export default nextConfig;
