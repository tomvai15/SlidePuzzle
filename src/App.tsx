import React from 'react';
import './App.css';
import theme from 'themes/theme';
import { Main } from 'pages/Main';
import { ThemeProvider } from '@mui/material';

const mdTheme = theme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Main></Main>
    </ThemeProvider>
  );
}

export default App;
