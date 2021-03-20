import styled from "@emotion/styled"
import { ComponentProps, FC } from "react"

interface Props extends ComponentProps<typeof Container> {
}

const Container = styled.div`
  width: 100%;
`

const Skeleton: FC<Props> = (props) => {
  return (
    <Container {...props} />
  )
}

export default Skeleton
