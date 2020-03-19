import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import FormGroup, {
  FormGroupWidthVariant,
  FormGroupFieldVariant,
} from 'design/atoms/form/FormGroup'
import sejongApi from 'apis/sejongApi'
import { useBannerStore } from 'stores/bannerStore'

const CreateHistoryForm = () => {
  const { register, handleSubmit } = useForm()
  const setBanner = useBannerStore(s => s.setBanner)

  const action = async data => {
    const {
      history: { id },
    } = await sejongApi.createHistory(data)

    setBanner({
      type: 'success',
      message: `History has been successfully created`,
    })
  }

  return (
    <form onSubmit={handleSubmit(action)}>
      <FormGroup name="link" required ref={register} label="Link" />
      <FormGroup
        name="comment"
        fieldVariant={FormGroupFieldVariant.Textarea}
        ref={register}
        label="Comment"
      />
      <PrimaryButton type="submit">Create bookmark</PrimaryButton>
    </form>
  )
}

export default CreateHistoryForm
