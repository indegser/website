import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'common/atoms/button/Button'
import FormGroup from 'common/atoms/form/FormGroup'
import { useBannerStore } from 'stores/bannerStore'
import FormContainer from 'common/atoms/container/FormContainer'
import sejongApi from 'apis/sejongApi'

const NewBook = () => {
  const setBanner = useBannerStore((s) => s.setBanner)
  const { register, reset, handleSubmit } = useForm()

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
        reset()
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
