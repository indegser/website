export const Code = ({ attributes, children }) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};
