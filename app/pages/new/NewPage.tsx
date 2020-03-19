import {
  NewPageContainer,
  NewPagePanel,
  NewPageFormHeading,
  NewPageForm,
} from './NewPage.styled'
import PageContainer from 'design/atoms/container/PageContainer'
import CreateHistoryForm from './CreateHistoryForm'
import CreateBookForm from './CreateBookForm'

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
        <NewPagePanel>
          <NewPageForm>
            <NewPageFormHeading>Book</NewPageFormHeading>
            <CreateBookForm />
          </NewPageForm>
        </NewPagePanel>
      </PageContainer>
    </NewPageContainer>
  )
}

export default NewPage
