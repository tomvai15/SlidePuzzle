import React from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from 'themes/theme';
import { Main } from 'pages/Main';

const mdTheme = theme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Main></Main>
    </ThemeProvider>
  );
}

export default App;
