<template>
  <v-layout column>
    <v-layout column class="nb-main-landing">
      <!-- <v-parallax src="/main-wide-small.jpg" v-bind:height="mainHeight">
        <v-layout class="nb-main-content-bg">
          <v-layout column align-center justify-end>
            <div class="px-4 py-4">
              <p class="display-4">Hey! I'm Nick</p>
            </div>
          </v-layout>
        </v-layout>
      </v-parallax> -->
      <v-layout  v-bind="isMainColumn" align-center>
        <div class="py-5 px-5">
          <v-avatar v-bind:size="mainHeight+'px'" >
                  <img src="/main-square.jpg" alt="">
          </v-avatar>
        </div>
        <v-layout v-bind="isIntroColumn" class="nb-main-summary" align-center>
          <v-flex>
            <p class="display-3 px-2 py-2 text-xs-center">
              Hey! I'm Nick
            </p>
            <p class="body-2 px-4 py-3 text-xs-center">
              I'm a recent grad of UWW interested in anything to do with technology.
              I'm currently keeping busy planning a wedding, working as a developer at Epic,
              hanging out with family and friends and working on side projects whenever I have time left over.     
            </p>
            <p class="heading text-xs-center">
              Thanks for checking out my website!
            </p>
          </v-flex>
          <v-container grid-list-L class="nb main links">
            <v-layout row wrap justify-space-around>
                <v-btn>About Me</v-btn>
                <v-btn>My Experiance</v-btn>
                <v-btn>My Skills</v-btn>
                <v-btn>My Projects</v-btn>
                <v-btn>Contact Me</v-btn>
            </v-layout>
          </v-container>
        </v-layout>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class extends Vue {
  mainHeight = 500;
  get isIntroColumn(): any {
        return this.$vuetify.breakpoint.mdAndDown ? {column: true} : {};
      }

  get isMainColumn(): any {
        return this.$vuetify.breakpoint.xs ? {column: true} : {};
      }
}
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.nb-main-landing {
  /* height: 100vh */
}

.nb-main-content-bg {
  background: linear-gradient(transparent,60%,rgba(48, 48, 48, 0.2),85%,rgba(48, 48, 48, 1));
  /* counteract padding on the parallax */
  margin: 0 -14px;
  margin: 0 -1rem;
}

.nb.main.links {
  max-width: 550px;
}


</style>
