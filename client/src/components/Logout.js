import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <StyledButton onClick={() => logout({ returnTo: window.location.origin })}>
        Signout
    </StyledButton>
  );
};

export default LogoutButton;

const StyledButton = styled.div`
color: white;
font-size: 30px;
display: flex;
align-items: center;


 &:hover{
  background-color:lightgreen ;
    padding: 5px;
    border-radius:15px;
    color: black;
 }
`;

