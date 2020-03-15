import Head from 'next/head'
import PageContainer from 'design/atoms/container/PageContainer'
import FormGroup, { FormGroupFieldVariant } from 'design/atoms/form/FormGroup'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import sejongApi from 'apis/sejongApi'
import { useRouter } from 'next/router'

const Write = () => {
  const { query } = useRouter()
  const { register, handleSubmit } = useForm()

  const write = data => {
    sejongApi
      .choseh(
        `
      mutation($input: Write!) {
        write(input: $input) {
          eTag
        }
      }
    `,
        {
          input: {
            id: query.bookId,
            content: data.content,
          },
        }
      )
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <Head>
        <title>Write choseh | Indegser</title>
      </Head>
      <PageContainer>
        <form onSubmit={handleSubmit(write)}>
          <FormGroup
            name="content"
            required
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

export default Write
