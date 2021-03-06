import React from 'react';
import styled, { createGlobalStyle } from 'styled-components'

import Login from "./pages/login"
import Pages from "./pages"
import Container from './components/container';
import { useIsLoggedIn } from './hooks';

// https://material.io/design/color/the-color-system.html#tools-for-picking-colors
// const primary = "#03A9F4"
// const secondary = "#ff5508"

const GlobalStyles = createGlobalStyle`
  body { 
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  *:focus {
    outline: none;
    box-shadow: 0 0 4pt 2pt #b3e5fc;
  }
`

const AppContainer = styled(Container)`
  position: fixed;
  background-color: #03569b;
  overflow-y: auto;
`

function App() {
  const isLoggedIn = useIsLoggedIn()

  return (
    <AppContainer>
      <GlobalStyles />
      {isLoggedIn ? <Pages /> : <Login />}
    </AppContainer>
  );
}

export default App;
