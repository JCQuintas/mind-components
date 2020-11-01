---
title: 'Toggle Dark Mode'
created: '2019-08-31T20:22:37.000Z'
edited: '2020-01-13T22:36:19.110Z'
description: 'How to create your own Context to toggle dark mode using styled-components.'
---

So you are creating your own website and you decide to have a dark and light theme, there might be a few questions that pop on your mind. How do I switch between them? Do I need to store them in a global state manager like Redux or MobX? How to integrate it with my styling solution?

In this blog post I intend on clarifying how I used `Context` and `useContext` to store the current state of this website's theme toggle.

<aside>
  <b>Note:</b> I use <code class="language-text">window.localStorage</code> to persist the user's choice. If you are using Gatsby, you will want to make some changes to the code bellow to ensure that it only runs when <code class="language-text">window</code> is present. You can check how I implemented it <a href="https://github.com/JCQuintas/mind-components/blob/e2ae0a78f8c0f93591555b7d19e9c34b4413671f/src/utils/theme-mode.ts#L11" target="_blank" rel="noopener noreferrer">here</a>, though it is no longer used on this website.
</aside>

To achieve our goal we will use `styled-components` and `react`. You may switch styled-components to vanilla `css` and dynamically assign **css-variables** in order to effectively change your theme, some adjustments are required, but the main `Context` concept will be the same.

## Setting Up

We will start by creating two **theme** objects:

```js {2,9}
const darkTheme = {
  isDark: true,
  background: 'black',
  primary: 'lightblue',
  secondary: 'pink',
}

const lightTheme = {
  isDark: false,
  background: 'white',
  primary: 'royalblue',
  secondary: 'palevioletred',
}
```

Note the `isDark` property above, that is there so you can easily check if the theme is dark through the `theme` object, which is provided to every `styled-component`.

With that done, we will need to check if the user has a saved preference from previous visits and the system's **prefers-color-scheme** value. I use `localStorage` for storing preference, but you can use any type of storage you want.

```js
// We don't parse it because "unset" is also a valid value
const savedIsDarkMode = localStorage.getItem('dark')

// Here we leverage matchMedia API to check if the system prefers dark mode
const prefersDarkMode = matchMedia('(prefers-color-scheme: dark)').matches
```

With those values in hand, we can get an usable `isDarkMode` value

```js
// Get usable isDarkMode
const getIsDarkMode = () => {
  // Checks if user has a preference already set and use it
  // If not set, then try to select mode by detecting system preference
  switch (savedIsDarkMode) {
    case 'true':
      return true
    case 'false':
      return false
    default:
      return prefersDarkMode
  }
}
```

With these values in hand, we are ready to create the react context necessary to store our dark mode state, this can be achieved with the code bellow

```js
export const ThemeModeContext = React.createContext({
  theme: getIsDarkMode() ? darkTheme : lightTheme,
  setIsDarkMode: () => {},
})
```

The `ThemeModeContext` can be imported and used with [useContext](https://reactjs.org/docs/context.html#reactcreatecontext) in order to call `setIsDarkMode` from within the app. We initialized the values merely as a formality, so we know the object shape.

## Who Provides the Providers?

We are ready to create the mighty `ThemeModeProvider`, which will encapsulate all of our application's code.

```jsx
export const ThemeModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode())

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const mode = {
    theme: isDarkMode ? darkTheme : lightTheme,
    setIsDarkMode,
  }

  return (
    <ThemeModeContext.Provider value={mode}>
      <ThemeProvider theme={mode.theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
```

Take a look at the code above, it looks quite simple if you are comfortable with **hooks** and **context**, but we are going to dissect the component anyway for those who missed on that.

First we have `useState` which was initialized with the value from `getIsDarkMode()`. We do this so the state always has the correct value on initialization. Assuming `getIsDarkMode()` returns `true`, we then have:

```js
const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode())
//    [true, (state) => newState]
```

This is the basics of [useState](https://reactjs.org/docs/hooks-reference.html#usestate). It takes in an initial value and returns an array with the signature `[currentState, updateStateFunction]`, we can then call `updateStateFunction('newValue')`, and `currentState` will be updated to equal `'newValue'` on the next render.

Next in line we have [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect), which is basically a function that says **run this whenever any value in the dependency array change**.

```js
useEffect(() => {
  localStorage.setItem('dark', JSON.stringify(isDarkMode))
}, [isDarkMode])
```

What we are saying with the above code is: When `isDarkMode` changes, set the `localStorage` value to the new `isDarkMode` value. This ensures that the user preference is always updated.

Lastly we have the `Context.Provider` itself. As its name implies, it is used to provide `Context.Consumer`'s with a value. `<ThemeModeContext.Consumer>` and `useContext(ThemeModeContext)` will only have a value if the the provider is present in the tree **above the consumer**. `ThemeProvider` is used to enable custom styled-components themes and mostly works like any other context.

```jsx
<ThemeModeContext.Provider value={mode}>
  <ThemeProvider theme={mode.theme}>{children}</ThemeProvider>
</ThemeModeContext.Provider>
```

Now that you have a better understanding of what the provider does, you need to encapsulate the root of your application with the `ThemeModeProvider` component. In a regular [create-react-app](https://create-react-app.dev/) app, it will be something like this:

```jsx
ReactDOM.render(
  <ThemeModeProvider>
    <App />
  </ThemeModeProvider>,
  document.getElementById('root')
)
```

## Consuming the Context

In order to actually use the context in one of your components, you can either use `Context.Consumer` component or `useContext` hook, I will only show how to use the hook implementation as it is much simpler and more straightforward.

Anywhere you want to be able to change the current theme, be it a `button` or a `toggle` like in the top of this page, just call `useContext(ThemeModeContext)` and you will have access to the `setIsDarkMode` function.

```jsx {5}
import React, { useContext } from 'react'
import { ThemeModeContext } from './theme'

export const Buttons = () => {
  const { setIsDarkMode } = useContext(ThemeModeContext)
  const setDark = () => setIsDarkMode(true)
  const setLight = () => setIsDarkMode(false)
  const toggleMode = () => setIsDarkMode((s) => !s)
  return (
    <>
      <button onClick={setDark}>set dark</button>
      <button onClick={setLight}>set light</button>
      <button onClick={toggleMode}>toggle</button>
    </>
  )
}
```

These are all the parts needed to create a fairly simple dark mode toggle. You can, of course, improve and simplify steps as you see fit. To check an actual usage of the code you can check the **Code Sandbox** bellow.

<iframe src="https://codesandbox.io/embed/heuristic-frog-u6px3?autoresize=1&fontsize=14&hidenavigation=1&view=preview" title="mindcomponents/toggle-dark-mode" style="width:100%; height:500px; border: solid 1px; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
