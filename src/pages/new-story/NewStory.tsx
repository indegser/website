import { useForm } from 'react-hook-form'
import Label from 'common/atoms/form/Label'
import { PrimaryButton } from 'common/atoms/button/Button'
import sejongApi from 'apis/sejongApi'
import FormContainer from 'common/atoms/container/FormContainer'

const NewStory = () => {
  const { register, handleSubmit } = useForm()

  const createStory = (data) => {
    sejongApi.createStory(data)
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(createStory)}>
        <Label required label="슬러그" htmlFor="slug" />
        <input ref={register} id="slug" name="slug" />
        <Label label="내용" htmlFor="content" />
        <textarea rows={12} ref={register} id="content" name="content" />
        <PrimaryButton type="submit">생성</PrimaryButton>
      </form>
    </FormContainer>
  )
}

export default NewStory
