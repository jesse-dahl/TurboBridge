/* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// import { configEnv } from "../../packages/config/env/src/env.nextjs.mjs"

// const {serverConfig,publicConfig} = configEnv()

// /** @type {import("next").NextConfig} */
// const config = {
//   // experimental: {
//   //   appDir: false,
//   // },
//   // async headers() {
//   //   return [
//   //     {
//   //       // matching all API routes
//   //       source: "/api/:path*",
//   //       headers: [
//   //         { key: "Access-Control-Allow-Credentials", value: "true" },
//   //         { key: "Access-Control-Allow-Origin", value: "*" },
//   //         {
//   //           key: "Access-Control-Allow-Methods",
//   //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//   //         },
//   //         {
//   //           key: "Access-Control-Allow-Headers",
//   //           value:
//   //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//   //         },
//   //       ],
//   //     },
//   //   ];
//   // },
//   reactStrictMode: true,
//   serverRuntimeConfig: serverConfig,
//   publicRuntimeConfig: publicConfig,
//   /** Enables hot reloading for local packages without a build step */
//   transpilePackages: ["@bb/trpc"],
//   /** We already do linting and typechecking as separate tasks in CI */
//   eslint: { ignoreDuringBuilds: true },
//   typescript: { ignoreBuildErrors: true },
//   // eslint: { ignoreDuringBuilds: !!process.env.CI },
//   // typescript: { ignoreBuildErrors: !!process.env.CI },
//   /**
//    * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
//    * out.
//    *
//    * @see https://github.com/vercel/next.js/issues/41980
//    */
//   // i18n: {
//   //   locales: ["en"],
//   //   defaultLocale: "en",
//   // },
//   webpack: (config, { webpack }) => {
//     config.plugins.push(new webpack.IgnorePlugin({
//       resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
//     }))

//     return config
//   },
  
// };
// export default config;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
}

export default nextConfig