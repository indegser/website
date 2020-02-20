import { useEffect } from 'react'
import { getRedirectResult } from 'apis/firebase'

const SignIn = () => {
  useEffect(() => {
    getRedirectResult()
  }, [])

  return (
    <div className="container">
      Signing In ...
      <style jsx>
        {`
          .container {
            position: fixed;
            width: 100vw;
            height: 100vh;
            left: 0;
            top: 0;
          }
        `}
      </style>
    </div>
  )
}

export default SignIn
