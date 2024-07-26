/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'www.clker.com',
        port: '',
        pathname: '/cliparts/h/z/Z/5/f/x/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/img/logos/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

// to fix: `Module not found: Can't resolve 'pino-pretty'`
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/',
        destination: '/site/static/index.html',
      },
    ]
  },

};

export default nextConfig;
