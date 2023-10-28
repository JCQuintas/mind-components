import { FunctionComponent } from 'react'

const SeriesContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.05 })};
  margin-bottom: ${({ theme }) => theme.spacing(3 / 2)};

  p {
    background-color: ${({ theme }) => theme.palette.foreground.manipulate({ opacity: 0.05 })};
    padding: ${({ theme }) => theme.spacing(1 / 2)};
  }

  ul {
    padding: ${({ theme }) => theme.spacing(1 / 2)};
    list-style-type: none;
  }

  ul,
  li,
  p {
    margin: 0;
  }
`

const Glyph = styled.span`
  color: ${({ theme }) => theme.palette.primary.color};
  margin-right: ${({ theme }) => theme.spacing(1 / 4)};
`

const Link = styled(GatsbyLink)`
  &.active {
    color: ${({ theme }) => theme.palette.foreground.color};
    box-shadow: none;
    pointer-events: none;
    cursor: text;
  }
`

interface SeriesInfoProps {
  series: string
  part: number
  posts: string[]
}

export const SeriesInfo: FunctionComponent<SeriesInfoProps> = ({ series, part, posts, ...props }) => {
  if (posts.length === 1) return null
  return (
    <SeriesContainer>
      <p>
        This post is <b>{part}</b> of <b>{posts.length}</b> on the series <b>{series}</b>. You can find the links to all
        the posts in this series below.
      </p>
      <ul>
        {posts.map((v, i) => (
          <li>
            <Glyph>◗</Glyph>
            <Link to={v} activeClassName="active">
              Part {i + 1}
              {i + 1 === part && ' - current'}
            </Link>
          </li>
        ))}
      </ul>
    </SeriesContainer>
  )
}
