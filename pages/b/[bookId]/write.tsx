import Head from 'next/head'
import PageContainer from 'design/atoms/container/PageContainer'
import FormGroup, { FormGroupFieldVariant } from 'design/atoms/form/FormGroup'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import sejongApi from 'apis/sejongApi'
import { useRouter } from 'next/router'
import { useBannerStore } from 'stores/bannerStore'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'
import { chosehApiClient } from 'apis/apolloClient'

const WRITE = gql`
  mutation write($input: Write!) {
    write(input: $input)
  }
`

const Write = ({ content }) => {
  const { query } = useRouter()
  const setBanner = useBannerStore(s => s.setBanner)
  const { register, handleSubmit } = useForm()

  const [write, { data }] = useMutation(WRITE, {
    client: chosehApiClient,
  })

  const submit = data => {
    write({
      variables: {
        input: {
          id: query.bookId,
          content: data.content,
        },
      },
    })
  }

  useEffect(() => {
    if (!data) return
    setBanner({
      type: 'success',
      message: `Choseh has been successfully written`,
    })
  }, [data])

  return (
    <div>
      <Head>
        <title>Write choseh | Indegser</title>
      </Head>
      <PageContainer>
        <form onSubmit={handleSubmit(submit)}>
          <FormGroup
            name="content"
            required
            defaultValue={content}
            fieldVariant={FormGroupFieldVariant.Textarea}
            ref={register}
            label="초서"
          />
          <PrimaryButton>업데이트</PrimaryButton>
        </form>
      </PageContainer>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { bookId } = params
  const content = await sejongApi.markdown(bookId)
  return {
    props: {
      content,
    },
  }
}

export default Write
