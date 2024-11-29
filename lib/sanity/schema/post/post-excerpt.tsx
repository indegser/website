import { ApiIcon } from '@sanity/icons';
import { Box, Button, Flex } from '@sanity/ui';
import { defineField, set, useFormValue } from 'sanity';
import useSWRMutation from 'swr/mutation';

export const postExcerpt = defineField({
  name: 'excerpt',
  title: 'Excerpt',
  type: 'text',
  rows: 5,
  initialValue: '',
  group: 'meta',
  components: {
    input: function PostExcerptInput(props) {
      const body = useFormValue(['body']) as string;
      const { trigger, isMutating } = useSWRMutation(
        'api/excerptify',
        async () => {
          const { excerpt } = await fetch('/api/ai/excerptify', {
            method: 'POST',
            body: JSON.stringify({ source: JSON.stringify(body) }),
            headers: {
              'content-type': 'application/json',
            },
          }).then((res) => res.json());

          props.onChange(set(excerpt));
        },
      );

      return (
        <Flex gap={3} direction="column" align="stretch">
          <Box flex={1}>{props.renderDefault(props)}</Box>
          <Button
            mode="ghost"
            icon={ApiIcon}
            disabled={isMutating}
            onClick={() => trigger()}
            text={isMutating ? 'Generating...' : 'Generate'}
          />
        </Flex>
      );
    },
  },
});
