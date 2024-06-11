import { SanityImageAssetDocument } from 'next-sanity';
import { FocusEventHandler } from 'react';
import { ObjectInputProps, defineField, defineType, set } from 'sanity';
import { LinkPreview, linkPreviewSchema } from '../types';

export default defineType({
  name: 'linkPreview',
  title: 'Link Preview',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    } as const),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    } as const),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    } as const),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    } as const),
  ],
  components: {
    input: function LinkPreviewInput(props: ObjectInputProps) {
      const handleBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
        try {
          const data: LinkPreview = await fetch(
            `/api/link-preview?url=${encodeURIComponent(
              e.currentTarget.value,
            )}`,
          ).then((res) => res.json());

          const linkPreview = linkPreviewSchema.parse(data);

          const imageAsset: SanityImageAssetDocument | null =
            linkPreview.imageUrl
              ? await fetch(
                  `/api/image-upload?url=${encodeURIComponent(
                    linkPreview.imageUrl,
                  )}`,
                ).then((res) => res.json())
              : null;

          props.onChange(
            set({
              ...props.value,
              link: linkPreview.link,
              title: linkPreview.title,
              description: linkPreview.description,
              image: imageAsset
                ? {
                    _type: 'image',
                    asset: {
                      _type: 'reference',
                      _ref: imageAsset._id,
                    },
                  }
                : null,
            }),
          );
        } catch (err) {
          console.error(err);
        }
      };

      return (
        <div>
          <input type="url" placeholder="sdf" onBlur={handleBlur} />
        </div>
      );
    },
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
});
