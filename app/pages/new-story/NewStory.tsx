import PageContainer from 'design/atoms/container/PageContainer'
import { useForm } from 'react-hook-form'
import Label from 'design/atoms/form/Label'
import { PrimaryButton } from 'design/atoms/button/Button'
import sejongApi from 'apis/sejongApi'

const NewStory = () => {
  const { register, handleSubmit } = useForm()

  const createStory = (data) => {
    sejongApi.createStory(data)
  }

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(createStory)}>
        <Label required label="슬러그" htmlFor="slug" />
        <input ref={register} id="slug" name="slug" />
        <Label label="내용" htmlFor="content" />
        <textarea rows={12} ref={register} id="content" name="content" />
        <PrimaryButton type="submit">생성</PrimaryButton>
      </form>
    </PageContainer>
  )
}

export default NewStory
