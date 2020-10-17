module.exports = {
  purge: {
    enabled: true,
    mode: 'all',
    content: ['./**/**/*.html', './**/**/*.svelte'],

    options: {
      whitelistPatterns: [/svelte-/, /mode-(light|dark)/],
    },
  },

  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['responsive', 'hover', 'focus','dark', 'dark-disabled', 'dark-focus', 'dark-focus-within'],
    textColor: ['responsive', 'hover', 'focus','dark', 'dark-hover', 'dark-active', 'dark-placeholder'],
    fill: ['responsive', 'hover']
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("tailwindcss-dark-mode")()],
};
