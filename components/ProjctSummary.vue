<template>
  <v-card class="ma-3">
    <v-card-title style="justify-content: space-between;">
      <h1 class="display-1">{{project.name}}</h1>
      <h1 class="subheading">
        <span v-bind:style="{color: statusColor(project.status)}">{{project.status}}</span>
      </h1>
    </v-card-title>
    <v-card-text v-bind="detailsBinding" justify-space-around align-center>
      <v-flex xs-6>
        <p v-for="(line, index) in project.description" v-bind:key="index">
          {{lineToString(line)}}
        </p>
      </v-flex>
      <v-layout xs-6 align-center="">
        <v-container grid-list-md>
          <v-layout row wrap align-content-space-around justify-space-around="">
            <skillIcon v-bind:skill="skill" v-for="(skill, index) in project.skills" v-bind:key="index"></skillIcon>
          </v-layout>
        </v-container>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "nuxt-class-component";
import { IProject, newIProject } from "assets/myProjects";
import { isString } from "assets/TypeGuards";
import { ISkill, Statuses } from "assets/skills/skills";
import SkillIconComponent from "~/components/skillIcon.vue";

@Component({
  components: {
    skillIcon: SkillIconComponent
  }
})
export default class ProjectSummaryComponent extends Vue {
  @Prop() project: IProject;

  get detailsBinding(): Object {
    if (this.$vuetify.breakpoint.mdAndUp) {
      return {};
    }

    return { column: true };
  }

  lineToString(line: string | string[]): string {
    if (isString(line)) {
      return line;
    }
    return line.join(" ");
  }

  statusColor(status: Statuses): string {
    if (status === Statuses.Completed) {
      return this.$vuetify.theme.success.toString();
    } else if (status === Statuses.In_Progress) {
      return this.$vuetify.theme.warning.toString();
    } else if (status === Statuses.Designing) {
      return this.$vuetify.theme.primary.toString();
    } else if (status === Statuses.Idea) {
      return this.$vuetify.theme.secondary.toString();
    } else if (status === Statuses.Obsolete) {
      return this.$vuetify.theme.info.toString();
    }
    return "";
  }
}
</script>
<style lang="scss" scoped>

</style>
