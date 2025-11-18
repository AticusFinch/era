/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any HTTPS domain
        // For better security, you can specify your WordPress domain:
        // hostname: 'your-wordpress-domain.com',
      },
    ],
  },
};

export default nextConfig;
