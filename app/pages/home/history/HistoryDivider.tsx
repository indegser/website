import { getColor } from 'design/atoms/colors/colorTypes'

const HistoryDivider = () => {
  const column = 4
  const array = new Array(column - 1).fill(true)

  return (
    <>
      {array.map((_, i) => {
        return (
          <div
            key={i}
            style={{
              left: `calc(${(100 / column) * (i + 1) + '%'} - 1px)`,
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 1,
              background: getColor('borderLighter'),
            }}
          ></div>
        )
      })}
    </>
  )
}

export default HistoryDivider
