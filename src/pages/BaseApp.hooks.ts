import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { amplitudeSdk } from '@src/sdks/amplitude';

export const useInitAmplitude = () => {
  useIsomorphicLayoutEffect(() => {
    amplitudeSdk.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);
  }, []);
};
