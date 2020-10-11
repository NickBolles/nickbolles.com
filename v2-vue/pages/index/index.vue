<template>
  <myExperience></myExperience>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
// import AboutMeComponent from "./aboutMe.vue";
import MyExperienceComponent from "./myExperience.vue";

@Component({
  components: {
    myExperience: MyExperienceComponent
  },
  scrollToTop: true
})
export default class IndexComponent extends Vue {}
</script>

<style>

</style>
