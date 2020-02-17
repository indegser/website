import React from 'react'
import { SnsBox } from './Sns.styled'
import Icon from 'atoms/icons/Icon'

// const Dot = styled.span`
//   &:before {
//     content: '·';
//     padding-right: 4px;
//   }
// `

const snsList = [
  { name: 'github', link: 'https://github.com/indegser', size: 14 },
  { name: 'twitter', link: 'https://twitter.com/indegser' },
]

const Sns = () => {
  return (
    <>
      {snsList.map(sns => {
        return (
          <a
            key={sns.name}
            title={sns.name}
            href={sns.link}
            target="_blank"
            rel="noreferrer noopener"
          >
            <SnsBox>
              <Icon
                variant={sns.name as any}
                width={sns.size || 16}
                height={sns.size || 16}
              />
            </SnsBox>
          </a>
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
