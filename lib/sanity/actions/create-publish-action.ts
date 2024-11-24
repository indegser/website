import {
  DocumentActionComponent,
  DocumentActionsContext,
  useDocumentOperation,
} from 'sanity';

export const createPublishAction = (
  originalAction: DocumentActionComponent,
  context: DocumentActionsContext,
) => {
  const PostPublishAction: DocumentActionComponent = (props) => {
    const { patch, publish } = useDocumentOperation(
      context.documentId!,
      context.schemaType,
    );

    const originalResult = originalAction(props)!;

    return {
      ...originalResult,
      onHandle: async () => {
        const { excerpt } = await fetch('/api/ai/excerptify', {
          method: 'POST',
          body: JSON.stringify({ source: JSON.stringify(props.draft!.body) }),
          headers: {
            'content-type': 'application/json',
          },
        }).then((res) => res.json());

        patch.execute([
          { set: { excerpt, publishedAt: new Date().toISOString() } },
        ]);

        publish.execute();
        props.onComplete();
      },
    };
  };

  return PostPublishAction;
};
