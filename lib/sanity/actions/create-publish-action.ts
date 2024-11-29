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
    const { patch } = useDocumentOperation(
      context.documentId!,
      context.schemaType,
    );

    const originalResult = originalAction(props)!;

    return {
      ...originalResult,
      onHandle: async () => {
        patch.execute([{ set: { publishedAt: new Date().toISOString() } }]);

        originalResult.onHandle?.();
      },
    };
  };

  return PostPublishAction;
};
