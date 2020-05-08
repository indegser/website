import PageContainer from 'design/atoms/container/PageContainer'
import Profile from './Profile'
import NavMenu from './NavMenu'
import styled from '@emotion/styled'

const Menus = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid #ddd;
`

const MenuLayout = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  grid-gap: 0 30px;
  align-items: center;
`

const Nav = () => {
  const menu = [
    {
      name: 'Home',
      href: '/',
    },
  ]

  return (
    <nav>
      <PageContainer>
        <Menus>
          <MenuLayout>
            {menu.map((item) => (
              <NavMenu key={item.name} {...item} />
            ))}
          </MenuLayout>
          <Profile />
        </Menus>
      </PageContainer>
    </nav>
  )
}

export default Nav
