<script lang="ts">
  import Tailwindcss from "../components/Tailwindcss.svelte";
  import DarkModeToggleButton from "../components/DarkModeToggleButton.svelte";
  import {
    calculateInitialTheme,
    removeDarkModeWatch,
    setTheme,
  } from "../ThemeUtils";
  import { onMount } from "svelte";

  let darkMode: boolean = false;
  let mounted: boolean = false;

  /* Events */
  $: {
    if (mounted) {
      setTheme(darkMode); // Update the DOM and stored Preference
    }
  }

  onMount(() => {
    mounted = true;
    darkMode = calculateInitialTheme();
    return removeDarkModeWatch;
  });
</script>

<style>
  main {
    position: relative;
    padding: 1px; /* I'm really not sure why this is needed, but without it the layout shifts down a few hundred pixels*/
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Tailwindcss />

<main
  class="theme-target bg-gray-100 dark:bg-gray-900 font-sans antialiased text-primary h-screen max-w overflow-auto flex">
  <DarkModeToggleButton bind:value={darkMode} />

  <slot />
</main>
