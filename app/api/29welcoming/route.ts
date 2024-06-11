import { NextResponse } from 'next/server';

const arr = new Array(2).fill(true).map((_, index) => index + 1);
const getSheetName = (n: number) => `이굿입점회${n}일차`;
const times = [
  'Jun 10 2024 00:00:00 GMT+0900 (한국 표준시)',
  'Jun 10 2024 19:00:00 GMT+0900 (한국 표준시)',
  'Jun 11 2024 19:00:00 GMT+0900 (한국 표준시)',
  'Jun 12 2024 19:00:00 GMT+0900 (한국 표준시)',
  'Jun 13 2024 19:00:00 GMT+0900 (한국 표준시)',
  'Jun 14 2024 19:00:00 GMT+0900 (한국 표준시)',
  'Jun 15 2024 19:00:00 GMT+0900 (한국 표준시)',
  'Jun 16 2024 19:00:00 GMT+0900 (한국 표준시)',
  'Jun 17 2024 19:00:00 GMT+0900 (한국 표준시)',
  'Jun 18 2024 19:00:00 GMT+0900 (한국 표준시)',
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product = searchParams.get('product');

  if (!product) {
    return NextResponse.json(
      { error: 'product is required in url' },
      { status: 400 },
    );
  }

  const map: Record<
    string,
    { startAt: string; endAt: string; frontBrandId: string }[]
  > = {};

  await Promise.all(
    arr.map(async (value) => {
      const sheetName = getSheetName(value);
      const result = await fetch(
        `https://api.sheety.co/b37b9febbb3e64cb324698a47fa322eb/2024 상반기 이굿위크 이굿입점회 동기화 시트/${sheetName}`,
      ).then((res) => res.json());

      const startAt = times[value - 1];
      const endAt = times[value];

      for (const cell of result[sheetName]) {
        const ids = cell.productIds.split(',');
        for (const id of ids) {
          const data = {
            startAt,
            endAt,
            frontBrandId: cell.frontBrandId,
          };

          if (map[id]) {
            map[id].push(data);
          }
          map[id] = [data];
        }
      }
    }),
  );

  return NextResponse.json({ data: map[product] });
}
