import Link from 'next/link'
import OpinionCards from './opinion/OpinionCards'

const Opinion = () => {
  return (
    <div>
      <header>
        <Link href="/opinion">
          <a>
            <h3>의견 ></h3>
          </a>
        </Link>
      </header>
      <OpinionCards />
      <style jsx>
        {`
          header {
            margin-bottom: 8px;
            padding: 2px 0 9px;
            padding-top: 0;
            padding-bottom: 5px;
            position: static;
            background-color: inherit;
            border-bottom: none;
          }
        `}
      </style>
    </div>
  )
}

export default Opinion
