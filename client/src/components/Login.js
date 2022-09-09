import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

    return <StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>;
};

export default LoginButton;

const StyledButton = styled.div`
cursor: pointer;
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