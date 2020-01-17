import Link from 'next/link'
import { LogoIcon } from '../atoms/icons/icons'
import PageContainer from '../atoms/container/PageContainer'

const navs = [
  {
    name: '뉴스',
    to: '/',
  },
  {
    name: '책',
    to: '/book',
  },
  {
    name: '영화',
    to: '/movie',
  },
]

const Nav = () => {
  return (
    <nav id="global-nav" className="no-print">
      <PageContainer>
        <div className="navs">
          <Link href="/">
            <a>
              <div className="nav-content">
                <LogoIcon width={20} />
              </div>
            </a>
          </Link>
          {navs.map(({ name, to }) => (
            <Link href={to} key={name}>
              <a>
                <div className="nav-content">
                  {name}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </PageContainer>
      <style jsx>{`
        a {
          height: 100%;
          padding: 0 12px;
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
          display: grid;
          height: 44px;
          grid-gap: 0 30px;
          grid-auto-flow: column;
          grid-auto-columns: max-content;
          align-items: center;
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
