import useSWR from 'swr'
import sejongApi from 'apis/sejongApi'
import NewsGrid from 'design/organs/grid/NewsGrid'
import PageContainer from 'design/atoms/container/PageContainer'
import AvatarCard from 'design/organs/card/AvatarCard'

const Story = () => {
  const { data } = useSWR(
    `{
    stories {
      id
      title
      cover
      createdAt
      modifiedAt
    }
  }`,
    sejongApi.story
  )

  return (
    <PageContainer>
      <NewsGrid>
        {data?.stories.map(d => (
          <AvatarCard key={d.id} {...d} />
        ))}
      </NewsGrid>
    </PageContainer>
  )
}

export default Story
