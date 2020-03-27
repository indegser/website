import { useForm } from 'react-hook-form'
import { PrimaryButton } from 'design/atoms/button/Button'
import FormGroup, { FormGroupFieldVariant } from 'design/atoms/form/FormGroup'
import { useBannerStore } from 'stores/bannerStore'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useEffect } from 'react'
import { historyApiClient } from 'apis/apolloClient'

const CREATE_HISTORY = gql`
  mutation($input: CreateHistoryInput) {
    history: createHistory(input: $input) {
      id
    }
  }
`

const CreateHistoryForm = () => {
  const { register, handleSubmit } = useForm()
  const setBanner = useBannerStore(s => s.setBanner)
  const [createHistory, { data }] = useMutation(CREATE_HISTORY, {
    client: historyApiClient,
  })

  const action = async data => {
    createHistory({ variables: { input: data } })
  }

  useEffect(() => {
    if (!data?.history) return

    setBanner({
      type: 'success',
      message: `History has been successfully created`,
    })
  }, [data])

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
