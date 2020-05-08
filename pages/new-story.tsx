import Head from 'next/head'
import Editor from 'apps/editor/Editor'

const Page = () => {
  return (
    <>
      <Head>
        <title>New story by @indegser</title>
      </Head>
      <Editor />
    </>
  )
}

export default Page
