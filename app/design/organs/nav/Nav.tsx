import PageContainer from 'design/atoms/container/PageContainer'
import Profile from './Profile'
import NavMenu from './NavMenu'
import styles from './style.module.scss'

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
      name: 'Book',
      href: '/book',
    },
  ]

  return (
    <nav>
      <PageContainer>
        <div className={styles.menus}>
          <div className={styles.menuGrid}>
            {menu.map((item) => (
              <NavMenu key={item.name} {...item} />
            ))}
          </div>
          <Profile />
        </div>
      </PageContainer>
    </nav>
  )
}

export default Nav
