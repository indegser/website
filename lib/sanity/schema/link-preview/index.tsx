import { Spinner, TextInput } from '@sanity/ui';
import { FocusEventHandler } from 'react';
import { ObjectInputProps, defineField, defineType, set } from 'sanity';
import { useLinkPreviewMutation } from './use-link-preview-mutation';

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
    input: function LinkPreviewInput({ value, onChange }: ObjectInputProps) {
      const link = value?.link || '';
      const { trigger, isMutating } = useLinkPreviewMutation({
        onSuccess: (data) => {
          const patch = set({
            ...value,
            ...data.linkPreview,
            image: data.imageAsset
              ? {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: data.imageAsset._id,
                  },
                }
              : null,
          });

          onChange(patch);
        },
      });

      const handleBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
        const nextLink = e.currentTarget.value;
        if (nextLink === link) return;

        trigger({ url: nextLink });
      };

      return (
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <TextInput
              type="url"
              placeholder="https://google.com"
              onBlur={handleBlur}
              defaultValue={link}
              readOnly={isMutating}
              disabled={isMutating}
            />
          </div>
          {isMutating ? <Spinner /> : null}
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
