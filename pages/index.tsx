import React from 'react'
import Head from 'next/head'
import Nav from '../app/organs/Nav'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
    </div>
  )
}

export default Home
