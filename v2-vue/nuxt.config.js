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
      { hid: "charset", charset: "utf-8" },
      { hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nicks Website" }
    ],
    noscript: [
      { innerHTML: '<div style="position: absolute; left:0;right:0,top:0;bottom:0;" class="application theme--dark layout container"><h1 class="primary--text">Please Enable Javascript to view my site</h1></div>', body: true }
    ],
    link: [
      { hid: "favicon", rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { hid: "canonical", rel: "canonical", href: "https://www.nickbolles.com" }

    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  buildModules: [
    '@nuxt/typescript-build',
  '@nuxtjs/vuetify'
],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/webpackmonitor',
    ['@nuxtjs/google-analytics', {
      id: 'UA-55275349-7'
    }]
  ],
  plugins: [
    '~/plugins/scrollwizardry.js',
    '~/plugins/Vee-Validate.js',
    { src: '~/plugins/vue-parallax.js', ssr: false },
    { src: '~/plugins/vue-bar.js', ssr: false }
  ],
  css: [
    // 'node_modules/vuetify/dist/vuetify.min.css',
    'node_modules/vuetify/src/stylus/main.styl',
    // '~/assets/style/app.styl'
  ],
  vuetify: {
    treeShake: true,
    materialIcons: false,
    css: false,
    theme: {
      primary: '#3B8070',
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
    //   VImg: require('vuetify/es5/components/VImg').default,
    //   VIcon: require('vuetify/es5/components/VIcon').default,
    //   VCard: require('vuetify/es5/components/VCard').default,
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
    // vendor: [
    //   "axios",
    //   "vuex-class",
    //   "nuxt-class-component",
    //   "babel-polyfill",
    //   "vue-parallax-js"
    // ],
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
  transition: {
    name: 'fade-transition',
    mode: 'out-in'
  },
  router: {
    scrollBehavior: ScrollBehavior
  },
  manifest: {
    name: 'Nick\'s Website',
    short_name: "Nick Bolles",
    lang: 'en',
    theme_color: "#3B8070",
    background_color: "#303030",
    description: "Nick Bolles' personal website"
  },
  icon: {
    iconSrc: 'static/icon.png',
    sizes: [16, 24, 30, 42, 44, 48, 50, 54, 55, 63, 66, 71, 75, 88, 89, 100, 107, 120, 142, 144, 150, 152, 176, 188, 192, 200, 225, 256, 284, 300, 310, 384, 388, 465, 512, 600, 620]
  },
  workbox: {

  }
};
