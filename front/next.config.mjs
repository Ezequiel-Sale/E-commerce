/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'todoapplecaba.com.ar',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdsassets.apple.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pikpng.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'outtec.com.ar',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.epic.com.mt',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.apple.com',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'www.patternb.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "scontent.ftuc2-1.fna.fbcdn.net",
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "photos5.appleinsider.com",
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
