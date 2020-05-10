import React from 'react'
import Icon from 'common/atoms/icons/Icon'
import styled from '@emotion/styled'

export const SnsBox = styled.div`
  align-self: center;
  font-size: 12px;
  color: var(--text200);
  padding: 4px;

  &:hover {
    color: #08f;
  }

  a {
    color: inherit;
  }
`

const snsList = [
  {
    name: 'github',
    link: 'https://github.com/indegser',
    size: 14,
    variant: 'github',
  },
]

const Sns = () => {
  return (
    <>
      {snsList.map((sns) => {
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
                variant={sns.variant as any}
                width={sns.size || 16}
                height={sns.size || 16}
              />
            </SnsBox>
          </a>
        )
      })}
    </>
  )
}

export default Sns
