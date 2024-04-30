/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
            pathname: '/u/**',
          },
          {
            protocol: 'https',
            hostname: '2qfwvfugudkbri9i.public.blob.vercel-storage.com',
            port: '',
            pathname: '/**',
          }
        ]
    }
};

export default nextConfig;
