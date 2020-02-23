import styled, { css } from 'styled-components'
import { system } from 'styled-system'
import { getColor } from 'design/atoms/colors/colorTypes'

const gridSystem = system({
  columnCount: {
    property: '--column-count' as any,
    transform: v => v.toString(),
  },
})

export const HistoryGrid = styled.div`
  ${gridSystem}
  --column-gap: 32px;
  padding-bottom: var(--column-gap);
  position: relative;
`

export const HistoryCards = styled.div`
  column-count: var(--column-count);
  column-gap: var(--column-gap);
`

export const HistoryDividers = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
`

export const HistoryDivider = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: ${getColor('borderLighter')};

  --half-gap: calc(var(--column-gap) / 2);
  --gap-total: calc(var(--column-gap) * (var(--column-count) - 1));
  --box-total: calc(100% - var(--gap-total));
  --box-width: calc(var(--box-total) / var(--column-count));
  --add: calc(var(--half-gap) * (2 * var(--divider-i) + 1));
  --left: calc(var(--box-width) * (var(--divider-i) + 1) + var(--add));
  left: var(--left);
`
