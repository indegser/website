import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import FormGroup from 'design/atoms/form/FormGroup'
import sejongApi from 'apis/sejongApi'
import { useBannerStore } from 'stores/bannerStore'

const CreateBookForm = () => {
  const setBanner = useBannerStore(s => s.setBanner)
  const { register, handleSubmit } = useForm()

  const action = async data => {
    data.authors = data.authors.split(',').map(a => a.trim())
    data.publishedYear = Number(data.publishedYear)
    const result = await sejongApi.book(
      `mutation($book: CreateBookInput) {
        book: createBook(book: $book) {
          id
        }
      }`,
      { book: data }
    )

    setBanner({
      type: 'success',
      link: `/b/${result.book.id}`,
      message: `Book has been successfully created`,
    })
  }

  return (
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
  )
}

export default CreateBookForm
