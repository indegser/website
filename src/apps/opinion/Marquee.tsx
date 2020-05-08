import { IStory } from 'types/dataTypes'
import { FC, useMemo } from 'react'
import {
  MarqueeBox,
  MarqueeTitle,
  MarqueeExcerpt,
  MarqueeDate,
  MarqueeCover,
  MarqueeContent,
} from './Marquee.styled'
import Link from 'next/link'
import { dateFns } from 'utils/dateUtils'
import { capitalize } from 'utils/stringUtils'

interface Props {
  story: IStory
}

const Marquee: FC<Props> = ({ story }) => {
  const relDate = useMemo(() => {
    const text = dateFns.formatRelative(story.modifiedAt, Date.now())
    return capitalize(text)
  }, [story.modifiedAt])

  const linkProps = {
    href: '/story/[...slug]',
    as: `/story/${story.slug}`,
  }

  if (!story.data.title) return null

  return (
    <MarqueeBox>
      <MarqueeContent>
        <Link {...linkProps}>
          <a>
            <MarqueeTitle>{story.data.title}</MarqueeTitle>
            <MarqueeExcerpt>{story.data.excerpt}</MarqueeExcerpt>
          </a>
        </Link>
        <MarqueeDate>{relDate}</MarqueeDate>
      </MarqueeContent>
      {story.data.coverUrl && (
        <Link {...linkProps}>
          <a>
            <MarqueeCover src={story.data.coverUrl} alt={story.data.coverAlt} />
          </a>
        </Link>
      )}
    </MarqueeBox>
  )
}

export default Marquee
