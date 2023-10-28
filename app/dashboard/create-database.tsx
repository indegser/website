'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createDatabase } from '@/lib/actions/create-database';
import { PlusIcon } from '@radix-ui/react-icons';

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
            name="id"
            placeholder="Database ID ex) 102e395151ae486680dcd33049fe281d"
          />
          <div className="flex-shrink-0">
            <Button type="submit">
              <PlusIcon className="mr-2 h-4 w-4" /> Add New...
            </Button>
          </div>
        </div>
        <div>{state?.message}</div>
      </form>
    </div>
  );
}
