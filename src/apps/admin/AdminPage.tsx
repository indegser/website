import { Input } from "reakit/Input";
import { Button } from "reakit/Button";
import styled from "@emotion/styled";
import { useAdminAuth } from "./AdminPage.hooks";

export const AdminPage = () => {
  const { form, handleSignIn } = useAdminAuth();
  const {
    formState: { errors },
  } = form;

  return (
    <Container>
      <FormBox>
        <form onSubmit={handleSignIn}>
          <Input type="email" {...form.register("email")} />
          <Input type="password" {...form.register("password")} />
          <Button type="submit">관리자 계정 로그인</Button>
        </form>
      </FormBox>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormBox = styled.div``;
