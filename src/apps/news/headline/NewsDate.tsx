import { useIsAdmin } from "@src/common/hooks/admin.hooks";
import { styled, theme } from "@src/common/stitches.config";
import { useNewsDate } from "./NewsDate.hooks";

export const NewsDate = () => {
  const isAdmin = useIsAdmin();
  const { inputValue, displayDate, handleChange } = useNewsDate();

  return (
    <PublishedAt>
      {isAdmin ? (
        <input
          type="datetime-local"
          defaultValue={inputValue}
          onChange={handleChange}
        />
      ) : (
        displayDate
      )}
    </PublishedAt>
  );
};

const PublishedAt = styled("div", {
  fontSize: 14,
  fontWeight: 560,
  color: theme.colors.fgSubtle,
});
