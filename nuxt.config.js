// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    ["@vee-validate/nuxt", { autoImports: true }],
    "dayjs-nuxt",
    ["@vueuse/nuxt", { ssr: false }],
    ["@nuxtjs/sitemap"],
    "@element-plus/nuxt",
    "@nuxt/icon",
    'nuxt-paypal',
  ],
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID,
  },
  css: [
    "~/assets/scss/index.scss"
  ],
  elementPlus: { /** Options */ },
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
  ],

  compatibilityDate: "2024-11-10",


});
