import create from 'zustand'
import { createRef } from 'react'
import sejongApi from 'apis/sejongApi'

const [useRefStore] = create(set => ({
  ref: createRef(),
}))

const useCreateHistory = () => {
  const { ref } = useRefStore(s => s)

  const submit = () => {
    const value = ref.current?.value
    sejongApi
      .createHistory(value)
      .then(d => alert('Created!'))
      .catch(err => alert('Fail to create'))
  }

  return {
    ref,
    submit,
  }
}

export default useCreateHistory
