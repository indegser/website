import useSWR from 'swr'

export function useAxiosSWR<T>(key, fetcher) {
  return useSWR<T>(key, async () => {
    const { data } = await fetcher()
    return data.data
  })
}
