import {
  NewPageContainer,
  NewPagePanel,
  NewPageFormHeading,
  NewPageForm,
} from './NewPage.styled'
import PageContainer from 'design/atoms/container/PageContainer'
import CreateHistoryForm from './CreateHistoryForm'

const NewPage = () => {
  return (
    <NewPageContainer>
      <PageContainer>
        <NewPagePanel>
          <NewPageForm>
            <NewPageFormHeading>Bookmark</NewPageFormHeading>
            <CreateHistoryForm />
          </NewPageForm>
        </NewPagePanel>
      </PageContainer>
    </NewPageContainer>
  )
}

export default NewPage
