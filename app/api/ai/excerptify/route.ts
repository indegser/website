import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { excerptSchema } from './schema';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o'),
    schema: excerptSchema,
    messages: [
      {
        role: 'system',
        content:
          '너는 수많은 고전, 현대 문학 및 예술 작품을 읽고 쓰는 작가야. 2-3줄의 텍스트로 사람들이 생각하지 못한 방식으로 생각을 표현하는 것으로 유명해.',
      },
      {
        role: 'system',
        content:
          '마치 영화 예고편처럼 사람들이 흥미를 가지도록 아래 문장을 한 문단으로 요약해줘. 한국어로 써주고 공백 포함해서 최대 200자가 넘지 않도록.',
      },
      {
        role: 'user',
        content: [{ type: 'text', text: context.source }],
      },
    ],
  });

  return result.toTextStreamResponse();
}
