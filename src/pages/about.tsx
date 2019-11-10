import React, { FunctionComponent } from 'react'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { graphql, useStaticQuery } from 'gatsby'
import GImage from 'gatsby-image'
import styled from 'styled-components'
import { Company } from '../components/company'

const Image = styled(GImage)`
  margin-right: ${({ theme }) => theme.spacing(1)};
  margin-bottom: 0;
  min-width: ${({ theme }) => theme.spacing(4.57)};
  min-height: ${({ theme }) => theme.spacing(4.57)};
  border-radius: 5%;
`

const Contact = styled.div`
  display: flex;
`

const H1 = styled.h1`
  ${({ theme }) => theme.scale(1)}
  margin-bottom: ${({ theme }) => theme.spacing(0.3)};

  ${({ theme }) => theme.breakpoint.up.sm} {
    ${({ theme }) => theme.scale(1.5)}
  }
`

const H3 = styled.h3`
  margin: 0;
  opacity: 0.7;
`

const Description = styled.p`
  padding: ${({ theme }) => theme.spacing(1 / 2, 0, 1 / 2, 1 / 2)};
  border-left: 3px solid ${({ theme }) => theme.palette.primary.color};
  transition: ${({ theme }) => theme.transition(['border-left', 'background-color'])};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoint.up.sm} {
    margin-left: ${({ theme }) => theme.spacing(-1 / 2)};
  }
`

const A = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})``

const Abbr = styled.abbr`
  font-weight: 600;
`

const About: FunctionComponent = () => {
  const data = useStaticQuery<Query>(query)
  const { author } = data.site.siteMetadata
  return (
    <Layout>
      <SEO title="About" description="A about" />
      <Contact>
        <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
        <div>
          <H1>{author}</H1>
          <H3>Developer</H3>
        </div>
      </Contact>
      <h2>About</h2>
      <p>
        I am a fast learning professional, who loves problem solving and likes to keep an eye out for new technologies
        and solutions. During my experiences I worked with multidisciplinary teams which made me understand how every
        individual can contribute to the whole with their skills and knowledge. I’m also acquainted with{' '}
        <Abbr title="Objectives and Key Results">OKRs</Abbr>, sprints and scrum techniques in general. Personally I am a
        friendly person, who likes video games and loves to cook, always testing new recipes and ingredients.
      </p>
      <h2>Experience</h2>

      <Company
        position="Senior Fullstack Developer"
        company="Scrambled BV"
        period="December 2018 - Present"
        website="https://www.scrambled.com"
      />
      <Description>
        At Scrambled I work on two main projects, <A href="https://www.creassist.com">Creassist</A> and{' '}
        <A href="https://www.fromsam.com">FromSam</A>. The first is an experimental platform to prototype{' '}
        <b>Google Assistant</b> applications. One of the goals of this project is to create a{' '}
        <Abbr title="What You See Is What You Get">WYSIWYG</Abbr> editor. So, extra care was put into matching the
        Assistant's style. FromSam is very different, it is focused on personalized beauty sampling. The main objective
        is to collect data from users in order to build a database and use that information to develop targeted sampling
        campaigns with cosmetics brands. Our tech stack is <b>Typescript</b>, <b>NodeJS</b>, <b>React</b> and{' '}
        <b>Kubernetes</b>.
      </Description>

      <Company
        position="Fullstack Developer"
        company="Winnin Brasil"
        period="April 2017 - November 2018"
        website="https://winnin.com"
      />
      <Description>
        Winnin is one of the fastest growing brazilian startups, its objective is to understand online video consumption
        and create video strategies for big brands. Partners included were Coca-Cola, Budweiser, Globosat, Stella Artois
        and Corona Extra. My main task was to develop the interface of a SaaS solution that is intended to make video
        audience analysis faster and more precise. <b>ReactJS</b>, <b>Mobx</b> and <b>Jest</b> were used for the
        website. I also developed <b>NodeJS</b> and <b>Python</b> backend APIs, crawlers and <b>AWS</b> integrations.
      </Description>

      <Company
        position="Frontend Developer"
        company="Núcleo Multiprojetos de Tecnologia Educacional"
        period="April 2016 - April 2017"
        website="https://plataformaintegrada.mec.gov.br"
      />
      <Description>
        <Abbr title="Núcleo Multiprojetos de Tecnologia Educacional">NUTE</Abbr> is a technology focused lab at{' '}
        <Abbr title="Federal University of Santa Catarina">UFSC</Abbr>. There we developed a{' '}
        <A href="https://plataformaintegrada.mec.gov.br">web platform</A> for MEC, Brazilian Ministry of Education. Our
        primary objective was to unify the many platforms being used by basic education teachers at the time. I worked
        within a multidisciplinary team composed by teachers, designers, developers and anthropologists where I was in
        charge of developing the website using <b>AngularJS</b>.
      </Description>

      <Company
        position="Android Development Internship"
        company="MediaLab Amsterdam"
        period="January 2015 - July 2015"
        website="https://medialabamsterdam.com/students"
      />
      <Description>
        During a 7-month internship, I and two other students had the goal of solving the problem of managing the public
        area of the <b>Port of Amsterdam</b> in an innovative way. To manage this area, the maintainers used several
        apps and paper lists for each of hundreds of small areas inside the 1.900 hectares of the port. Our solution was{' '}
        <A href="https://medialabamsterdam.com/blog/project/smart-eyewear/">Gradr</A>, an unified application for{' '}
        <b>Google Glass</b> and a web platform in order to simplify the management chores.
      </Description>
    </Layout>
  )
}

export default About

interface Query {
  avatar: {
    childImageSharp: {
      fixed: any
    }
  }
  site: {
    siteMetadata: SiteMetadata
  }
}

const query = graphql`
  query AboutQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 128, height: 128) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          facebook
          github
          linkedin
        }
      }
    }
  }
`
