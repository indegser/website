import { styled, theme } from "common/stitches.config";
import { useTagForm } from "./TagForm.hooks";

export const TagForm = () => {
  const { form, handleSubmit } = useTagForm();

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <StyledInput
          {...form.register("tag")}
          type="text"
          autoComplete="off"
          autoFocus
        />
      </form>
    </Container>
  );
};

const Container = styled("div", {
  background: theme.colors.canvasSubtle,
  borderBottom: `1px solid ${theme.colors.borderSubtle}`,
});

const StyledInput = styled("input", {
  border: "none",
  outline: "none",
  display: "block",
  background: "transparent",
  padding: "6px 16px",
  boxSizing: "border-box",
});
