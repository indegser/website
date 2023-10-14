import mime from 'mime-types';
import { nanoid } from 'nanoid';

import { supabase } from 'lib/supabase';

export const uploadImageToSupabase = async (
  imageUrl: string,
  folder: string,
) => {
  const response = await fetch(imageUrl);

  if (!response.body) return false;

  const contentType = response.headers.get('Content-Type');
  if (!contentType) return false;

  const extension = mime.extension(contentType);

  if (!extension) {
    return false;
  }

  const id = nanoid();
  const path = `${folder}/${id}.${extension}`;

  await supabase.storage.from('image').upload(path, response.body, {
    contentType,
  });

  const { data } = supabase.storage.from('image').getPublicUrl(path);

  if (!data) return false;

  return {
    id,
    path,
    extension,
    contentType,
    publicURL: data.publicUrl,
  };
};
