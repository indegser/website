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
      name: 'Story',
      href: '/',
    },
    {
      name: 'Bookshelf',
      href: '/b',
    },
    {
      name: 'Bookmark',
      href: '/h',
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
