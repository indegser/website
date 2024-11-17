'use client';

import { bookSchema } from '@/app/api/ai/book/schema';
import { experimental_useObject as useObject } from 'ai/react';

export default function Page() {
  const { object, submit } = useObject({
    api: '/api/ai/book',
    schema: bookSchema,
  });

  return (
    <div>
      <button
        onClick={() =>
          submit({
            imageUrl:
              'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791190030915.jpg',
          })
        }
      >
        Generate notifications
      </button>
      <div>
        <h3>{object?.book?.title}</h3>
        <p>{object?.book?.description}</p>
        <p>{object?.book?.recommendation}</p>
        <div>
          {object?.book?.authors?.map((keyword, i) => {
            return (
              <code key={i} className="mr-2 text-sm">
                {keyword}
              </code>
            );
          })}
        </div>
      </div>
    </div>
  );
}
