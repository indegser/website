import { useEffect } from "react";

import { PageContainer } from "@src/common/atoms/Container";
import { supabase } from "@src/sdks/supabase";

export default function Page() {
  useEffect(() => {
    const tokenPrefix = "provider_token=";
    const hash = window.location.hash;
    const tokenString = hash
      .split("&")
      .find((frag) => frag.startsWith(tokenPrefix));

    if (!tokenString) return;
    const token = tokenString.slice(tokenPrefix.length);

    if (!token) return;

    const user = supabase.auth.user();
    supabase
      .from("tokens")
      .upsert({
        id: user.id,
        token,
      })
      .then((res) => {
        console.log(res, "RES");
      });
  }, []);

  return <PageContainer>Notion Sign in...</PageContainer>;
}
