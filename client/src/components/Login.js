import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

    return <StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>;
};

export default LoginButton;

const StyledButton = styled.div`

`;