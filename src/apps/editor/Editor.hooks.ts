import { useForm } from 'react-hook-form'
import sejongApi from 'apis/sejongApi'
import { IStory } from 'types/dataTypes'
import { useBannerStore } from 'common/organs/banner/Banner.hooks'

export const useEditorForm = (story?: IStory) => {
  const { register, handleSubmit } = useForm()
  const setBanner = useBannerStore((s) => s.setBanner)

  const submit = (data) => {
    let promise: Promise<any>
    if (story) {
      promise = sejongApi.updateStory({ ...story, ...data })
    } else {
      promise = sejongApi.createStory(data)
    }

    promise
      .then((d) => {
        setBanner({
          type: 'success',
          message: `Successfully ${story ? 'updated' : 'created'} story!`,
        })
      })
      .catch((err) => {
        setBanner({
          type: 'failure',
          message: err.message,
        })
      })
  }

  return {
    register,
    handleSubmit: handleSubmit(submit),
  }
}
