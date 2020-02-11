import Link from 'next/link'
import { LogoIcon } from '../atoms/icons/icons'
import PageContainer from '../atoms/container/PageContainer'
import Profile from './nav/Profile'

const Nav = () => {
  return (
    <nav id="global-nav" className="no-print">
      <PageContainer>
        <div className="navs">
          <Link href="/">
            <a>
              <div className="nav-content logo">
                <LogoIcon height={26} />
              </div>
            </a>
          </Link>
          <div className="right">
            <Profile />
          </div>
        </div>
      </PageContainer>
      <style jsx>{`
        a {
          height: 100%;
          padding: 0 12px;
          margin-left: -12px;
          text-decoration: none;
          color: rgba(0, 0, 0, 0.9);
          font-size: 14px;
        }
        a:hover {
          opacity: 0.65;
        }

        a[aria-current='page'] {
          opacity: 0.65;
        }

        .navs {
          display: flex;
          height: 54px;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
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
