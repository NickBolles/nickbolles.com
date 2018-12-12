<template>
  <v-layout
    column
    align-stretch
    v-bind:class="loaded ? 'loaded':'loading'"
    v-resize="onResize"
  >
    <v-layout
      column
      align-center
      class="nb main landing section application theme--dark"
      v-bind:style="contentStyle"
      align
    >
      <div class="pb-5 px-5 nb main avatar">
        <v-avatar
          v-bind:size="avatarHeight + 'px'"
          v-parallax="parallaxMult"
        >
          <v-img
            src="/NickBolles.jpg"
            srcSet="/NickBolles.webp 2x"
            :style="avatarStyle"
            alt="An Awesome Picture of me"
            @load="onLoaded"
          >
            <div class="fill-height bottom-gradient"></div>
          </v-img>
          <!-- <img src="/main-square.webp" alt="An Awesome Picture of me" v-bind:style="avatarStyle"> -->
        </v-avatar>
      </div>
      <v-layout
        class="nb main intro application theme--dark"
        column
        align-center
        justify-center
      >
        <p class="display-2 pa-3 text-xs-center">
          Hey! I'm Nick
        </p>
        <p class="body-2 pa-1 text-xs-center">
          I'm a recent grad of UWW interested in anything to do with technology. I'm currently working as a developer at Epic, hanging out with family and friends and working on side projects whenever I have time left over.
        </p>
        <p class="subheader pa-1 text-xs-center">
          Check out the links below to learn more about me
        </p>
        <p class="headline pa-2 text-xs-center">
          Thanks for checking out my website!
        </p>
      </v-layout>
    </v-layout>
    <v-layout
      row
      justify-center
      align-center
      ref="linksList"
      class="nb main links application theme--dark pa-2"
    >
      <v-container
        v-bind="{ [`grid-list-sm`]: $vuetify.breakpoint.mdAndUp, [`grid-list-xs`]: $vuetify.breakpoint.smAndDown }"
        v-sw-scene="{triggerHook:0}"
        v-sw-pin="{}"
        justify-center
      >
        <v-layout
          row
          wrap
          justify-space-around
        >
          <v-btn
            to="/"
            nuxt
            color="primary"
          >About Me</v-btn>
          <v-btn
            to="/myExperience"
            nuxt
            color="primary"
          >Experience</v-btn>
          <v-btn
            to="/myKnowledge"
            nuxt
            color="primary"
          >Knowledge</v-btn>
          <v-btn
            to="/myProjects"
            nuxt
            color="primary"
          >Projects</v-btn>
          <v-btn
            to="/contactMe"
            nuxt
            color="primary"
          >Contact Me</v-btn>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout
      class="nb content section application theme--dark"
      v-bind:style="contentStyle"
      ref="content"
      flex
    >
      <v-layout>
        <transition name="fade-transition">
          <nuxt-child></nuxt-child>
        </transition>
      </v-layout>
    </v-layout>
    <v-layout>
      <span id="nb-content-bottom-anchor"></span>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
  import "material-design-icons-iconfont/dist/material-design-icons.css";
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import {
    Emit,
    Inject,
    Model,
    Prop,
    Provide,
    Watch
  } from "vue-property-decorator";
  import { TweenLite, TimelineLite, Sine } from "gsap";
  import * as scrollTo from "../node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin";
  import { Route } from "vue-router/types/router";

  @Component({})
  export default class MainComponent extends Vue {
    static meta = {
      scrollTo: "#nb-content-bottom-anchor"
    };

    $refs: {
      linksList: HTMLElement;
      content: HTMLElement;
    };
    loaded = false;

    timeline: TimelineLite = new TimelineLite();
    staggerDelay = 0.3;
    animDur = 2;
    parallaxMult = 1.2;

    linksHeight: number = 0;
    avatarHeight: number = 0;

    get avatarStyle(): any {
      return {
        marginTop: `${-1 * this.parallaxMult * 2 * this.avatarHeight}px`
      };
    }

    get introStyle(): any {
      return {
        boxShadow: `0px -21px 66px -4px ${this.$vuetify.theme.primary}`
      };
    }

    get contentStyle(): any {
      return {
        height: `calc(100vh - ${this.linksHeight}px)`
      };
    }

    //#region Vue Hooks
    mounted(): void {
      this.setupTimeline();
      this.onResize();
      this.onRouteUpdate(this.$route);
    }

    @Watch("$route")
    onRouteUpdate(to?: Route, from?: Route): void {
      this.updateSectionHeight();
      this.updateScroll(to);
    }
    //#endregion

    //#region event handlers

    onLoaded(): void {
      this.loaded = true;
      this.timeline.delay(0.5).play();
    }

    onResize(): void {
      this.updateSectionHeight();
      this.updateScroll();
      this.updateAvatarHeight();
    }
    //#endregion

    //#region Methods
    //#region Init Methods

    private setupTimeline(): void {
      this.timeline.pause();
      this.timeline.fromTo(
        ".nb.main.avatar",
        this.animDur,
        { opacity: 0, transform: "translateY(-50px)" },
        { opacity: 1, transform: "translateY(0px)", ease: Sine.easeInOut },
        0
      );
      this.timeline.staggerFromTo(
        ".nb.main.intro p",
        this.animDur,
        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0px)", ease: Sine.easeInOut },
        this.staggerDelay,
        this.staggerDelay
      );
      this.timeline.staggerTo(
        ".nb.main.links a",
        this.animDur / 3,
        { opacity: 1, transform: "translateY(0px)", ease: Sine.easeOut },
        this.staggerDelay / 2
      );
    }
    //#endregion

    private updateSectionHeight(): void {
      const height: number = this.$refs.linksList.clientHeight;
      if (height !== this.linksHeight) {
        this.linksHeight = height;
        this.updateScroll();
      }
    }
    private updateScroll(to: Route = this.$route): void {
      let offset: number = 0;
      if (to && to.name) {
        let parts: string[] = to.name.split("-");
        if (parts.length === 2 && parts[0] === "index") {
          offset = this.$refs.linksList.offsetTop;
        }
      }
      TweenLite.to(document.scrollingElement, 0.5, {
        scrollTop: offset,
        ease: Sine.easeInOut
      });
      if (offset !== 0) {
        this.timeline.staggerTo(
          ".nb.main.links a",
          this.animDur / 3,
          { opacity: 1, transform: "translateY(0px)", ease: Sine.easeOut },
          this.staggerDelay / 2,
          0
        );
      }
    }

    private updateAvatarHeight(): void {
      const percent: number = this.$vuetify.breakpoint.xs ? 33 : 50;
      this.avatarHeight = this.$vuetify.breakpoint.height * (percent / 100);
    }
    //#endregion
  }
