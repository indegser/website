import React from 'react'
import { HistoryType } from '../../../types/HistoryTypes'
import BodyText, { BodyTextTypes } from 'design/atoms/typography/BodyText'
import Box from 'design/atoms/box/Box'
import {
  HistoryCardImage,
  HistoryCardTitle,
  HistoryCardContainer,
  HistoryCardImages,
  HistoryCardFavicon,
} from './HistoryCard.styled'
import Link from 'next/link'
import { getColor } from 'design/atoms/colors/colorTypes'

const HistoryCard: React.FC<{ history: HistoryType }> = ({ history }) => {
  const { id, title, comment, cover, excerpt } = history

  return (
    <HistoryCardContainer>
      <Box p={3} pb={0}>
        <HistoryCardImages>
          <HistoryCardImage src={cover} />
        </HistoryCardImages>
        <Box mt={2}>
          <Link href={`/h/${id}`}>
            <a>
              <HistoryCardTitle>{title}</HistoryCardTitle>
            </a>
          </Link>
        </Box>
        <Box mt={1}>
          <BodyText variant={BodyTextTypes.Short1}>
            {comment || excerpt}
          </BodyText>
        </Box>
        <Box
          pb={3}
          borderBottom={`1px solid ${getColor('borderLighter')}`}
        ></Box>
      </Box>
    </HistoryCardContainer>
  )
}

export default HistoryCard
