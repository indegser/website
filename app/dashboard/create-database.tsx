'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/ui/submit-button';
import { createDatabase } from '@/lib/actions/create-database';
import { ExclamationTriangleIcon, PlusIcon } from '@radix-ui/react-icons';

import { useFormState } from 'react-dom';

export default function CreateDatabase() {
  const [state, formAction] = useFormState(createDatabase, {
    message: undefined,
  });

  return (
    <div className="mb-4">
      <form action={formAction}>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            name="url"
            placeholder="ex) https://www.notion.so/5cb7250a1c76424fa5546c1ad60d159f?v=3e9136937cf74144aad785c78cac06f3&pvs=4"
          />
          <div className="flex-shrink-0">
            <SubmitButton>
              <PlusIcon className="mr-2 h-4 w-4" /> Add New...
            </SubmitButton>
          </div>
        </div>
        <div>
          {state?.message ? (
            <Alert variant="destructive" className="mt-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          ) : null}
        </div>
      </form>
    </div>
  );
}
