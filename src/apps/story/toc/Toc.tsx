import Markdown from 'react-markdown'
import { useTocContent, useTocFold, useAnimatedFold } from './toc.hooks'
import TocLink from './TocLink'
import { animated } from 'react-spring'
import Icon from 'common/atoms/icons/Icon'
import styled from '@emotion/styled'

const Box = styled.div`
  padding: 0;
  margin-top: -1px;
  text-align: left;
  font-weight: 400;
  border-top: 1px solid var(--border200);
  border-bottom: 1px solid var(--border200);
  font-size: 15px;
  line-height: 1.4;

  & > div {
    overflow-y: hidden;
  }

  ol {
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;
  }

  ol > li {
    display: table;
    counter-increment: item;

    &:before {
      content: counters(item, '.') '. ';
      display: table-cell;
      padding-top: 0.8em;
      padding-right: 0.6em;
      font-weight: 600;
      font-size: 13px;
      color: #888;
    }
  }

  li ol > li {
    margin: 0;

    &:before {
      content: counters(item, '.') ' ';
    }
  }

  li {
    line-height: 1.6;
    list-style-type: none;
  }

  p {
    margin: 0;
  }
`

const Fold = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 10px 8px;
  margin: 4px -8px;
  cursor: pointer;

  &:hover {
    /* background: #eff2f9; */
  }
  transition: 0.2s background ease;
  color: var(--primary100);
`

const FoldTitle = styled.div`
  font-size: 14px;
  flex: 1 1;
  color: var(--text400);
`

interface Props {
  content: string
}

const Toc: React.FC<Props> = ({ content }) => {
  const { fold, title, toggleFold } = useTocFold()
  const { ref, style } = useAnimatedFold(fold)
  const tocContent = useTocContent(content)

  if (!tocContent) return null

  return (
    <Box>
      <animated.div style={style}>
        <div ref={ref}>
          <Markdown
            source={tocContent}
            renderers={{
              link: TocLink,
            }}
          />
        </div>
      </animated.div>
      <Fold onClick={toggleFold}>
        <FoldTitle>{title}</FoldTitle>
        <Icon
          variant="arrowDown"
          width={12}
          height={12}
          style={{ transform: `rotate(${fold ? 0 : 180}deg)` }}
        />
      </Fold>
    </Box>
  )
}

export default Toc
