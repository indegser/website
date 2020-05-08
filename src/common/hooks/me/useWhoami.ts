import { useTokenStore } from 'stores/tokenStore'
import useSWR from 'swr'

const useWhoami = () => {
  const token = useTokenStore((s) => s.token)
  if (!token) return null

  return {
    name: 'indegser',
    avatar: 'https://avatars3.githubusercontent.com/u/12758512?v=4&s=128',
  }
}

export default useWhoami
