import FormGroup from 'common/atoms/form/FormGroup'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'common/atoms/button/Button'
import { useBannerStore } from 'stores/bannerStore'
import { NextPage, NextPageContext, GetServerSideProps } from 'next'
import FormContainer from 'common/atoms/container/FormContainer'
import useSWR from 'swr'
import sejongApi from 'apis/sejongApi'

const Page: NextPage<NextPageContext> = ({ query }) => {
  const bookId = query.bookId.toString()
  const { data } = useSWR(`/book/${bookId}`, sejongApi.getBook)
  const setBanner = useBannerStore((s) => s.setBanner)
  const { register, handleSubmit } = useForm()

  const submit = async (data) => {
    data.authors = data.authors.split(',').map((a) => a.trim())
    data.publishedYear = Number(data.publishedYear)
    sejongApi
      .updateBook(bookId, data)
      .then((d) => {
        setBanner({
          type: 'success',
          message: `Book has been successfully updated`,
        })
      })
      .catch((err) => void console.log(err))
  }

  if (!data) return null

  const { title, cover, authors = [], publishedYear } = data

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(submit)}>
        <FormGroup
          name="title"
          required
          ref={register}
          defaultValue={title}
          label="Title"
        />
        <FormGroup
          name="authors"
          required
          ref={register}
          defaultValue={authors.join(', ')}
          placeholder="Comma separated. e.g) Kim, Han"
          label="Authors"
        />
        <FormGroup
          name="publishedYear"
          required
          ref={register}
          defaultValue={publishedYear}
          label="Published year"
        />
        <FormGroup
          name="cover"
          ref={register}
          defaultValue={cover}
          label="Cover"
        />
        <PrimaryButton>Update</PrimaryButton>
      </form>
    </FormContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { query } = req
  return {
    props: {
      query,
    },
  }
}

export default Page
