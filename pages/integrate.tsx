import { useForm } from "react-hook-form";

import { PageContainer } from "@src/common/atoms/Container";
import { Fieldset } from "@src/design/atoms/Fieldset";
import { Input } from "@src/design/atoms/Input";
import { Label } from "@src/design/atoms/Label";
import { supabase } from "@src/sdks/supabase";
import { ORIGIN } from "@src/types/const.types";

type Data = {
  database_id: string;
};

export default function Page() {
  const { register, handleSubmit } = useForm<Data>();

  const handleSignIn = (data: Data) => {
    supabase.auth.signIn(
      { provider: "notion" },
      { redirectTo: `${ORIGIN}/auth/notion?database_id=${data.database_id}` }
    );
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit((data) => handleSignIn(data))}>
        <Fieldset>
          <Label>Database ID</Label>
          <Input {...register("database_id")} defaultValue="" />
        </Fieldset>
        <button type="submit">Sign in with Notion</button>
      </form>
    </PageContainer>
  );
}
