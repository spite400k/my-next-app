import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET メソッド: データを取得
 */
export async function GET() {
  try {
    const keywords = await prisma.keyWord.findMany();
    return new Response(JSON.stringify(keywords), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'データの取得に失敗しました。' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * POST メソッド: データを保存
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await prisma.keyWord.create({
        data: body, // 連想配列として保存
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(JSON.stringify({ error: 'データの保存に失敗しました。' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
