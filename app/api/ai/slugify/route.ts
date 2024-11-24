import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';

import { slugSchema } from './schema';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o'),
    schema: slugSchema,
    messages: [
      {
        role: 'system',
        content:
          'Create url slug with given title. Translate to english then write in kebab case and use alphanumeric character only',
      },
      {
        role: 'user',
        content: [{ type: 'text', text: context.title }],
      },
    ],
  });

  return result.toTextStreamResponse();
}
