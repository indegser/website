import { useBannerStore } from './Banner.hooks'
import PageContainer from 'common/atoms/container/PageContainer'
import Icon from 'common/atoms/icons/Icon'
import { MouseEvent } from 'react'
import styled from '@emotion/styled'

const Box = styled.div`
  border-bottom: 1px solid #b8deff;
  color: #184f7e;
  padding: 10px 0 12px;
  background: #daf0fa;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: auto max-content;
  align-items: center;
`

const Close = styled.div`
  margin-bottom: -4px;
  margin-right: -8px;
  padding: 8px;
`

const Message = styled.div`
  font-size: 14px;
`

const Banner = () => {
  const banner = useBannerStore((s) => s.banner)
  const setBanner = useBannerStore((s) => s.setBanner)
  if (!banner) return null

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation()
    setBanner(null)
  }

  return (
    <Box>
      <PageContainer>
        <Content>
          <Message>
            {banner.type === 'success' && '👍 '}
            {banner.message}
          </Message>
          <Close onClick={handleClose}>
            <Icon variant="close" width={12} />
          </Close>
        </Content>
      </PageContainer>
    </Box>
  )
}

export default Banner
