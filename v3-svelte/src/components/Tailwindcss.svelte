<style global>
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;

  /*
    Setup Dark mode variables and wrap the layout in the class depending on the switch
    - Then bg-primary, bg-secondary, text-primary, text-secondary and text-accent are used to set the colors 
    - The classes update when the theme changes because the mode-dark and mode-light class changes and css variables change, which are picked up by tailwind's theme
    - "mode-dark", also triggers tailwindcss-dark-mode, which allows for dark:* variants of classes for more customization
    */
  /* purgecss start ignore */
  .mode-dark {
    --color-bg-primary: #2d3748;
    --color-bg-secondary: #283141;
    --color-text-primary: #f7fafc;
    --color-text-secondary: #e2e8f0;
    --color-text-accent: #81e6d9;
  }

  .mode-light {
    --color-bg-primary: #ffffff; /* white */
    --color-bg-secondary: #e2e8f0; /* bg-gray-300 */
    --color-text-primary: #2d3748;
    --color-text-secondary: #4a5568;
    --color-text-accent: #2b6cb0;
  }
  /* purgecss end ignore */
</style>
