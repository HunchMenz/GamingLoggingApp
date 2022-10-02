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
      "picsum.photos",
      "www.gravatar.com",
    ],
  },
  env: {
    TWITCH_HOST_TOKEN: process.env.TWITCH_HOST_TOKEN,
    IGDB_CLIENT_ID: process.env.IGDB_CLIENT_ID,
    IGDB_CLIENT_SECRET: process.env.IGDB_CLIENT_SECRET,
    STEAMGRID_HOST: process.env.STEAMGRID_HOST,
  },
};

module.exports = nextConfig;
