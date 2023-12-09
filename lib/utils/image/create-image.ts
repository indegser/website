import { cloudinary } from '@/lib/cloudinary';

export const uploadImage = async (src: string, folder?: string) => {
  const shouldCreate = !src.includes('res.cloudinary.com');
  if (!shouldCreate) return src;

  const { public_id, secure_url } = await cloudinary.uploader.upload(src, {
    folder: folder && `${folder}/`,
  });

  console.log(`public_id: ${public_id}`);
  return secure_url;
};
