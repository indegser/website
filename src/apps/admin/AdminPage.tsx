import { Input } from "reakit/Input";
import { Button } from "reakit/Button";
import styled from "@emotion/styled";
import { useAdminAuth } from "./AdminPage.hooks";
import { useIsAdmin } from "common/hooks/admin.hooks";
import { colors } from "style.types";

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
            placeholder="E-mail"
            {...form.register("email")}
          />
          <StyledInput
            type="password"
            placeholder="Password"
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
  background: ${colors.gray50};
  border-color: ${colors.gray200};
  color: ${colors.gray900};

  &:hover,
  &:focus {
    background: ${colors.gray50} !important;
  }

  &:focus {
    box-shadow: 0 0 2px 3px ${colors.blue400};
  }

  & + & {
    margin-top: 1rem;
  }
`;
