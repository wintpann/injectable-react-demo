import React, { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@uikit/theme/theme.provider';
import { InjectableHooksHolder } from '@injectable';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

export const Baseline: FC<PropsWithChildren> = ({ children }) => (
  <>
    <BrowserRouter>
      <InjectableHooksHolder />
      <CssBaseline>
        <ThemeProvider>{children}</ThemeProvider>
      </CssBaseline>
    </BrowserRouter>
    <ToastContainer theme="dark" position="top-center" hideProgressBar autoClose={2000} />
  </>
);
