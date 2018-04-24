import { Statuses, ISkill, Vue, Nuxt, VSCode, Vuetify, Mongodb, AngularJS, Webstorm } from "~/assets/skills/skills";
import * as moment from "moment";
import { Typescript, NodeJS, JS, Git, Gulp, NPM, HTML5, Bower } from "~/assets/skills/skills";
import { Cordova, React, CSS3, GSAP, SASS } from "./skills/skills";

export interface IProject {
    name: string;
    description?: Array<string | Array<string>>;
    status: Statuses;
    skills: ISkill[];
    startDate: moment.Moment;
    endDate: moment.Moment;
    url?: string;
}

export function newIProject(): IProject {
    return {
        name: "",
        status: Statuses.Completed,
        skills: [],
        startDate: moment(),
        endDate: moment()
    };
}

export const myProjects: IProject[] = [
    {
        name: "NickBolles.com",
        url: "https://www.nickbolles.com",

        description: [
            "My homepage, full of all sorts of goodies about me, my experience etc.",
            [
                "This is the second iteration of my site. I used this as an opportunity to learn a new framework, Vue.js.",
                "My plan is to build a close copy in both Vue and React to get an intro to both frameworks.",
            ],
            [
                "I use Nuxt.js for server side rendering, code splitting and the ease of development it offers,",
                "Vuetify for beautiful base components and typeography, Typescript for modern, type safe and elegant code",
                "and for the first time VS Code as my editor"
            ]
        ],
        skills: [
            Typescript,
            JS,
            SASS,
            Vue,
            Vuetify,
            Nuxt,
            NPM,
            Git,
            VSCode
        ],
        startDate: moment("01/2018", "MM/YYY"),
        endDate: moment("04/2018", "MM/YYY"),
        status: Statuses.Completed
    },
    {
        name: "NickBolles.com - React",
        url: "https://www.nickbolles.com",
        description: [
            "My homepage, full of all sorts of goodies about me, my experience etc.",
            [
                "This is the second iteration of my site. I used this as an opportunity to learn a new framework, React.",
                "My plan is to build a close copy in both Vue and React to get an intro to both frameworks.",
            ],
            [
                "I use next.js for server side rendering, code splitting and the ease of development it offers,",
                "Vuetify for beautiful base components and typeography, Typescript for modern, type safe and elegant code",
                "and for the first time VS Code as my editor"
            ]
        ],
        skills: [
            Typescript,
            JS,
            SASS,
            React,
            Git,
            NPM,
            VSCode
        ],
        startDate: moment("04/2018", "MM/YYY"),
        endDate: moment("04/2018", "MM/YYY"),
        status: Statuses.In_Progress
    },

    {
        name: "Four-See",
        description: [
            "My big dive into app development. This app has been a HUGE learning experience for me.",
            [
                "I started this in Java, but didn't have enough of an understanding of object orientated programming and messed",
                "some core pieces up. Plus I wanted the app to run everywhere, so I switched to a web app, backed by ",
                "Cordova to run as a hybrid app on all major platforms. At first it was a JQuery Mobile app, then an angular js app",
                "then I migrated between about 3 UI frameworks, landing on angular material."
            ],
            "That's a lot of re-writing code! Yes it was, but I mostly just wanted to learn as much as I could, so I didn't mind.",
            [
                "Four-see is an app for students to put their assignments into and do a deeper analysis of their grade.",
                "It would show a range of the grade that was still possible to achieve as the course neared it's end.",
                "I also wanted to advance the app to have a social aspect and push students to do better and meet their goals",
                "virtual assistant style. As well as just help students see where they need to allocate their valuable time.",
                "As I went through the entire design process I hit a lot of hitches, but also came up with a ton of cool ideas."
            ],
            [
                "Because of my full time job after college, planning a wedding, and some other projects I have had to put Four-see on",
                "the back burner with the heat off for now. I'd still love to come back to it and make it everything I",
                "have dreamed up over the years."
            ]
        ],
        skills: [
            HTML5,
            Typescript,
            JS,
            SASS,
            AngularJS,
            Cordova,
            NodeJS,
            Mongodb,
            Git,
            Gulp,
            NPM,
            Webstorm
        ],
        startDate: moment("04/2015", "MM/YYY"),
        endDate: moment("01/2017", "MM/YYY"),
        status: Statuses.On_The_Back_Burner
    },
    {
        name: "NickBolles.com - Mk 1",
        url: "https://old.www.nickbolles.com",
        skills: [
            HTML5,
            JS,
            Git,
            Bower,
            NodeJS,
            CSS3,
            GSAP
        ],
        description: [
            [
                "My first project, after Codecademy, was creating a simple, \"about me\" website.",
                "I used lots of HTML, CSS, and some Jquery and both CSS and GSAP for small animations.",
                "I also used Scrollmagic to add some fade animations for each section.",
            ],
            "This is really the project that got me to get a glimpse of how powerful Web Development can be."
        ],
        startDate: moment("05/2014", "MM/YYY"),
        endDate: moment("05/2014", "MM/YYY"),
        status: Statuses.Obsolete
    },
];
