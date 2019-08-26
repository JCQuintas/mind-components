---
title: 'Blog init'
date: '1970-01-01T00:00:00.000Z'
edited: '1970-01-01T00:00:00.000Z'
description: 'Why create this blog and the tech stack I used.'
---

Through this short blog post I'll go into details of why I wanted to create a personal blog, why didn't I just use [medium](https://medium.com) and why I chose [Gatsby](https://gatsbyjs.org) as the blog's framework.

## First things first

I wanted to create a blog to talk about the things I do and the ideas I have for over a year now, but I never got to it.

One reason was to structure my ideas or document code I write and reuse often in ways other people might find helpful. Another reason was that I wanted to try out static website generators for React and lastly because I wanted to have a **portfolio** of sorts, a **presence** in the web.

## But Medium

Yeah, [medium](https://medium.com) is nice and I read it a lot, but it has a limit on free articles, which I'm not a huge fan. Also every time I try to write something there I'm not truly engaged, which means I never finish a post. With my own personal website I can do whatever I want and style it the way I want it to be.

<blockquote class="right">With medium I'm not truly engaged, which means I never finish a post.</blockquote>

It is also challenging to build something new, like this website, and I don't see the time pass while writing here, since I'm pretty comfortable with my code editor interface and markdown.

## And Gatsby

I had my eye on gatsby for quite a while now. The idea to pre-render [react](https://reactjs.org/) into static `.html` files is neat. Having worked with react for the past 3 years or so, I prefer it over frameworkless `javascript` for a series of reasons, most notably the ease to keep logical **components** apart from each other.

Gatsby also has over [1209 plugins](https://www.gatsbyjs.org/plugins/). Wow! I'm using 24 of them as of now, though I'm always adding new ones. The best thing about adding plugins or packages to a Gatsby website is that plenty of them won't impact the site's speed for the end user, as you are pre-rendering the website before deploying. 👍

I'm also using [gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/), since this is a blog and this starter simplifies a lot of the boilerplate needed to parse `.md` files and image loading. It's also what [Dan Abramov](https://github.com/gaearon) uses in his blog [overreacted](https://overreacted.io/). Which was an inspiration to create my own.

## Styling

My way-to-go styling framework is `styled-components`, I just like the way you can write `css` in `javascript`, you can keep all your variables and theme colors and mixins in a single place. You can also use `ThemeProvider` to pass down all these variables to every `styled-component` in your component tree.

The only bad thing from using `styled-components` in Gatsby is that, if you use 2 or more themes, like this website does, **and** persist it in a variable on `localStorage` or similar, the website will first flash the default theme and only when components are [re-hydrated](https://reactjs.org/docs/react-dom.html#hydrate) the user-selected theme will show up. 😔

It's a small setback, but it happens pretty fast and only a few users will be affected by it.

## Deployment

I have not deployed this website as of writing this first post. But I'm tending towards [ZEIT](https://zeit.co/home) as my deployment provider. It seems fast, simple and free. Gatsby also integrates easily with it, so it's a plus. It is as simple as `npm install -g now` and then running ZEIT cli command `now`. After verifying your account you are good to go.

## Conclusion

Overall creating this was a nice exercise, I got to use new technologies and services I have not used before, as well as speak my mind in my own way and decide how everything would look.
