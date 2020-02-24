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
      .then(d => void console.log(d))
      .catch(err => void console.log(err))
  }

  return {
    ref,
    submit,
  }
}

export default useCreateHistory
