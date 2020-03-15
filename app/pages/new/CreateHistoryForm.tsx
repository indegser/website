import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import FormGroup, {
  FormGroupWidthVariant,
  FormGroupFieldVariant,
} from 'design/atoms/form/FormGroup'
import sejongApi from 'apis/sejongApi'

const CreateHistoryForm = () => {
  const { register, handleSubmit } = useForm()

  const action = data => {
    sejongApi.createHistory(data)
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