</script>

<style lang="scss">
  html {
    // overflow: hidden;
    font-size: 16px;
  }

  a {
    text-decoration: none;
  }

  .loading {
    visibility: hidden;
  }

  .nb {
    &.section {
      height: 100vh;
      max-height: 100vh;
      width: 100%;
      max-width: 1440px;
      transition: height, width, max-height,
        max-width 0.25s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }

    &.main {
      z-index: 3;
      width: 100%;
      max-width: 800px;

      &.avatar {
        text-align: center;
        .v-avatar {
          position: relative;
          top: -56px;
        }
        * {
          transition: all 0.25s cubic-bezier(0.445, 0.05, 0.55, 0.95),
            transform 1ms;
        }
      }

      &.landing {
        align-self: center;
        width: 100%;
      }

      &.intro {
        z-index: 5;
        width: 100%;
        overflow: auto;
        box-shadow: 0px -25px 50px 15px #303030;
      }

      &.links {
        min-width: 48px;
        width: 100%;
        align-self: center;
        a {
          opacity: 0;
        }
      }
    }
    &.content {
      z-index: 3;
      overflow-y: auto;
    }
  }

  .body-1,
  .body-2 {
    font-size: 16px !important;
  }

  .scrollwizardry-pin-spacer {
    width: 100%;
    z-index: 100;
  }

  @media screen and (max-width: 600px) {
    .display-3 {
      font-size: 28px !important;
      font-weight: 400;
      line-height: 1 !important;
      letter-spacing: -0.02em !important;
      padding: 6px !important;
    }
    .display-2 {
      font-size: 24px !important;
      line-height: 48px !important;
    }
    .headline {
      font-size: 16px !important;
      font-weight: 400;
      line-height: 32px !important;
      letter-spacing: normal !important;
    }
    p {
      margin: 8px;
    }
    .pa1 {
      padding: 2px !important;
    }
    .pa2 {
      padding: 4px !important;
    }
    .pa3 {
      padding: 8px !important;
    }
  }

  // Breakpoints for the buttons to all fit
  @media screen and (max-width: 700) {
    .links {
      padding: 0;
      .container {
        padding: 4px 0 0;
      }
      .btn {
        min-width: initial;
        font-size: 12px;
        margin: 4px 2px;
      }
      .btn__content {
        padding: 0 8px;
      }
    }
  }
</style>
