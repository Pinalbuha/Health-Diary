import styled from "styled-components";
import LoginButton from "./Login";


const Main = () => {

    return(
        <Wrapper>
            <div className="hero">
                <h1>Health Diary</h1>
                <p>An application that allows you to store your medical data and search for doctors nearby you</p>
                <p>Log In to use the features of website</p>
                <LoginButton />
            </div>
        </Wrapper>
    )
}

export default Main;

const Wrapper = styled.div`
    background-image: linear-gradient(180deg, hsla(112, 23%, 40%, 1) 22%, hsla(42, 100%, 66%, 1) 100%);
    height: 650px;
    /* transform: skew(-25deg); */

.hero{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
`;