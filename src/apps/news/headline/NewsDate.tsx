import { useIsAdmin } from "common/hooks/admin.hooks";
import { styled, theme } from "common/stitches.config";
import { useNewsDate } from "./NewsDate.hooks";

export const NewsDate = () => {
  const isAdmin = useIsAdmin();
  const { displayDate, handleChange } = useNewsDate();

  return (
    <PublishedAt>
      {isAdmin ? <input type="date" onChange={handleChange} /> : displayDate}
    </PublishedAt>
  );
};

const PublishedAt = styled("div", {
  fontSize: 14,
  fontWeight: 560,
  color: theme.colors.fgSubtle,
});
