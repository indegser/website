import Head from 'next/head'
import PageContainer from 'design/atoms/container/PageContainer'
import FormGroup, { FormGroupFieldVariant } from 'design/atoms/form/FormGroup'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import { useRouter } from 'next/router'
import { useBannerStore } from 'stores/bannerStore'
import chosehApi from 'apis/chosehApi'
import { IChoseh } from 'types/dataTypes'

interface Props {
  choseh: IChoseh
}

const Write: React.FC<Props> = ({ choseh: { content = '', frontMatter } }) => {
  const { query } = useRouter()
  const setBanner = useBannerStore((s) => s.setBanner)
  const { register, handleSubmit } = useForm()

  const submit = async (data) => {
    const body = {
      id: query.bookId,
      content: data.content,
      frontMatter,
    }

    await chosehApi.writeChoseh(body)
    setBanner({
      type: 'success',
      message: `Choseh has been successfully written`,
    })
  }

  return (
    <div>
      <Head>
        <title>Write | Indegser</title>
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
  const choseh = await chosehApi.getChoseh(bookId)

  return {
    props: {
      choseh,
    },
  }
}

export default Write
