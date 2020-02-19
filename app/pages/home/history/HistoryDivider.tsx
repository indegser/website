import { getColor } from 'design/atoms/colors/colorTypes'

const HistoryDivider = () => {
  const column = 4
  const gap = 32

  const array = new Array(column - 1).fill(true)

  const getLeft = i => {
    const halfGap = gap / 2
    const multiplyer = i + 1
    const space = gap * (column - 1)
    const add = halfGap * (2 * i + 1)
    const left = `calc((100% - ${space}px) / ${column} * ${multiplyer} + ${add}px)`

    return left
  }

  return (
    <>
      {array.map((_, i) => {
        return (
          <div
            key={i}
            style={{
              left: getLeft(i),
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
