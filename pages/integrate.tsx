import { PageContainer } from "@src/common/atoms/Container";
import { NOTION_CLIENT_ID, NOTION_REDIRECT_URI } from "@src/types/const.types";

export default function Page() {
  const href = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${NOTION_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    NOTION_REDIRECT_URI
  )}&response_type=code`;
  return (
    <PageContainer>
      <a href={href}>Add to Notion</a>
    </PageContainer>
  );
}
