import styled from "styled-components";
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import Profile from "./Profile";
import { useHistory, useParams } from "react-router-dom";

const Header = () => {
    const { user } = useAuth0();
//     const {_id} = useParams();
//   console.log(_id)
    return(
        <StyledHeader>
            <Link to="/">Health Diary</Link>
            <Link to="/profile">Profile</Link> 
            <Link to="/medical">Medical</Link> 
        
            {user ? <LogoutButton /> : <LoginButton />}
           
        </StyledHeader>
    )
}

export default Header;

const StyledHeader = styled.div`
/* border: 2px solid red; */
display: flex;
justify-content: space-between;
background-color: green;
padding: 15px;
font-size: 30px;
color: white;


`;