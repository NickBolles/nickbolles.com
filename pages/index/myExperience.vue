<template>
  <v-layout id="experience" column align-center justify-center>
    <v-flex></v-flex>
    <h1>
      Check me out elsewhere on the web
    </h1>
    <v-layout>
      <v-flex>
        <a href="/Nicholas Bolles Resume - Latest.pdf" class="btn nb ext-link">
          <img src="~/assets/style/file-document.svg" />
          <h1 class="title">Resume</h1>
        </a>
      </v-flex>
      <v-flex>
        <a href="https://www.linkedin.com/in/nickbolles" class="btn nb ext-link">
          <img src="~/assets/style/linkedin-box.svg" />
          <h1 class="title">Linked In</h1>
        </a>
      </v-flex>
      <v-flex>
        <a href="https://github.com/NickBolles" class="btn nb ext-link">
          <img src="~/assets/style/github-box.svg" />
          <h1 class="title">Github</h1>
        </a>
      </v-flex>
    </v-layout>
    <v-flex></v-flex>

    <v-layout column align-center justify-center>
      <h4>Also check out</h4>
      <v-layout align-center justify-center align-content-center="">
        <v-btn to="myKnowledge">Knowledge</v-btn>
        <v-flex>and</v-flex>
        <v-btn to="myProjects">Projects</v-btn>
      </v-layout>
    </v-layout>
    <v-flex></v-flex>

  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import * as moment from "moment";

@Component({})
export default class ExperienceComponent extends Vue {}
</script>

<style lang="scss" scoped>
.nb {
  &.ext-link {
    padding: 2em;
    display: flex;
    flex-direction: column;
    height: initial;
    max-width: 25vw;
    max-height: 25vh;

    img {
      height: 48px;
      margin-bottom: 8px;
    }
  }
}
</style>
