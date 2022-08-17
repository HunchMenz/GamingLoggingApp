/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.igdb.com",
      "bulma.io",
      "via.placeholder.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com/",
      "cdn2.steamgriddb.com",
    ],
  },
};

module.exports = nextConfig;
