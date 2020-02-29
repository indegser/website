import styled from 'styled-components'

export const ShelfGrid = styled.div`
  padding-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  align-items: flex-end;
  gap: 32px 16px;
  padding: 32px 0;
`
