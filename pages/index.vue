<template>
  <v-layout column align-stretch v-bind:class="loaded ? 'loaded':'loading'" v-resize="onResize">
    <v-layout column class="nb main landing section application theme--dark" v-bind:style="contentStyle">
      <div class="pb-5 px-5 nb main avatar">
        <v-avatar v-bind:size="avatarHeight + 'px'" v-parallax="parallaxMult">
          <img src="/main-square.webp" alt="An Awesome Picture of me" v-bind:style="avatarStyle">
        </v-avatar>
      </div>
      <v-layout class="nb main intro" align-center>
        <v-flex class="nb main summary">
          <p class="display-3 pa-3 text-xs-center">
            Hey! I'm Nick
          </p>
          <p class="headline pa-1 text-xs-center">
            I'm a recent grad of UWW interested in anything to do with technology. I'm currently keeping busy planning a wedding, working as a developer at Epic, hanging out with family and friends and working on side projects whenever I have time left over.
          </p>
          <p class="headline pa-1 text-xs-center">
            Check out the links below to learn more about me
          </p>
          <p class="display-2 pa-2 text-xs-center">
            Thanks for checking out my website!
          </p>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-layout row justify-center ref="linksList" class="nb main links pa-2 application theme--dark">
      <v-container grid-list-sm v-sw-scene="{triggerHook:0}" v-sw-pin="{}" class="application theme--dark">
        <v-layout row wrap justify-space-around>
          <v-btn to="/">About Me</v-btn>
          <v-btn to="myExperience">My Experiance</v-btn>
          <v-btn to="myKnowledge">My Knowledge</v-btn>
          <v-btn to="myProjects">My Projects</v-btn>
          <v-btn to="contactMe">Contact Me</v-btn>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout class="nb content section" v-bind:style="contentStyle" ref="content" flex>
      <v-layout>
        <transition>
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
  staggerDelay = 0.5;
  animDur = 3;
  parallaxMult = 0.3;

  linksHeight: number = 0;
  avatarHeight: number = 0;

  get avatarStyle(): any {
    return {
      marginTop: `${-1 * this.parallaxMult * this.avatarHeight}px`
    };
  }

  get contentStyle(): any {
    return {
      height: `calc(100vh - ${this.linksHeight}px)`
    };
  }

  //#region Vue Hooks
  mounted(): void {
    this.preLoadImg();
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
  private preLoadImg(): void {
    let img: HTMLImageElement = new Image();
    img.onload = () => this.onLoaded();
    img.src = "/main-square.webp";
  }

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
      ".nb.main.summary p",
      this.animDur,
      { opacity: 0, transform: "translateY(20px)" },
      { opacity: 1, transform: "translateY(0px)", ease: Sine.easeInOut },
      this.staggerDelay,
      this.staggerDelay
    );
    // this.timeline.to(
    //   ".nb.main.links a",
    //   0,
    //   { opacity: 0, transform: "translateY(20px)" },
    //   0
    // );
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
    const percent: number = this.$vuetify.breakpoint.smAndDown ? 25 : 50;
    this.avatarHeight = this.$vuetify.breakpoint.height * (percent / 100);
  }
  //#endregion
}
</script>

<style lang="scss">
html {
  overflow: hidden;
}

.loading {
  visibility: hidden;
}

.nb.section {
  height: 100vh;
  max-height: 100vh;
  max-width: 1440px;
  transition: height, width, max-height,
    max-width 0.25s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.nb.main {
  z-index: 3;

  &.avatar {
    div {
      position: relative;
      top: -32px;
    }
    * {
      transition: all 0.25s cubic-bezier(0.445, 0.05, 0.55, 0.95), transform 1ms;
    }
  }

  &.intro {
    z-index: 5;
  }

  &.links {
    min-width: 48px;
    width: 100%;
    a {
      opacity: 0;
    }
    // button.nuxt-link-exact-active {

    // }
  }
}
.scrollwizardry-pin-spacer {
  width: 100%;
  z-index: 100;
}

.nb.content {
  z-index: 2;
  overflow-y: auto;
}
</style>
