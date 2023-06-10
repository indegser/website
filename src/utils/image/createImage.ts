import sizeOf from 'image-size';
import mime from 'mime-types';
import { nanoid } from 'nanoid';

import { supabase } from '@src/sdks/supabase';
import { CDN_ORIGIN } from '@src/types/constants';

export const uploadImage = async (src: string) => {
  const shouldCreate = !src.includes(CDN_ORIGIN);

  if (!shouldCreate) {
    return supabase.from('images').select('*').eq('url', src).limit(1).single();
  }

  const arrayBuffer = await (await fetch(src)).arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  const id = nanoid();
  const { width, height, type } = sizeOf(Buffer.from(arrayBuffer));
  const path = `images/${id}.${type}`;

  await supabase.storage.from('image').upload(path, buffer, {
    contentType: mime.lookup(type) || undefined,
  });

  const { data } = supabase.storage.from('image').getPublicUrl(path);

  if (!data) return false;

  return supabase
    .from('images')
    .insert({
      id,
      width,
      height,
      type,
      url: data.publicUrl,
    })
    .select()
    .limit(1)
    .single();
};
