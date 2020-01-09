import { useEffect } from "react"

const Redirect = () => {
  useEffect(() => {
    const { searchParams } = new URL(location.href)
    const token = searchParams.get('token')

    localStorage.setItem('token', token)
    location.href = '/'
  }, [])
  
  return (
    <div>
      로그인에 성공했습니다. 곧 리다이렉트 됩니다.
    </div>
  )
}

export default Redirect
