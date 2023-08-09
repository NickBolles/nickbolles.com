
const isClient = () => typeof window !== 'undefined'

/** Media Query */
const darkQuery = () => isClient() && window.matchMedia('(prefers-color-scheme: dark)')
export const checkDarkMode = () => darkQuery()?.matches

/* Store and Load Preference */
// make sure to cast it to a boolean so that it can be parsed when retrieved
export const storePreference = (value: boolean) => {
  try {
    window.localStorage.setItem('dark-mode', (!!value).toString())
  } catch (e) {}
}
export const tryLoadStoredPreference = () => {
  try {
    return JSON.parse(window.localStorage.getItem('dark-mode'))
  } catch (e) {
    return null
  }
}
/* Watching preference */
const onDarkModeChange = () => setTheme(checkDarkMode())
export const watchDarkMode = () =>
  darkQuery()?.addEventListener('change', onDarkModeChange)
export const removeDarkModeWatch = () => darkQuery().removeEventListener('change', onDarkModeChange)

/* Set the theme to the DOM */
export const setTheme = (dark: boolean) => {
  const el = document.querySelector('.theme-target')
  if (el) {
    el.classList.remove(dark ? 'mode-light' : 'mode-dark')
    el.classList.add(dark ? 'mode-dark' : 'mode-light')
  }
  storePreference(dark)
}

/* Initial Load */
export const calculateInitialTheme = () => tryLoadStoredPreference() ?? checkDarkMode()

/**
 * On load we need to do this immediately so that the class is set
 * correctly, and thus the variables are set correctly for all descendants
 */
if (isClient()) {
  setTheme(calculateInitialTheme())
  watchDarkMode()
}
