import { useRouter } from 'next/router'
import Link from 'next/link'
import Icon from 'design/atoms/icons/Icon'
import styled from '@emotion/styled'

export const Box = styled.div`
  font-size: 14px;
  color: #333;
  padding: 4px 0px;
  padding-right: 8px;
  display: flex;
  align-items: center;

  &[aria-current='true'] {
    color: #777;
    pointer-events: none;
  }
`

export const MenuName = styled.div``

export const MenuLogo = styled.div`
  margin-right: 16px;
`

interface Props {
  name: string
  href: string
}

const NavMenu: React.FC<Props> = ({ href, name }) => {
  const { pathname } = useRouter()
  const isActive = pathname === href // TODO. checkout asPath.

  const renderMenu = () => {
    if (name === 'Home') {
      return (
        <MenuLogo>
          <Icon variant="logoSimple" height={21} />
        </MenuLogo>
      )
    }
    return (
      <Box aria-current={isActive}>
        <MenuName>{name}</MenuName>
      </Box>
    )
  }

  return (
    <Link href={href}>
      <a>{renderMenu()}</a>
    </Link>
  )
}

export default NavMenu
