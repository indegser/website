import React from 'react'

// const Dot = styled.span`
//   &:before {
//     content: '·';
//     padding-right: 4px;
//   }
// `

const snsMap = {
  Twitter: 'https://twitter.com/indegser',
  Medium: 'https://medium.com/@indegser',
  Github: 'https://github.com/indegser',
}

const Sns = () => {
  return (
    <>
      {Object.keys(snsMap).map((name, i) => {
        const link = snsMap[name]
        return (
          <div key={name}>
            <a
              title={name}
              href={link}
              target="_blank"
              rel="noreferrer noopener"
            >
              {name}
            </a>
          </div>
        )
      })}
      <style jsx>{`
        a {
          text-decoration: none;
        } 
      `}</style>
    </>
  )
}

export default Sns
