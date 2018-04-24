
const nodeExternals = require('webpack-node-externals')
const ScrollBehavior = require('./modules/scrollbehavior');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "nicks",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nicks Website" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  modules: [
    "~/modules/typescript.js",
    '@nuxtjs/vuetify'
  ],
  plugins: [
    '~/plugins/scrollwizardry.js',
    '~/plugins/Vee-Validate.js',
    { src: '~/plugins/vue-parallax.js', ssr: false }
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  vuetify: {
    theme: {
      primary: '#9c27b0',
      accent: '#ce93d8',
      secondary: '#424242',
      info: '#0D47A1',
      warning: '#ffb300',
      error: '#B71C1C',
      success: '#2E7D32'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      "axios",
      "gsap",
      "vuex-class",
      "nuxt-class-component",
      "babel-polyfill",
      "vue-parallax-js"
    ],

    extend(config, ctx) {
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  },
  router: {
    scrollBehavior: ScrollBehavior
  }
};
