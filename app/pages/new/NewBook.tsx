import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import FormGroup from 'design/atoms/form/FormGroup'
import { useBannerStore } from 'stores/bannerStore'
import PageContainer from 'design/atoms/container/PageContainer'
import FormContainer from 'design/atoms/container/FormContainer'
import sejongApi from 'apis/sejongApi'

const NewBook = () => {
  const setBanner = useBannerStore((s) => s.setBanner)
  const { register, handleSubmit } = useForm()

  const action = async (data) => {
    data.authors = data.authors.split(',').map((a) => a.trim())
    data.publishedYear = Number(data.publishedYear)

    sejongApi
      .newBook(data)
      .then(() => {
        setBanner({
          type: 'success',
          message: `Book has been successfully created`,
        })
      })
      .catch((err) => {
        console.log(err)
      })
    // createBook({ variables: { input: { book: data } } })
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(action)}>
        <FormGroup name="title" required ref={register} label="Title" />
        <FormGroup
          name="authors"
          required
          ref={register}
          placeholder="Comma separated. e.g) Kim, Han"
          label="Authors"
        />
        <FormGroup
          name="publishedYear"
          required
          ref={register}
          label="Published year"
        />
        <FormGroup name="cover" ref={register} label="Cover" />
        <PrimaryButton type="submit">Create Book</PrimaryButton>
      </form>
    </FormContainer>
  )
}

export default NewBook
