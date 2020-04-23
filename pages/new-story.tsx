import Head from 'next/head'
import NewStory from 'pages/new-story/NewStory'

const Page = () => {
  return (
    <>
      <Head>
        <title>New story by @indegser</title>
      </Head>
      <NewStory />
    </>
  )
}

export default Page
