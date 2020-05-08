import { useTokenStore } from 'stores/tokenStore'

interface IProps {}

const Authorized: React.FC<IProps> = ({ children }) => {
  const token = useTokenStore(s => s.token)

  if (!token) return null

  return <>{children}</>
}

export default Authorized
