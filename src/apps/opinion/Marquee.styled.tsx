import styled from '@emotion/styled'

export const MarqueeBox = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
  border-bottom: 1px solid #ddd;
  display: flex;
  padding-bottom: 16px;
  margin-bottom: 16px;

  p {
    margin: 0.5rem 0;
  }
`

export const MarqueeContent = styled.div`
  margin-right: 12px;
`

export const MarqueeTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.35;
  margin-bottom: 4px;
  color: #32353a;
`

export const MarqueeExcerpt = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #5b5e65;
`

export const MarqueeDate = styled.div`
  font-size: 13px;
  line-height: 16px;
  color: #83888f;
  margin-top: 12px;
`

export const MarqueeCover = styled.img`
  flex: 0 0 auto;
  width: 120px;
  height: auto;
`
