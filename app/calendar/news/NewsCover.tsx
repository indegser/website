import styled from '@emotion/styled';
import { NewsType } from '../@shared/type';

interface Props {
  news: NewsType;
}

export const NewsCover = ({ news }: Props) => {
  return (
    <Container>
      <img src={news.coverImageUrl} />
    </Container>
  );
};

const Container = styled.div`
  aspect-ratio: 375 / 380;
  position: relative;
  width: 100%;

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
  }
`;

const Mark = styled.div``;
