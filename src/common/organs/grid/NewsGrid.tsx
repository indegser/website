import styled from '@emotion/styled'
import { mq } from 'common/theme'

interface Props {}

const Grid = styled.div`
  --column-count: 2;
  --column-gap: 32px;
  margin-bottom: var(--column-gap);
  position: relative;

  ${mq('sm')} {
    --column-count: 1;
  }
`

const Cards = styled.div`
  column-count: var(--column-count);
  column-gap: var(--column-gap);

  > div {
    break-inside: avoid;
    page-break-inside: avoid;
    position: relative;
  }
`

const Dividers = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
`

const Divider = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #dedede;
  margin-left: -1px;

  --half-gap: calc(var(--column-gap) / 2);
  --gap-total: calc(var(--column-gap) * (var(--column-count) - 1));
  --box-total: calc(100% - var(--gap-total));
  --box-width: calc(var(--box-total) / var(--column-count));
  --add: calc(var(--half-gap) * (2 * var(--divider-i) + 1));
  --left: calc(var(--box-width) * (var(--divider-i) + 1) + var(--add));
  left: var(--left);
`

const NewsGrid: React.FC<Props> = ({ children }) => {
  const dividers = new Array(4).fill(true)

  return (
    <Grid>
      <Cards>{children}</Cards>
      <Dividers>
        {dividers.map((d, i) => {
          return (
            <Divider
              key={i}
              style={{
                // @ts-ignore
                '--divider-i': i,
              }}
            />
          )
        })}
      </Dividers>
    </Grid>
  )
}

export default NewsGrid
