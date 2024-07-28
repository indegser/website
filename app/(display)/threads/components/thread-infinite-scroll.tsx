import { useInView } from 'react-intersection-observer';

interface Props {
  fetchMore: () => void;
}

export function ThreadInfiniteScroll({ fetchMore }: Props) {
  const { ref } = useInView({
    onChange: (inView) => {
      inView && fetchMore();
    },
  });

  return <div ref={ref} />;
}
