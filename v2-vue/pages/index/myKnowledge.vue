<template>
  <v-layout
    id="myKnowledge"
    fluid
    column
    align-content-start
  >
    <v-layout
      row
      wrap
      align-content-start
      justify-center
    >
      <span v-for="(skills,index) in data" v-bind:key="index">
        <v-card
          class="nb card ma-2"
          v-if="skills && skills.length"
        >
          <v-card-title primary-title>{{skillTypeName(index)}}</v-card-title>
          <v-card-text flex>
            <v-container grid-list-xs>
              <v-layout
                row
                wrap
                justify-center
              >
                <skillIcon
                  v-bind:skill="skill"
                  v-for="(skill, index) in skills"
                  v-bind:key="index"
                ></skillIcon>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </span>

    </v-layout>
  </v-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import { ISkill, Skills, SkillType, SkillTypes, SkillTypePluralize } from "~/assets/skills/skills";
  import SkillIconComponent from "~/components/skillIcon.vue";

  interface ISortedSkills {
    [i: number]: ISkill[];
  }

  const data: ISortedSkills = [];
  Skills.sort((a, b) => b.type - a.type).forEach(skill => {
    if (!data[skill.type]) {
      data[skill.type] = [];
    }
    data[skill.type].push(skill);
  });

  @Component({
    components: {
      skillIcon: SkillIconComponent
    }
  })
  class MyKnowledgeComponent extends Vue {
    data: ISortedSkills = data;

    skillTypeName(type: SkillType): string {
      return SkillTypePluralize(type);
    }
  }
  export default MyKnowledgeComponent;
</script>

<style lang="scss" scoped>
  .nb {
    &.card {
      max-width: 600px;
    }
  }
</style>
