import { useForm } from 'react-hook-form'
import sejongApi from 'apis/sejongApi'
import { IStory } from 'types/dataTypes'

export const useEditorForm = (story?: IStory) => {
  const { register, handleSubmit } = useForm()

  const submit = (data) => {
    if (story) {
      sejongApi.updateStory({ ...story, ...data })
    } else {
      sejongApi.createStory(data)
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(submit),
  }
}
