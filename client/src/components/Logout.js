import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <StyledButton onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
    </StyledButton>
  );
};

export default LogoutButton;

const StyledButton = styled.div`
`;