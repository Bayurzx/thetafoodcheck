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
        ],
    },


    // async rewrites() {
    //     return [
    //       {
    //         source: '/static/:path*',
    //         destination: '/static-html/:path*',
    //       },
    //     ]
    //   },
    
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
