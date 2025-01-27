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
          '너는 트위터나 인스타그램에서 수십만 명의 구독자를 보유한 인플루언서야. 특기는 어려운 내용을 쉽고 재미있고 클릭 하고 싶게 만드는 것으로 유명해. 이제 글을 줄건데 이걸 보고 요약하면 돼',
      },
      {
        role: 'user',
        content: [{ type: 'text', text: context.source }],
      },
      {
        role: 'system',
        content:
          '문어체로 위에 내용을 한 두 문장으로 작성해줘. 문어체는 합니다, 있습니다로 끝나면 안되고 한다, 있다로 끝나야돼.',
      },
      {
        role: 'system',
        content: '글자를 다 합쳐서 300자 이내로 작성해줘',
      },
    ],
  });

  return result.toTextStreamResponse();
}
