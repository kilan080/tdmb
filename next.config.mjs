/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**', // Fixed: TMDB images use /t/p/ path, not /api/
      },
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org', // Added: You're also using this hostname
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // Added: For YouTube thumbnails
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
};


export default nextConfig;
