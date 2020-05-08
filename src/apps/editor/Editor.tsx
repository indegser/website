import { FC } from 'react'
import { IStory } from 'types/dataTypes'
import FormContainer from 'design/atoms/container/FormContainer'
import Label from 'design/atoms/form/Label'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import sejongApi from 'apis/sejongApi'

interface Props {
  story: IStory
}

const Editor: FC<Props> = ({ story }) => {
  const { register, handleSubmit } = useForm()

  const createOrUpdateStory = (data) => {
    sejongApi.updateStory({
      ...story,
      ...data,
    })
  }

  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit(createOrUpdateStory)}>
          <Label required label="슬러그" htmlFor="slug" />
          <input
            ref={register}
            id="slug"
            name="slug"
            defaultValue={story.slug}
          />
          <Label label="내용" htmlFor="content" />
          <textarea
            rows={12}
            ref={register}
            id="content"
            name="content"
            defaultValue={story.rawContent}
          />
          <PrimaryButton type="submit">생성</PrimaryButton>
        </form>
      </FormContainer>
    </div>
  )
}

export default Editor
