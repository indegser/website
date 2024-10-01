import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';

import { bookSchema } from './schema';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o'),
    schema: bookSchema,
    messages: [
      { role: 'system', content: 'Generate a book data using this image' },
      {
        role: 'user',
        content: [{ type: 'image', image: new URL(context.imageUrl) }],
      },
    ],
  });

  return result.toTextStreamResponse();
}
