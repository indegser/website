import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';

import { imageTagSchema } from './schema';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o'),
    schema: imageTagSchema,
    messages: [
      { role: 'system', content: 'Generate 3 tags for an given image' },
      {
        role: 'user',
        content: [{ type: 'image', image: new URL(context.imageUrl) }],
      },
    ],
  });

  return result.toTextStreamResponse();
}
