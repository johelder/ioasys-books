import React from 'react';

import {Login} from './pages/Login';

import {ThemeProvider} from 'styled-components';
import {theme} from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
};

export default App;
