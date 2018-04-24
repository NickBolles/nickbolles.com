<template>
    <v-tooltip bottom transition="scale-transition">
        <a v-bind:href="skill.url" slot="activator" lazy="true">
            <v-chip class="grey darken-3 white--text" pa-3>
                <v-avatar>
                    <img v-bind:src="skillIcon(skill)">
                </v-avatar>
                {{skill.name}}
            </v-chip>
        </a>
        <span>{{skill.name}}</span>
    </v-tooltip>
</template>
<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "nuxt-class-component";

@Component({})
export default class SkillIconComponent extends Vue {
  @Prop() skill: any;

  skillIcon(skill: any): string {
    return "/skill-icons/" + skill.file;
  }
}
</script>
<style lang="scss" scoped>
v-chip {
  cursor: pointer;
}
</style>
