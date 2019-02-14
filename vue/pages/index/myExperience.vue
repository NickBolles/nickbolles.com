<template>
  <v-layout
    id="experience"
    class="ma-3"
    style="width: 100%; overflow auto"
    column
    align-center
    justify-center
  >
    <h1>
      Check me out elsewhere on the web
    </h1>
    <v-layout
      row
      class="no-flex"
    >
      <v-layout
        row
        wrap
        justify-space-around
      >
        <v-btn
          v-for="link in links"
          :key="link.title"
          large
          :href="link.href"
          class="btn nb ext-link darken-2 elevation-20"
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
            <h6 v-if="link.subtitle" class="subheading text--disabled">{{link.subtitle}}</h6>
          </v-layout>
        </v-btn>
      </v-layout>
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
            class="elevation-10"
        >Knowledge</v-btn>
        <v-flex>and</v-flex>
        <v-btn
          to="/myProjects"
          nuxt
          color="primary"
            class="elevation-10"
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
        title: "Resume",
        subtitle: "(buggy in Chrome, try using Firefox or Edge)"
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
      flex: 1; // Keep them all the same size
      min-width: 150px; // Keep them from getting to small

      padding: 2em;
      display: flex;
      flex-direction: column;
      height: initial;

      img {
        height: 48px;

        max-width: 48px;
        margin-bottom: 8px;
      }

      .subheading {
        white-space: pre-wrap;
        font-size: 8px !important;
        text-align: center;
      }
    }
  }
  .no-flex {
    flex: none;
  }
</style>
