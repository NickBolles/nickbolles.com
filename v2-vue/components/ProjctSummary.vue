<template>
  <v-card class="ma-3">
    <v-card-title style="justify-content: space-between;">
      <h1 class="display-1">{{project.name}}</h1>
      <h1 class="subheading">
        <span v-bind:style="{color: statusColor(project.status)}">{{project.status}}</span>
      </h1>
    </v-card-title>
    <v-card-text
      v-bind="detailsBinding"
      justify-space-around
      align-center
    >
      <v-flex xs-6>
        <p
          v-for="(line, index) in project.description"
          v-bind:key="index"
        >
          {{lineToString(line)}}
        </p>
      </v-flex>
      <v-layout
        xs-6
        align-center=""
      >
        <v-container grid-list-md>
          <v-layout
            row
            wrap
            align-content-space-around
            justify-space-around=""
          >
            <skillIcon
              v-bind:skill="skill"
              v-for="(skill, index) in project.skills"
              v-bind:key="index"
            ></skillIcon>
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
  import { IProject, newIProject } from "~/assets/myProjects";
  import { isString } from "~/assets/TypeGuards";
  import { ISkill, Statuses } from "~/assets/skills/skills";
  import SkillIconComponent from "~/components/skillIcon.vue";
  import colors from "vuetify/es5/util/colors";

  @Component({
    components: {
      skillIcon: SkillIconComponent
    }
  })
  export default class ProjectSummaryComponent extends Vue {
    @Prop() project!: IProject;

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
      if (status === Statuses.Idea) {
        return colors.deepPurple.darken2;
        // deep-purple darken-3
      } else if (status === Statuses.Designing) {
        return colors.cyan.darken2;
        // cyan darken-2
      } else if (status === Statuses.In_Progress) {
        return colors.amber.darken2;
        // amber darken-1
      } else if (status === Statuses.Completed) {
        return colors.green.darken3;
        // green darken 3
      } else if (status === Statuses.On_The_Back_Burner) {
        return colors.deepOrange.darken2;
        // deep-orange darken-3
      } else if (status === Statuses.Obsolete) {
        return colors.blueGrey.base;
        // blue-grey darken-2
      }
      return "";
    }

    // primary: '#9c27b0',
    // accent: '#ce93d8',
    // secondary: '#424242',
    // info: '#0D47A1',
    // warning: '#ffb300',
    // error: '#B71C1C',
    // success: '#2E7D32'
  }
</script>
<style lang="scss" scoped>
</style>
