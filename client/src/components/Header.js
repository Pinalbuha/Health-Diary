import styled from "styled-components";

const Header = () => {
    return(
        <StyledHeader>
            <div>Health Diary</div>
            <div>Profile</div>
            <div>Log In</div>
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