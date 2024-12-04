// https://nuxt.com/docs/api/configuration/nuxt-config
import dayjs from 'dayjs';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },

  modules: [
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    ["@vee-validate/nuxt", { autoImports: true }],
    "dayjs-nuxt",
    ["@vueuse/nuxt", { ssr: false }],
    ["@nuxtjs/sitemap"],
    "@element-plus/nuxt"
  ],

  css: ["~/assets/scss/index.scss"],
  elementPlus: {
    dayjs: () => dayjs, // Custom `day.js` instance
  },
  runtimeConfig: {
    public: {
      appBaseUrl: process.env.APP_BASE_URL,
      appSiteUrl: process.env.APP_SITE_URL,
      serverBaseUrl: process.env.SERVER_BASE_URL,
      serverApiUrl: process.env.SERVER_API_URL,
      apiVersion: process.env.API_VERSION
    }
  },

  app: {
    head: {
      title: "ITE"
    }
  },

  sitemap: {
    hostname: process.env.APP_SITE_URL || "https://yourwebsite.com", // Replace with your actual domain
    routes: async () => {
      // You can fetch dynamic routes from an API or define static routes
      return [
        "/page-1",
        "/page-2",
        "/products/product-1",
        "/products/product-2"
      ];
    },
    gzip: true, // Optional: compresses the sitemap.xml file
    exclude: [
      "/admin/**" // Exclude specific routes (like admin routes) if needed
    ]
  },

  plugins: [
    { src: "~/plugins/bootstrap.js", mode: "client" }
  ],

  compatibilityDate: "2024-11-10"
});
