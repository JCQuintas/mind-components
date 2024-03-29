import { FunctionComponent, SVGProps } from 'react'

const Icon: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M3.5 2.793l8.5 8.4999 8.5001-8.5v18.4142l-4.5-4.5-4 4-4-4-4.5001 4.5V2.7929zM16.7072 16l2.7929 2.7929v-5.5858L16.7072 16zm2.7929-4.2071V5.2071L8.7071 16l3.293 3.2929 7.5-7.5zm-15.0001 7L11.2929 12 4.5 5.2071V18.793z"
      clipRule="evenodd"
    />
  </svg>
)

export default Icon
