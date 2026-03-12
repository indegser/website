import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: modelMessages,
  });

  return result.toTextStreamResponse();
}
