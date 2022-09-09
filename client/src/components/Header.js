import styled from "styled-components";
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import {RiHealthBookFill} from "react-icons/ri"
import {CgProfile} from "react-icons/cg"
import {TbReportMedical} from "react-icons/tb"
const Header = () => {
    const { user } = useAuth0();

    return(
        <StyledHeader>
            <div className="logo">
                <Link to="/"><RiHealthBookFill/><h2 className="health">Health-Diary</h2> </Link>
                <div className="subdiv">
                {user &&
                    <>
                        <Link to="/profile"><CgProfile />Profile</Link> 
                        <Link to="/medical"><TbReportMedical />History</Link> 
                    </>
                    }
                    
                {user ? <LogoutButton /> : <LoginButton />}
                
                </div>
            </div>
    </StyledHeader>
    )
}

export default Header;

const StyledHeader = styled.div`
display: flex;
flex-direction: column;
background-color: #072b04;

.logo{
    box-shadow: 0px 7px 5px 0px rgba(227,215,215,0.75);
    justify-content: space-between;
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    /* position: fixed; */
    padding: 15px;
    
}

.logo a {
    color:white;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 40px;
    gap:5px;
}

.subdiv{
    display: flex;
    gap: 15px;
    padding: 15px;
    
}

.subdiv a{
    color:white;
    text-decoration: none;
    display: flex;
    font-size: 28px;
}

.health{
    font-size: 30px;
    display: flex;
    gap:5px;

}
.subdiv a:hover{
    background-color:lightgreen ;
    padding: 5px;
    border-radius:15px;
    color: black;

}

`;