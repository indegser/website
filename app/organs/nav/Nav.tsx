import Link from 'next/link'
import PageContainer from 'atoms/container/PageContainer'
import Profile from './Profile'
import { NavMenus, NavHomeLogo } from './Nav.styled'
import Icon, { IconType } from 'atoms/icons/Icon'

const Nav = () => {
  return (
    <nav id="global-nav" className="no-print">
      <PageContainer>
        <NavMenus>
          <Link href="/">
            <a>
              <NavHomeLogo>
                <Icon variant={IconType.Logo} height={26} />
              </NavHomeLogo>
            </a>
          </Link>
          <div className="right">
            <Profile />
          </div>
        </NavMenus>
      </PageContainer>
      <style jsx>{`
        a:hover {
          opacity: 0.65;
        }

        a[aria-current='page'] {
          opacity: 0.65;
        }

        .nav-content {
          height: 100%;
          display: flex;
          align-items: center;
          color: black;
        }
      `}</style>
    </nav>
  )
}

export default Nav
