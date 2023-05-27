import { SpinnerCircular } from 'spinners-react';

import { theme } from '../theme';

export const Spinner = () => (
  <div className="flex justify-center px-6">
    <SpinnerCircular
      size={28}
      color={theme.colors.gray10.toString()}
      secondaryColor={theme.colors.gray4.toString()}
    />
  </div>
);
