import styled from "styled-components";


const Main = () => {

    return(
        <Wrapper>
            <div className="hero">
            <h1></h1>
            <p></p>
            <button></button>
            </div>
        </Wrapper>
    )
}

export default Main;

const Wrapper = styled.div`
    background-image: linear-gradient(180deg, hsla(112, 23%, 40%, 1) 22%, hsla(42, 100%, 66%, 1) 100%);
    height: 500px;
    transform: skew(-25deg);

.hero{
    
}
`;