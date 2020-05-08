import Error from 'next/error'
import Story from 'apps/story/Story'
import sejongApi from 'apis/sejongApi'
import { IStory } from 'types/dataTypes'
import { FC } from 'react'
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
  return <Story story={story} />
}

export const getServerSideProps = async ({ query }) => {
  const slug = query.slug.join('/')
  const { edit = null } = query

  let story: IStory = null

  try {
    story = await sejongApi.getStory(slug)
  } catch (err) {}

  return { props: { story, edit } }
}

export default Page
