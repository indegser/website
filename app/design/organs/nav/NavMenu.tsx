import { useRouter } from 'next/router'
import Link from 'next/link'
import { NavMenuBox, NavMenuName } from './NavMenu.styled'
import Icon, { IconVariant } from 'design/atoms/icons/Icon'

interface IProps {
  name: string
  href: string
  iconVariant: IconVariant
}

const NavMenu: React.FC<IProps> = ({ href, name, iconVariant }) => {
  const { pathname } = useRouter()
  const isActive = pathname === href // TODO. checkout asPath.

  return (
    <Link href={href}>
      <NavMenuBox aria-current={isActive}>
        <Icon variant={iconVariant} height={17} />
        <NavMenuName>{name}</NavMenuName>
      </NavMenuBox>
    </Link>
  )
}

export default NavMenu
