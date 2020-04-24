import { useRouter } from 'next/router'
import Link from 'next/link'
import { NavMenuBox, NavMenuName, NavMenuLogo } from './NavMenu.styled'
import Icon from 'design/atoms/icons/Icon'

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
        <NavMenuLogo>
          <Icon variant="logoSimple" height={21} />
        </NavMenuLogo>
      )
    }
    return (
      <NavMenuBox aria-current={isActive}>
        <NavMenuName>{name}</NavMenuName>
      </NavMenuBox>
    )
  }

  return (
    <Link href={href}>
      <a>{renderMenu()}</a>
    </Link>
  )
}

export default NavMenu
