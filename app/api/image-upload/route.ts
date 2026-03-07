import { createSupabaseAdminClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
  bucket: string;
  path: string;
  publicUrl: string;
  contentType: string;
};

const imageBucket = process.env.SUPABASE_IMAGE_BUCKET || 'post-images';

const getFileExtension = (url: string, contentType: string) => {
  const lowerType = contentType.toLowerCase();
  if (lowerType.includes('image/png')) return 'png';
  if (lowerType.includes('image/webp')) return 'webp';
  if (lowerType.includes('image/gif')) return 'gif';
  if (lowerType.includes('image/svg+xml')) return 'svg';
  if (lowerType.includes('image/avif')) return 'avif';
  if (lowerType.includes('image/jpeg')) return 'jpg';

  const pathname = new URL(url).pathname;
  const maybeExtension = pathname.split('.').pop();
  if (maybeExtension && maybeExtension.length <= 5) {
    return maybeExtension.toLowerCase();
  }

  return 'jpg';
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'url searchParam is required' },
      { status: 400 },
    );
  }

  try {
    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${imageResponse.status}` },
        { status: 400 },
      );
    }

    const body = await imageResponse.arrayBuffer();
    const contentType =
      imageResponse.headers.get('content-type') || 'image/jpeg';
    const extension = getFileExtension(url, contentType);
    const path = `link-previews/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;

    const supabase = createSupabaseAdminClient();
    const uploadResult = await supabase.storage
      .from(imageBucket)
      .upload(path, body, {
        contentType,
        upsert: false,
      });

    if (uploadResult.error) {
      throw uploadResult.error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(imageBucket).getPublicUrl(path);

    return NextResponse.json<ResponseData>({
      bucket: imageBucket,
      path,
      publicUrl,
      contentType,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
