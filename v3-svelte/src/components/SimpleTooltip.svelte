<script>
    export let text = "";
</script>
<style>
    .tooltip-container {
        position: relative;
    }
    .tooltip {
        @apply mt-1 absolute pointer-events-none;
        @apply transition-all duration-100 delay-200;
        @apply transform -translate-x-1/2 translate-y-2 opacity-0;
        width: fit-content;
        left:50%; /* combined with translatex(-50%) centers on host*/
    }
    .tooltip-container:hover .tooltip {
        @apply translate-y-0 opacity-100;
    }
</style>
<span class={`${$$restProps.class || ""} tooltip-container`}>
    <slot></slot>
    <div class="tooltip bg-gray-900 text-white text-xs rounded py-1 px-4 right-0 bottom-full relative text-center">
        {text}
    </div>
</span>

