import Sns from './Sns'
import PageContainer from 'atoms/container/PageContainer'
import Box from 'atoms/box/Box'
import Grid from 'atoms/box/Grid'
import { FooterCopyright } from './Footer.styled'

const Footer = () => {
  return (
    <footer>
      <Box mt={4} py={3}>
        <PageContainer>
          <Grid
            gridGap="0 4px"
            gridAutoFlow="column"
            gridAutoColumns="max-content"
            alignItems="center"
          >
            <FooterCopyright>
              Designed and developed by Indegser
            </FooterCopyright>
            <Sns />
          </Grid>
        </PageContainer>
      </Box>
    </footer>
  )
}

export default Footer
