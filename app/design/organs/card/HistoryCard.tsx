import React from 'react'
import { BodyTextTypes } from 'design/atoms/typography/BodyText'
import Box from 'design/atoms/box/Box'
import {
  HistoryCardImage,
  HistoryCardTitle,
  HistoryCardContainer,
  HistoryCardImages,
  HistoryCardComment,
  HistoryCardBody,
} from './HistoryCard.styled'
import { dateFns } from 'utils/dateUtils'
import { getColor } from 'design/atoms/colors/colorTypes'
import { IHistory } from 'types/dataTypes'

const HistoryCard: React.FC<{ history: IHistory }> = ({ history }) => {
  const { title, comment, cover, excerpt } = history

  const isEdited = history.createdAt !== history.modifiedAt
  const dateAction = isEdited ? ' 수정됨' : '북마크에 저장'

  return (
    <HistoryCardContainer>
      <Box pt={3}>
        <HistoryCardImages>
          <HistoryCardImage src={cover} />
        </HistoryCardImages>
        <Box mt={2}>
          <a href={history.link}>
            <HistoryCardTitle>{title}</HistoryCardTitle>
          </a>
        </Box>
        <Box mt={1}>
          <HistoryCardBody>{excerpt}</HistoryCardBody>
        </Box>
        {comment && (
          <Box mt={2}>
            <HistoryCardComment variant={BodyTextTypes.Short1}>
              "{comment.trim()}"
            </HistoryCardComment>
          </Box>
        )}
        <Box
          mt={1}
          style={{ fontSize: '13px', color: getColor('textLabelColor') }}
        >
          {dateFns.formatRelative(history.modifiedAt, Date.now()) +
            `, ${dateAction}`}
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
