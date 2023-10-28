import { Metadata } from 'next'
import Image from 'next/image'
import { Company } from '../../components/company'
import { Navigation } from '../../components/navigation'
import { PageHeader } from '../../components/page-header'
import './about.css'
import profilePic from './profile.png'

export const metadata: Metadata = {
  title: 'About | MindComponents',
  description: 'The full curriculum of Jose Quintas.',
  keywords: ['jose quintas', 'mindcomponents', 'blog', 'portfolio', 'curriculum'],
  robots: 'index, follow',
}

export default function About() {
  const author = 'Jose Quintas'
  return (
    <>
      <PageHeader />
      <Navigation activePath="/about" />
      <main className="about">
        <div className="bio">
          <Image src={profilePic} alt={author} className="bio-image" height={128} width={128} />
          <div className="bio-text">
            <div>
              <h1>{author}</h1>
              <h3>Developer</h3>
            </div>
          </div>
        </div>
        {/* <Social /> */}
        <h2>About</h2>
        <p>
          I am a fast learning professional, who loves problem solving and likes to keep an eye out for new technologies
          and solutions. Over the course of my career I have worked in many multidisciplinary teams, this allowed me to
          understand how every individual can contribute to the whole with their skills and knowledge. I’m also
          acquainted with <abbr title="Objectives and Key Results">OKRs</abbr>, sprints and scrum techniques in general.
          Personally I am a friendly person, who likes video games and loves to cook, always testing new recipes and
          ingredients.
        </p>

        <h2>Experience</h2>

        <Company
          position="Full-Stack Engineer (Team Lead)"
          company="Lepaya"
          period="July 2021 - Present"
          website="https://lepaya.com/en/"
        >
          At Lepaya we are at the forefront of mixing <b>automated assignments</b> with{' '}
          <b>physical or virtual classes</b> lectured by a trainer. We have a highly monolithic <b>NodeJS</b>{' '}
          application in the backend, but we aim on making it more decentralized. The frontend is done in <b>Vue</b> and
          database layer is <b>PostgreSQL</b>. My current team is focused on modernizing our user-facing apps, be it web
          or mobile.
        </Company>

        <Company
          position="Senior Fullstack Developer"
          company="Rodeo"
          period="May 2020 - June 2021"
          website="https://www.getrodeo.io"
        >
          Rodeo&apos;s product is a <b>Project Management Tool</b> for creatives and companies that deal with
          freelancers and external contractors and need to organize payments and invoices. My work mainly revolves
          around modernizing our stack and creating new microservices in order to decouple a big legacy monolithic
          application written in <b>NodeJS</b> and <b>MongoDB</b>. Frontend work focuses mostly on improving the current
          UI that is built in <b>React</b>. For backend we use <abbr title="Google Cloud Platform">GCP&apos;s</abbr>{' '}
          AppEngine and <b>NodeJS</b>, but we are starting to migrate into <b>Go</b>.
        </Company>

        <Company
          position="Senior Fullstack Developer"
          company="Scrambled BV"
          period="December 2018 - February 2020"
          website="https://www.scrambled.com"
        >
          At Scrambled I work on two main projects, Creassist and FromSam. The first is an experimental platform to
          prototype <b>Google Assistant</b> applications. One of the goals of this project is to create a{' '}
          <abbr title="What You See Is What You Get">WYSIWYG</abbr> editor. So, extra care was put into matching the
          Assistant&apos;s style. FromSam is very different, it is focused on personalized beauty sampling. The main
          objective is to collect data from users in order to build a database and use that information to develop
          targeted sampling campaigns with cosmetics brands. Our tech stack is <b>Typescript</b>, <b>NodeJS</b>,{' '}
          <b>React</b> and <b>Kubernetes</b>.
        </Company>

        <Company
          position="Fullstack Developer"
          company="Winnin Brasil"
          period="April 2017 - November 2018"
          website="https://winnin.com"
        >
          Winnin is one of the fastest growing brazilian startups. Its objective is to understand online video
          consumption and create video strategies for big brands. Some of the partners were Coca-Cola, Budweiser,
          Globosat, Stella Artois and Corona Extra. My main task was to develop the interface of a SaaS solution that is
          intended to make video audience analysis faster and more precise. <b>ReactJS</b>, <b>Mobx</b> and <b>Jest</b>{' '}
          were used for the website. I also developed <b>NodeJS</b> and <b>Python</b> backend APIs, crawlers and{' '}
          <b>AWS</b> integrations.
        </Company>

        {/* <Company
        position="Frontend Developer"
        company="Núcleo Multiprojetos de Tecnologia Educacional"
        period="April 2016 - April 2017"
        website="https://plataformaintegrada.mec.gov.br"
      >
        <abbr title="Núcleo Multiprojetos de Tecnologia Educacional">NUTE</abbr> is a technology focused lab at{' '}
        <abbr title="Federal University of Santa Catarina">UFSC</abbr>. There we developed a{' '}
        <A href="https://plataformaintegrada.mec.gov.br">web platform</A> for MEC, Brazilian Ministry of Education. Our
        primary objective was to unify the many platforms being used by basic education teachers at the time. I worked
        within a multidisciplinary team composed of teachers, designers, developers and anthropologists where I was in
        charge of developing the website using <b>AngularJS</b>.
      </Company> */}

        {/* <Company
        position="Android Development Internship"
        company="MediaLab Amsterdam"
        period="January 2015 - July 2015"
        website="https://medialabamsterdam.com/students"
      >
        During a 7-month internship, I and two other students had the goal of solving the problem of managing the public
        area of the <b>Port of Amsterdam</b> in an innovative way. To manage this area, the maintainers used several
        apps and paper lists for each of hundreds of small areas inside the 1.900 hectares of the port. Our solution was{' '}
        <A href="https://medialabamsterdam.com/blog/project/smart-eyewear/">Gradr</A>, an unified application for{' '}
        <b>Google Glass</b> and a web platform in order to simplify the management chores.
      </Company> */}

        <h2>Skills</h2>
        {/* <Skills /> */}

        <h2>Education</h2>
        {/* <Education
        institution="UFSC - Federal University of Santa Catarina"
        course="Bachelor's degree in Design"
        start={2010}
        end={2016}
      />
      <Education institution="HvA - Hogeschool van Amsterdam" course="Exchange Program" start={2014} end={2015} />
      <Education
        institution="IFSC - Federal Institute of Santa Catarina"
        course="Associate's degree in Information Technology"
        start={2008}
        end={2010}
      /> */}

        <h2>Languages</h2>
        {/* <Language name="Portuguese" level="native" />
      <Language name="English" level="fluent" />
      <Language name="Spanish" level="conversational" /> */}

        <div className="spacing" />
      </main>
    </>
  )
}
