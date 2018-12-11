// todo: http://konpa.github.io/devicon/

// swift, c#, MUMPS, VB6, Kendo UI

export enum SkillType {
    Platform = 0,
    Build_Tool = 1,
    Tool = 1,
    Language = 3,
    Framework = 4,
    Library = 5
}

export type SkillTypes = keyof SkillType;

export enum Statuses {
    Idea = "Idea",
    Designing = "Designing",
    On_The_Back_Burner = "On the Back Burner",
    In_Progress = "In Progress",
    Completed = "Completed",
    Obsolete = "Obsolete"
}

export interface ISkill {
    file: string;
    name: string;
    type: SkillType;
    url: string;
}

export interface ISkillList {
    [i: number]: ISkill;
}

export const Angular: ISkill = {
    file: "angular.svg",
    name: "Angular",
    type: SkillType.Framework,
    url: "https://angular.io/"
};
export const AngularJS: ISkill = {
    file: "angularjs.svg",
    name: "Angular JS",
    type: SkillType.Framework,
    url: "https://angularjs.org/"
};
export const AngularMaterial: ISkill = {
    file: "angularmaterial.svg",
    name: "Angular Material 1.x",
    type: SkillType.Library,
    url: "https://material.angularjs.org/"
};
export const AngularMaterial2: ISkill = {
    file: "angularmaterial.svg",
    name: "Angular Material 2",
    type: SkillType.Library,
    url: "https://material.angular.io/"
};
export const Arduino: ISkill = {
    file: "arduino.svg",
    name: "Arduino",
    type: SkillType.Platform,
    url: "https://www.arduino.cc/"
};
export const Babel: ISkill = {
    file: "babel.svg",
    name: "Babel",
    type: SkillType.Build_Tool,
    url: "https://babeljs.io/"
};
export const BitBucket: ISkill = {
    file: "bitbucket.svg",
    name: "BitBucket",
    type: SkillType.Tool,
    url: "https://bitbucket.org/"
};
export const Bower: ISkill = {
    file: "bitbucket.svg",
    name: "BitBucket",
    type: SkillType.Tool,
    url: "https://bitbucket.org/"
};
export const Cordova: ISkill = {
    file: "cordova.svg",
    name: "Cordova",
    type: SkillType.Platform,
    url: "http://cordova.apache.org/"
};
export const CSS3: ISkill = {
    file: "CSS3.svg",
    name: "CSS3",
    type: SkillType.Language,
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
};
export const D3: ISkill = {
    file: "d3.svg",
    name: "D3 JS",
    type: SkillType.Library,
    url: "https://d3js.org/"
};
export const Docker: ISkill = {
    file: "docker.svg",
    name: "Docker",
    type: SkillType.Build_Tool,
    url: "https://www.docker.com/"
};
export const ExpressJS: ISkill = {
    file: "express.svg",
    name: "Express JS",
    type: SkillType.Framework,
    url: "http://expressjs.com/"
};
export const Git: ISkill = {
    file: "git.svg",
    name: "Git",
    type: SkillType.Tool,
    url: "https://git-scm.com/"
};
export const GSAP: ISkill = {
    file: "greensock.png",
    name: "Greensock Animation Platform",
    type: SkillType.Library,
    url: "https://greensock.com/"
};
export const Gulp: ISkill = {
    file: "gulp.svg",
    name: "Gulp JS",
    type: SkillType.Build_Tool,
    url: "https://gulpjs.com/"
};
export const HTML5: ISkill = {
    file: "HTML5.svg",
    name: "HTML 5",
    type: SkillType.Language,
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
};
export const Jasmine: ISkill = {
    file: "jasmine.svg",
    name: "Jasmine",
    type: SkillType.Tool,
    url: "https://jasmine.github.io/"
};
export const JS: ISkill = {
    file: "javascript.svg",
    name: "Javascript",
    type: SkillType.Language,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
};
export const Jest: ISkill = {
    file: "jest.svg",
    name: "Jest",
    type: SkillType.Tool,
    url: "https://facebook.github.io/jest/"
};
export const Karma: ISkill = {
    file: "karma.svg",
    name: "Karma",
    type: SkillType.Tool,
    url: "http://karma-runner.github.io/2.0/index.html"
};
export const Mongodb: ISkill = {
    file: "mongodb.svg",
    name: "MongoDB",
    type: SkillType.Platform,
    url: "https://www.mongodb.com/"
};
export const NodeJS: ISkill = {
    file: "nodejs.png",
    name: "Node JS",
    type: SkillType.Language,
    url: "https://nodejs.org/en/"
};
export const NPM: ISkill = {
    file: "npm.svg",
    name: "NPM",
    type: SkillType.Tool,
    url: "https://www.npmjs.com/"
};
export const Nuxt: ISkill = {
    file: "nuxt.svg",
    name: "Nuxt",
    type: SkillType.Framework,
    url: "https://www.nuxtjs.com/"
};
export const Prettier: ISkill = {
    file: "prettier.svg",
    name: "Prettier",
    type: SkillType.Tool,
    url: "https://prettier.io/"
};
export const RaspberryPi: ISkill = {
    file: "raspberry-pi.svg",
    name: "Raspberry Pi",
    type: SkillType.Platform,
    url: "https://www.raspberrypi.org/"
};
export const React: ISkill = {
    file: "react.png",
    name: "React",
    type: SkillType.Framework,
    url: "https://reactjs.org/"
};
export const RXJS: ISkill = {
    file: "rxjs.png",
    name: "RxJs",
    type: SkillType.Library,
    url: "http://reactivex.io/rxjs/"
};
export const Scrollmagic: ISkill = {
    file: "scrollmagic.svg",
    name: "Scrollmagic",
    type: SkillType.Library,
    url: "http://scrollmagic.io/"
};
export const SASS: ISkill = {
    file: "sass-logo.png",
    name: "SASS",
    type: SkillType.Language,
    url: "http://sass-lang.com/"
};
export const Typescript: ISkill = {
    file: "typescript.svg",
    name: "Typescript",
    type: SkillType.Language,
    url: "http://www.typescriptlang.org/"
};
export const VSCode: ISkill = {
    file: "vscode.svg",
    name: "Visual Studio Code",
    type: SkillType.Tool,
    url: "https://code.visualstudio.com/"
};
export const Vue: ISkill = {
    file: "vuejs.svg",
    name: "Vue JS",
    type: SkillType.Framework,
    url: "https://vuejs.org/"
};
export const Vuetify: ISkill = {
    file: "vuetify.svg",
    name: "Vuetify JS",
    type: SkillType.Library,
    url: "https://vuetifyjs.com/en/"
};
export const WebPack: ISkill = {
    file: "webpack.png",
    name: "Webpack",
    type: SkillType.Build_Tool,
    url: "https://webpack.js.org/"
};
export const Webstorm: ISkill = {
    file: "webstorm.svg",
    name: "Webstorm",
    type: SkillType.Tool,
    url: "https://www.jetbrains.com/webstorm/"
};
export const Yarn: ISkill = {
    file: "yarn.svg",
    name: "Yarn",
    type: SkillType.Tool,
    url: "https://yarnpkg.com/lang/en/docs/install/"
};

export const Skills: ISkill[] = [
    Angular,
    AngularJS,
    AngularMaterial,
    AngularMaterial2,
    Arduino,
    Babel,
    BitBucket,
    Bower,
    Cordova,
    CSS3,
    D3,
    Docker,
    ExpressJS,
    Git,
    GSAP,
    Gulp,
    HTML5,
    Jasmine,
    JS,
    Jest,
    Karma,
    Mongodb,
    NodeJS,
    NPM,
    Nuxt,
    Prettier,
    RaspberryPi,
    React,
    RXJS,
    SASS,
    Scrollmagic,
    Typescript,
    VSCode,
    Vue,
    Vuetify,
    WebPack,
    Webstorm,
    Yarn
];