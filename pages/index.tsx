import React from 'react'
import Head from 'next/head'
import { signInWithGoogle, signInWithGithub, signInWithFacebook } from '../src/services/firebase'
import Nav from '../app/organs/Nav'
import GlobalStyle from '../app/atoms/GlobalStyle'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Nav />
      <div className="hero">
        <div onClick={signInWithGoogle}>
          Signin with Google
        </div>
        <div onClick={signInWithFacebook}>
          Signin with Facebook
        </div>
        <div onClick={signInWithGithub}>
          Signin with Github
        </div>
      </div>
    </div>
  )
}

export default Home
