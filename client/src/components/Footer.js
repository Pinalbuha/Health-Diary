import styled from "styled-components";

const Footer = () => {
    return(
        <Wrapper>
            <h2>Copyright @ 2022</h2>
        </Wrapper>
    )
}

export default Footer;


const Wrapper = styled.div`
display: flex;
color: white;
background-color: #072b04;
align-items: center;
justify-content: center;
padding: 10px;
height: 60px;

`;