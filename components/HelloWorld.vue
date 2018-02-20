<template>
    <p>{{message}}</p>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class extends Vue {
  message: string;
  constructor() {
    super();
    this.message = "Hello World!";
  }
  asdf: string;
}
</script>

<style>
p {
  background-color: darkcyan;
}
</style>