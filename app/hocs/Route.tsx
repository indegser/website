import { useRouter } from 'next/router'

interface IProps {
  path: string
}

const Route: React.FC<IProps> = ({ path, children }) => {
  const { pathname } = useRouter()
  if (pathname !== path) return null
  return <>{children}</>
}

export default Route
