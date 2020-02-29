import { CardMoreIcon, CardMoreBox } from './CardMore.styled'
import Box from 'design/atoms/box/Box'
import { useMemo } from 'react'

const HistoryCardMore = () => {
  const icon = useMemo(() => {
    const radius = 1.5
    const width = 16
    const count = 3
    const array = new Array(count).fill(true)
    const space = (width - count * 2 * radius) / (count - 1)

    return (
      <svg width={width} viewBox={`0 0 ${width} ${radius * 2}`}>
        {array.map((_, i) => (
          <circle
            key={i}
            fill="#aaa"
            cx={radius + space * i + 2 * radius * i}
            cy={radius}
            r={radius}
          ></circle>
        ))}
      </svg>
    )
  }, [])

  return (
    <CardMoreBox>
      <Box mt={2}>
        <CardMoreIcon>{icon}</CardMoreIcon>
      </Box>
    </CardMoreBox>
  )
}

export default HistoryCardMore
