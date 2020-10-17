<script lang="ts">
  import { scale } from "svelte/transition";
  export let value = false;

  const handleClick = () => (value = !value);
  // const getTooltip = (darkEnabled: boolean) => darkEnabled ? "I like to burn my retinas" : "Switch to the dark side";
  
  // let tooltip: string = getTooltip(value);
  // $: {
  //   tooltip = getTooltip(value);
  // }
</script>

<style>
  /* Since we have two stars, we'll pull these out */
  .dark-icon:hover {
    @apply fill-current text-yellow-500;
  }
  /* star transitions */
  .dark-icon .star {
    @apply transform transition-transform duration-200 ease-out scale-0;
  }
  .dark-icon:hover .star {
    @apply scale-100 ease-in;
  }
  /* moon transitions */
  .dark-icon .moon {
    @apply transform transition-transform duration-200 ease-in-out scale-100;
  }
  .dark-icon:hover .moon {
    @apply scale-90;
    --transform-translate-x: -1;
    --transform-translate-y: 1;
    
  }
  /* Sun transitions */
  .dark-icon .sun {
    @apply origin-center transform transition-transform ease-in-out duration-500 delay-75; 
  }

  .dark-icon:hover .sun {
    @apply rotate-90 scale-110;
  }

</style>

<button
  aria-label="Toggle dark mode"
  on:click={handleClick}
  class="dark-icon absolute p-3 right-0 top-0 w-12 focus:outline-none">
  <!-- Moon and stars -->
  <svg 
    viewBox="0 0 24 24" class="duration-500 relative">
        
    {#if value}
      <g class="fill-current"  >
        <!-- First (big) star -->
        <path 
        transition:scale={{duration: 500, delay: 400, start: 1}}
        class="star delay-75 origin-center" d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09" />

        <!-- second (small) star -->
        <path 
        transition:scale={{duration: 500, delay: 300, start: 1}}
        class="star delay-150 origin-center" d="M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11" />
        
        <!-- moon -->
        <path 
        transition:scale={{duration: 500, delay: 200, start: 1}}
        class="moon transition-colors origin-center" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </g>

        
    {:else}
      <!-- Sun -->
      <path
      transition:scale={{duration: 500, delay: 200, start: 0}}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        fill="none"
        stroke="currentColor"
        class="sun"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    {/if}
  </svg>
</button>
