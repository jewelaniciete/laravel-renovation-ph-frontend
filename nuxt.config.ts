// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  experimental: {
    componentIslands: true
  },

  ssr: true,
  devtools: { enabled: true },

  css: [
    '~/assets/css/icons.css',
    '~/assets/css/tailwind.css',
    '~/assets/libs/swiper/swiper-bundle.min.css',
    '~/assets/libs/choices.js/public/assets/styles/choices.min.css',
    '~/assets/libs/nouislider/nouislider.min.css',
    '~/assets/libs/simplebar/simplebar.min.css',
    '~/assets/libs/glightbox/css/plyr.min.css',
    '~/assets/libs/glightbox/css/glightbox.min.css',
  ],

  app : {
    head : {
      script : [
        {src: '/libs/iconscout/unicons/bundle.js'},
        {src: '/libs/@popperjs/core/umd/popper.min.js'},
        {src: '/libs/swiper/swiper-bundle.min.js'},
        {src: '/libs/choices.js/public/assets/scripts/choices.min.js'},
        {src: '/libs/simplebar/simplebar.min.js'},
        {src: '/libs/nouislider/nouislider.min.js'},
        {src: '/libs/smooth-scroll/smooth-scroll.min.js'},
        {src: '/libs/glightbox/js/glightbox.min.js'},
        {src: '/libs/tw-elements/js/tw-elements.umd.min.js'},
        {src: '/js/pages.js', defer: true},
        {src: '/js/app.js', defer: true},
      ]
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/ui"]
})
