import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
}
body,
#root {
  display: flex;
  min-height: 100%;
  min-width: 100%;
  font-family: "Arial", sans-serif;
  background-color: black;
}
`;
