import HashLink from 'common/atoms/link/HashLink'
import Icon, { IconVariant } from 'common/atoms/icons/Icon'
import styled from '@emotion/styled'

const Box = styled.span`
  text-decoration: none;

  a {
    color: var(--text300);
    text-decoration: none;
    &:hover {
      color: var(--primary100);
      .toc_link_icon {
        color: var(--primary100);
      }
    }
  }
`

const LinkIcon = styled.span`
  margin-left: 6px;
  display: inline-flex;
  transform: translateY(1px);
`

const TocLink = (props) => {
  return (
    <Box>
      <HashLink {...props}>
        {props.children}
        <LinkIcon>
          <Icon variant={IconVariant.link} width={12} height={12} />
        </LinkIcon>
      </HashLink>
    </Box>
  )
}

export default TocLink
