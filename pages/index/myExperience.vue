<template>
  <v-layout id="myExperiance" column align-center justify-center>
    <v-flex></v-flex>
    <h1>
      Check me out elsewhere on the interwebs
    </h1>
    <v-layout>
      <v-flex>
        <v-btn href="/Nicholas Bolles Resume - Latest.pdf">
          <img src="~/assets/style/file-document.svg" /> Resume
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn href="https://www.linkedin.com/in/nickbolles">
          <img src="~/assets/style/linkedin-box.svg" /> Linked In
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn href="https://github.com/NickBolles">
          <img src="~/assets/style/github-box.svg" /> Github
        </v-btn>
      </v-flex>
    </v-layout>
    <v-flex></v-flex>

    <v-layout column align-center justify-center>
      <v-flex>
        <h4>Also on this site:</h4>
      </v-flex>
      <v-layout align-center justify-center align-content-center="">
        <v-btn to="myKnowledge">My Knowledge</v-btn>
        <v-flex>and</v-flex>
        <v-btn to="myProjects">My Projects</v-btn>
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
export default class MyExperianceComponent extends Vue {}
</script>

<style>

</style>
