import React from 'react';

import {AppProvider} from './hooks';

import {ThemeProvider} from 'styled-components';
import {theme} from './styles/theme';
import {Routes} from './routes';

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
