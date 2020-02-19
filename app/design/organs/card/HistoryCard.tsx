import React from 'react'
import { HistoryType } from '../../../types/HistoryTypes'
import BodyText, { BodyTextTypes } from 'design/atoms/typography/BodyText'
import Box from 'design/atoms/box/Box'
import {
  HistoryCardImage,
  HistoryCardTitle,
  HistoryCardContainer,
  HistoryCardImages,
  HistoryCardComment,
} from './HistoryCard.styled'
import Link from 'next/link'
import { getColor } from 'design/atoms/colors/colorTypes'

const HistoryCard: React.FC<{ history: HistoryType }> = ({ history }) => {
  const { id, title, comment, cover, excerpt } = history

  return (
    <HistoryCardContainer>
      <Box pt={3}>
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
          <BodyText variant={BodyTextTypes.Short1}>{excerpt}</BodyText>
        </Box>
        {comment && (
          <Box mt={2}>
            <HistoryCardComment variant={BodyTextTypes.Short1}>
              "{comment.trim()}"
            </HistoryCardComment>
          </Box>
        )}
        <Box
          pb={3}
          borderBottom={`1px solid ${getColor('borderLighter')}`}
        ></Box>
      </Box>
    </HistoryCardContainer>
  )
}

export default HistoryCard
