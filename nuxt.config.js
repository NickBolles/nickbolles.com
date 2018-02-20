
const nodeExternals = require('webpack-node-externals')

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
  modules: ["~/modules/typescript.js"],
  plugins: ['~/plugins/vuetify.js'],
  css: [
    '~/assets/style/app.styl'
  ],
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
      "~/plugins/vuetify.js"
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
  }
};
