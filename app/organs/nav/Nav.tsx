import Link from 'next/link'
import PageContainer from 'atoms/container/PageContainer'
import Profile from './Profile'
import { NavMenus, NavHomeLogo } from './Nav.styled'
import Icon from 'atoms/icons/Icon'

const Nav = () => {
  return (
    <nav id="global-nav" className="no-print">
      <PageContainer>
        <NavMenus>
          <Link href="/">
            <a>
              <NavHomeLogo>
                <Icon variant="logo" height={26} />
              </NavHomeLogo>
            </a>
          </Link>
          <div className="right">
            <Profile />
          </div>
        </NavMenus>
      </PageContainer>
    </nav>
  )
}

export default Nav
