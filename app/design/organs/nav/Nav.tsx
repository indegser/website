import Link from 'next/link'
import PageContainer from 'design/atoms/container/PageContainer'
import Profile from './Profile'
import { NavMenus, NavHomeLogo, NavMenuGrid } from './Nav.styled'
import Icon, { IconVariant } from 'design/atoms/icons/Icon'
import NavMenu from './NavMenu'

const Nav = () => {
  const menu = [
    {
      name: 'Bookmark',
      href: '/',
      iconVariant: IconVariant.bookmark,
    },
    {
      name: 'Book',
      href: '/b',
      iconVariant: IconVariant.book,
    },
  ]

  return (
    <nav id="global-nav" className="no-print">
      <PageContainer>
        <NavMenus>
          <Link href="/">
            <a>
              <NavHomeLogo>
                <Icon variant={IconVariant.logo} height={24} />
              </NavHomeLogo>
            </a>
          </Link>
          <NavMenuGrid>
            {menu.map(item => (
              <NavMenu key={item.name} {...item} />
            ))}
          </NavMenuGrid>
          <Profile />
        </NavMenus>
      </PageContainer>
    </nav>
  )
}

export default Nav
