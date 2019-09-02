import { createContext, useContext } from 'react'

// Key used to save into LocalStorage
export const darkModeKey = `${process.env.GATSBY_PROJECT_ID}_IS_DARK_MODE`

export const setIsDarkModeStorage = (isDarkMode: boolean) =>
  typeof window !== 'undefined' && localStorage.setItem(darkModeKey, JSON.stringify(isDarkMode))

// Get dark mode setting from LocalStorage
// We don't parse it into boolean because it's also important to know if it was not set
const savedIsDarkMode = () => typeof window !== 'undefined' && localStorage.getItem(darkModeKey)

// Check if browser prefers Dark Mode, default to dark in case window is undefined
const prefersDarkMode = () =>
  typeof window !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)').matches : true

// Get usable isDarkMode
export const getIsDarkMode = (): boolean =>
  // Checks if user has a preference already set and use it
  // If not set, then try to select mode by detecting system preference
  savedIsDarkMode() === 'true' ? true : savedIsDarkMode() === 'false' ? false : prefersDarkMode()

// The ThemeModeContext can be imported and used on useContext
// in order to use setIsDarkMode from within the app
export const ThemeModeContext = createContext<{ setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> }>({
  setIsDarkMode: () => {},
})

export const useThemeModeContext = () => {
  const context = useContext(ThemeModeContext)
  return context
}
