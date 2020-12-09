<script>
  import Image from "svelte-image";
  import HeroContent from "./HeroContent.svelte";
</script>
<style>
  .shadow-transition {
    @apply shadow-lg transition-shadow duration-300 ease-out;
  }
  .shadow-transition:hover {
    @apply shadow-2xl;
  }
  /* Large overlap profile image and description card */
  @media (min-width: 1024px) {
    #profile {
        margin-right: -20%;
        padding-right: 20%;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
  }
</style>
<div
  class="max-w-2xl lg:max-w-5xl flex items-center flex-wrap mx-auto mt-24 md:my-10 lg:my-0 lg:m">
  <!--Main Col-->
  <div id="profile"
  class="w-full lg:w-4/5 rounded-lg m-2 md:m-0 md:p-8 md:-mr bg-secondary shadow-transition"
  >
    <!-- Image for mobile view-->
    <div class="block lg:hidden rounded-full mx-auto -mt-16 h-48 w-48 sm:h-64 sm:w-64 sm:-mt-32 overflow-hidden shadow-transition">
      <Image src="profile.jpg" alt="That's me" />
    </div>
    <HeroContent />
  </div>

  <!--Img Col-->
  <div class="w-full lg:w-2/5 hidden lg:block shadow-transition">
    <Image src="profile.jpg" wrapperClass="rounded-lg align-middle overflow-hidden" alt="That's me"  />
  </div>
</div>
