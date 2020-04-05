import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import FormGroup from 'design/atoms/form/FormGroup'
import { useBannerStore } from 'stores/bannerStore'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'

const CREATE_BOOK = gql`
  mutation($book: CreateBookInput!) {
    book: createBook(book: $book) {
      id
    }
  }
`

const CreateBookForm = () => {
  const setBanner = useBannerStore((s) => s.setBanner)
  const { register, handleSubmit } = useForm()
  const [createBook, { data }] = useMutation(CREATE_BOOK)

  const action = async (data) => {
    data.authors = data.authors.split(',').map((a) => a.trim())
    data.publishedYear = Number(data.publishedYear)

    createBook({ variables: { book: data } })
  }

  useEffect(() => {
    if (!data?.book) return

    setBanner({
      type: 'success',
      link: `/b/${data.book.id}`,
      message: `Book has been successfully created`,
    })
  }, data)

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
