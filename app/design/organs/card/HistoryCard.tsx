import React from 'react'
import { BodyTextTypes } from 'design/atoms/typography/BodyText'
import Box from 'design/atoms/box/Box'
import {
  HistoryCardImage,
  HistoryCardTitle,
  HistoryCardContainer,
  HistoryCardComment,
  HistoryCardBody,
} from './HistoryCard.styled'
import { dateFns } from 'utils/dateUtils'
import { getColor } from 'design/atoms/colors/colorTypes'
import { IHistory } from 'types/dataTypes'
import HistoryCardMore from './CardMore'
import Authorized from 'hocs/Authorized'
import { CitationText } from 'design/atoms/typography/LabelText'
import Flexbox from 'design/atoms/box/Flexbox'

const HistoryCard: React.FC<{ history: IHistory }> = ({ history }) => {
  const { title, comment, cover, excerpt } = history

  const isEdited = history.createdAt !== history.modifiedAt
  const dateAction = isEdited ? 'Edited' : 'Saved'

  return (
    <HistoryCardContainer>
      <Authorized>
        <HistoryCardMore />
      </Authorized>
      <Flexbox pt={3}>
        <Box mr={3}>
          <HistoryCardImage src={cover} />
        </Box>
        <Box>
          <Box>
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
          <Box mt={1}>
            <CitationText>
              {`${dateAction}, ` +
                dateFns.formatRelative(history.modifiedAt, Date.now())}
            </CitationText>
          </Box>
        </Box>
      </Flexbox>
      <Box pb={3} borderBottom={`1px solid ${getColor('borderLighter')}`}></Box>
    </HistoryCardContainer>
  )
}

export default HistoryCard
