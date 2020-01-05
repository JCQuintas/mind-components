require('ts-node').register({ files: true })
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `MindComponents`,
    author: `Jose Quintas`,
    description: `A personal blog and portfolio by Jose Quintas.`,
    keywords: ['jose quintas', 'mindcomponents', 'blog', 'portfolio', 'curriculum'],
    siteUrl: `https://mindcomponents.com/`,
    social: {
      facebook: `jcquintas`,
      github: `JCQuintas`,
      linkedin: `jcquintas`,
      email: `juniorquintas@gmail.com`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: new RegExp(`${__dirname}/content/svg`),
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            // All options are optional. Defaults shown here.
            options: {
              wrapperClassName: 'vscode-block',
              injectStyles: true,
              colorTheme: 'OneDark-Pro',
              extensions: [
                {
                  identifier: 'zhuangtongfa.Material-theme',
                  version: '3.2.1',
                },
              ],
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-146621193-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MindComponents a React Blog`,
        short_name: `MindComponents`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#f07178`,
        display: `minimal-ui`,
        icon: `content/assets/mindcomponents-icon.png`,
        theme_color_in_head: false,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority: (() => {
                if (edge.node.path === '/') return 1
                if (edge.node.path === '/about/') return 0.9
                return 0.5
              })(),
            }
          }),
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
  ],
}
