import Avatar from "common/atoms/avatar/Avatar";
import { SecondaryButton, PrimaryButton } from "common/atoms/button/Button";
import useWhoami from "common/hooks/me/useWhoami";
import Route from "common/hocs/Route";
import styled from "@emotion/styled";
import { useProfileActions } from "./Profile.hooks";
import { useAuthStore } from "stores/authStore";

const Box = styled.div`
  display: flex;
`;

const Actions = styled.div`
  display: flex;

  & > * {
    margin-left: 8px;
  }
`;

const User = styled.div`
  border-left: 1px solid var(--border100);
  padding-left: 8px;
  margin-left: 8px;
  align-self: center;
`;

const AvatarButton = styled.div`
  cursor: pointer;
`;

const SignInButton = styled.button`
  color: var(--primary100);
  border: none;
  outline: none;
  background: transparent;
  padding: 8px 8px;
  margin-right: -8px;
  font-size: 14px;
  &:hover {
    color: var(--primary200);
  }
`;

const Profile = () => {
  const auth = useAuthStore((s) => s.auth);
  const user = useWhoami();
  const { signIn, goNew, goWrite } = useProfileActions(null);

  const isAdmin = auth === "ADMIN";

  return (
    <Box>
      {isAdmin && (
        <Actions>
          <Route path="/story/[...slug]">
            <SecondaryButton onClick={goWrite}>Write</SecondaryButton>
          </Route>
          <PrimaryButton onClick={goNew}>New</PrimaryButton>
          <User>
            <AvatarButton onClick={signIn}>
              <Avatar src={user?.avatar} />
            </AvatarButton>
          </User>
        </Actions>
      )}
      {!isAdmin && (
        <SignInButton onClick={signIn}>Sign in as admin</SignInButton>
      )}
    </Box>
  );
};

export default Profile;
