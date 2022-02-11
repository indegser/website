import { Input } from "reakit/Input";
import { Button } from "reakit/Button";
import styled from "@emotion/styled";
import { useAdminAuth } from "./AdminPage.hooks";
import { useIsAdmin } from "common/hooks/admin.hooks";

export const AdminPage = () => {
  const isAdmin = useIsAdmin();
  const { form, handleSignIn, handleSignOut } = useAdminAuth();
  const {
    formState: { errors },
  } = form;

  return (
    <Container>
      <FormBox>
        <form onSubmit={handleSignIn}>
          <StyledInput
            type="email"
            placeholder="이메일"
            {...form.register("email")}
          />
          <StyledInput
            type="password"
            placeholder="비밀번호"
            {...form.register("password")}
          />
          <Button type="submit">관리자 계정 로그인</Button>
        </form>
        {isAdmin && (
          <Button type="button" onClick={handleSignOut}>
            Sign out
          </Button>
        )}
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

const StyledInput = styled(Input)`
  width: 240px;
  font-size: 14px;
  line-height: 1.8;

  &:hover,
  &:focus {
  }

  &:focus {
  }

  & + & {
    margin-top: 1rem;
  }
`;