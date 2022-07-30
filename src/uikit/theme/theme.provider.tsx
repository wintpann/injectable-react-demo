import React, { FC, PropsWithChildren } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
);
