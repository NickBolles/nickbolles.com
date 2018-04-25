<template>
  <v-container id="myProjects" grid-list-L px-2>
    <v-layout row justify-space-around wrap>
      <v-flex v-for="project in projects" v-bind:key="project.name" xs12 md6>
        <projectSummary v-bind:project="project"></projectSummary>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import { myProjects } from "~/assets/myProjects";
import ProjectSummaryComponent from "~/components/ProjctSummary.vue";
import { IProject } from "~/assets/myProjects";

@Component({
  components: {
    projectSummary: ProjectSummaryComponent
  }
})
export default class MyProjectsComponent extends Vue {
  projects: IProject[] = myProjects;
}
</script>

<style>

</style>
