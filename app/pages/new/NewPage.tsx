import { NewPageContainer } from './NewPage.styled'
import PageContainer from 'design/atoms/container/PageContainer'
import useCreateHistory from 'hooks/forms/useCreateHistory'

const NewPage = () => {
  const { ref } = useCreateHistory()

  return (
    <NewPageContainer>
      <PageContainer>
        <input ref={ref} type="text" placeholder="Url of webpage"></input>
      </PageContainer>
    </NewPageContainer>
  )
}

export default NewPage
