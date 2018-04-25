
const nodeExternals = require('webpack-node-externals')
const ScrollBehavior = require('./modules/scrollbehavior');

const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "Nicks Website",
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
    '@nuxtjs/pwa',
    '@nuxtjs/moment',
    '@nuxtjs/vuetify',
    '@nuxtjs/webpackmonitor',
    // todo: use this
    // ['@nuxtjs/google-analytics', {
    //   id: 'UA-12301-2'
    // }]
  ],
  plugins: [
    '~/plugins/scrollwizardry.js',
    '~/plugins/Vee-Validate.js',
    { src: '~/plugins/vue-parallax.js', ssr: false }
  ],
  css: [
    'node_modules/vuetify/dist/vuetify.min.css',
    // 'node_modules/vuetify/src/stylus/app.styl',
    '~/assets/style/app.styl'
  ],
  vuetify: {
    css: false,
    theme: {
      primary: '#9c27b0',
      accent: '#ce93d8',
      secondary: '#424242',
      info: '#0D47A1',
      warning: '#ffb300',
      error: '#B71C1C',
      success: '#2E7D32'
    },
    // components: {
    //   VApp: require('vuetify/es5/components/VApp').default,
    //   VBtn: require('vuetify/es5/components/VBtn').default,
    //   VAvatar: require('vuetify/es5/components/VAvatar').default,
    //   VIcon: require('vuetify/es5/components/VIcon').default,
    //   VChip: require('vuetify/es5/components/VChip').default,
    //   VForm: require('vuetify/es5/components/VForm').default,
    //   VTextField: require('vuetify/es5/components/VTextField').default,
    //   VTooltip: require('vuetify/es5/components/VTooltip').default,
    //   VProgressLinear: require('vuetify/es5/components/VProgressLinear').default,
    //   VGrid: require('vuetify/es5/components/VGrid').default
    // },
    // transitions: require('vuetify/es5/components/transitions').default,
    // directives: require('vuetify/es5/components/directives').default,
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    ssr: true,
    vendor: [
      "axios",
      "vuex-class",
      "nuxt-class-component",
      "babel-polyfill",
      "vue-parallax-js"
    ],
    plugins: [
    ],
    extend(config, ctx) {
      // if (ctx.isServer) {
      //   config.externals = [
      //     nodeExternals({
      //       whitelist: [/^vuetify/]
      //     })
      //   ];
      // }
    }
  },
  router: {
    scrollBehavior: ScrollBehavior
  },
  // todo: create static/icon.png
  manifest: {
    name: 'Nick\'s Website',
    lang: 'en'
  }
};
