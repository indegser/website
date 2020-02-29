import PageContainer from 'design/atoms/container/PageContainer'
import Profile from './Profile'
import { NavMenus, NavMenuGrid } from './Nav.styled'
import NavMenu from './NavMenu'

const Nav = () => {
  const menu = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: '북마크',
      href: '/',
    },
    {
      name: '서재',
      href: '/b',
    },
  ]

  return (
    <nav id="global-nav" className="no-print">
      <PageContainer>
        <NavMenus>
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
