<template>
  <v-layout
    id="experience"
    style="width: 100%;"
    column
    align-center
    justify-center
  >
    <h1>
      Check me out elsewhere on the web
    </h1>
    <v-layout
      row
      class="py-5 no-flex"
    >
      <v-responsive
        aspect-ratio="1"
        v-for="link in links"
        :key="link.title"
      >
        <v-btn
          large
          :href="link.href"
          class="btn nb ext-link darken-2"
          color="primary"
        >
          <v-layout
            column
            style="align-items: center;"
          >
            <img
              :src="link.icon"
              :alt="link.alt"
            />
            <h1 class="title">{{link.title}}</h1>
          </v-layout>
        </v-btn>
      </v-responsive>
    </v-layout>

    <v-layout
      column
      align-center
      justify-center
      class="no-flex"
    >
      <h4>Also check out</h4>
      <v-layout
        align-center
        justify-center
        align-content-center=""
      >
        <v-btn
          to="/myKnowledge"
          nuxt
          color="primary"
        >Knowledge</v-btn>
        <v-flex>and</v-flex>
        <v-btn
          to="/myProjects"
          nuxt
          color="primary"
        >Projects</v-btn>
      </v-layout>
    </v-layout>

  </v-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

  @Component({})
  export default class MyExperienceComponent extends Vue {
    links = [
      {
        href: "/Nicholas Bolles Resume.pdf",
        icon: "/file-document.svg",
        alt: "Resume Icon",
        title: "Resume"
      },
      {
        href: "https://www.linkedin.com/in/nickbolles",
        icon: "/linkedin-box.svg",
        alt: "Linked Icon",
        title: "Linked In"
      },
      {
        href: "https://github.com/NickBolles",
        icon: "/github-box.svg",
        alt: "Github Icon",
        title: "Github"
      }
    ];
  }
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

        max-width: 48px;
        margin-bottom: 8px;
      }
    }
  }
  .no-flex {
    flex: none;
  }
</style>
