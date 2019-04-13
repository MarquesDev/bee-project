import React from 'react';
import { ThemeProvider as Provider } from 'styled-components';
import theme from './../theme/theme';
import { Global } from './../theme/global';

export const ThemeProvider = ({ children }) => (
  <Provider theme={theme}>
    <Global>{children}</Global>
  </Provider>
);
