import fetch from 'node-fetch'
import Error from 'next/error'
import grayMatter from 'gray-matter'
import Choseh from 'pages/choseh/Choseh'
import sejongApi from 'apis/sejongApi'
import { IStory } from 'types/dataTypes'
import { FC } from 'react'

interface Props {
  story: IStory
}

const Page: FC<Props> = ({ story }) => {
  if (!story) {
    return <Error statusCode={404} />
  }

  return <Choseh story={story} />
}

export const getServerSideProps = async ({ query }) => {
  const slug = query.slug.join('/')

  let story: IStory

  try {
    const data = await sejongApi.getStory(slug)
    const path = `${slug}.md`
    const url = `https://raw.githubusercontent.com/indegser/story/master/${path}`

    const resp = await fetch(url)
    const rawContent = await resp.text()
    const { content } = grayMatter(rawContent)

    story = {
      ...data,
      content,
    }
  } catch (err) {}

  return { props: { story } }
}

export default Page
