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
  env: {
    // Development
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDje5As2Eu3ZryAkvHzP6Uahyhr1YgBOc4",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:  "tdmb-3ca47.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "tdmb-3ca47",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:  "tdmb-3ca47.firebasestorage.app",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "434068541481",
    NEXT_PUBLIC_FIREBASE_APP_ID:  "1:434068541481:web:a7c1a9dc42953e00b28c38",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-RT5G0L3B40",
    
  }
};


export default nextConfig;
