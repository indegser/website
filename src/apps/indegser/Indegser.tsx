import { IndegserContext, IndegserContextType } from "./Indegser.hooks";
import Resume from "./resume/Resume";
import { useRouter } from "next/router";
import Portfolio from "./portfolio/Portfolio";
import XNavigator from "./XNavigator";
import { PageContainer } from "@src/common/atoms/Container";

const Indegser = () => {
  const { query, pathname } = useRouter();
  const isPortfolioPage = pathname.includes("portfolio");
  const lang = (query.lang?.toString() || "ko") as IndegserContextType["lang"];

  return (
    <IndegserContext.Provider value={{ lang }}>
      <PageContainer style={{ marginTop: -20 }}>
        <XNavigator />
        {isPortfolioPage ? <Portfolio /> : <Resume />}
      </PageContainer>
    </IndegserContext.Provider>
  );
};

export default Indegser;
