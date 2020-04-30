import fetch from 'node-fetch'
import Error from 'next/error'
import grayMatter from 'gray-matter'
import Choseh from 'pages/choseh/Choseh'
import sejongApi from 'apis/sejongApi'
import { IStory } from 'types/dataTypes'
import { FC, useEffect } from 'react'
import Editor from 'apps/editor/Editor'

interface Props {
  story: IStory
  edit: boolean
}

const Page: FC<Props> = ({ story, edit }) => {
  if (!story) {
    return <Error statusCode={404} />
  }

  if (edit) {
    return <Editor story={story} />
  }
  return <Choseh story={story} />
}

export const getServerSideProps = async ({ query }) => {
  const slug = query.slug.join('/')
  const { edit = null } = query

  let story: IStory

  try {
    const data = await sejongApi.getStory(slug)

    if (!data.github) {
      return { props: {} }
    }

    const resp = await fetch(data.github?.file.downloadUrl)
    const rawContent = await resp.text()
    const { content } = grayMatter(rawContent)

    story = {
      ...data,
      content,
      rawContent,
    }
  } catch (err) {}

  return { props: { story, edit } }
}

export default Page
