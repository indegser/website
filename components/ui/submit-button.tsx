import { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './button';

export const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();

  return <Button type="submit" disabled={pending} {...props} />;
};
