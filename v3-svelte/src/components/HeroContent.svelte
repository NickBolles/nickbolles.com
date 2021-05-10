<script>
  import SimpleTooltip from "./SimpleTooltip.svelte";

  export const links = [
    {
      name: "Resume",
      href: "Nicholas Bolles Resume.pdf",
      tooltip: "Download Resume",
      iconPath: {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        stroke: "currentColor",
        fill: "none",
        d:
          "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      },
    },
    {
      name: "Email",
      href: "mailto:me@nickbolles.com",
      tooltip: "Email: me@nickbolles.com",
      viewBox: "0 3 24 18",
      iconPath: {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "1.5", // reduced from 2 because view is zoomed in
        stroke: "currentColor",
        fill: "none",
        d:
          "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
    },
    {
      name: "Linked In",
      href: "https://www.linkedin.com/in/nickbolles/",
      tooltip: "Linked In: @NickBolles",
      viewBox: "2 2 20 20",
      iconPath: {
        d:
          "M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z",
      },
    },
    {
      name: "Github",
      href: "https://github.com/NickBolles",
      tooltip: "Github: @NickBolles",
      iconPath: {
        d:
          "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      },
    },
    // {
    //   name: "Twitter",
    //   href: "https://twitter.com/SuP3RB0wLz",
    //   tooltip: "Twitter: @SuP3RB0wLz",
    //   iconPath: {
    //     d:
    //       "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z",
    //   },
    // },
  ];
</script>

<div class="p-8 text-center lg:text-left"  style="opacity: .9;">
  
  <h1 class="text-3xl font-bold -mt-6 lg:mt-0">Hey! I'm Nick</h1>
  <p class="pt-4 text-sm font-semibold">
    I'm a father, husband, follower of Christ, aspiring life hacker, future entrepreneur and a software engineer
  </p>
  <!-- divider line -->
  <div class="mx-auto lg:mx-0 w-4/5 pt-4 border-b-2 border-teal-500 opacity-25" />
  <p class="pt-4 text-sm text-secondary">
    Currently I'm working as a developer at <a href="www.docusign.com" class="font-bold">Docusign</a> on the Signing team, focusing on a frontend Backbone to React conversion.
  </p>
  
  <p class="pt-4 text-sm text-secondary">
    I also love developing as a hobby, so I've put together an <a href="https://github.com/sindresorhus/awesome/blob/main/awesome.md" class="font-bold">awesome list</a> to keep track of the stuff I've worked on. Check it out at <a href="https://awesome.nickbolles.com" class="font-bold">awesome.nickbolles.com</a> and let me know what you think!
  </p>

  <p class="pt-4 text-sm text-secondary">
    See the links below for a copy of my resume and other ways to connect with me. 
  </p>
  <div
    class="mt-6 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center">
    {#each links as link}
    <SimpleTooltip text={link.tooltip} class="w-16 link py-1 mx-2 rounded-full">
      <a class="text-gray-700 hover:text-teal-700 dark:text-gray-600 dark-hover:text-teal-600 hover:bg-gray-400" 
      href={link.href} rel="external"
      aria-label={link.name}>

        <svg
          class="h-8 fill-current mx-auto "
          role="img"
          viewBox={link.viewBox || `0 0 ${link.viewSize || 24} ${link.viewSize || 24}`}
          xmlns="http://www.w3.org/2000/svg"><title>{link.name}</title>
          <path {...link.iconPath} />
        </svg>
      </a>
    </SimpleTooltip>
    
    {/each}
  </div>
</div>
