import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --color-white: white;
    }
    *, *::after, *::before, h1:is(h1){
    margin:0;
    padding:0;
    box-sizing: border-box;
}
body {
    padding: 0;
    margin: 0;
    
}
`;