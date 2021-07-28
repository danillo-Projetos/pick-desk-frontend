import React from 'react';
import {
  MuiThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import * as tokens from './tokens.json';

const estilo = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      light: tokens['token-brandcolor-primary-lightest'],
      main: tokens['token-brandcolor-primary-medium'],
      dark: tokens['token-brandcolor-primary-darkest'],
    },
    secondary: {
      light: tokens['token-brandcolor-secondary-lightest'],
      main: tokens['token-brandcolor-secondary-medium'],
      dark: tokens['token-brandcolor-secondary-darkest'],
    },
    error: {
      light: tokens['token-dangercolor-lightest'],
      main: tokens['token-dangercolor-medium'],
      dark: tokens['token-dangercolor-darkest'],
    },
    warning: {
      light: tokens['token-warningcolor-lightest'],
      main: tokens['token-warningcolor-medium'],
      dark: tokens['token-warningcolor-darkest'],
    },
    info: {
      light: tokens['token-infocolor-lightest'],
      main: tokens['token-infocolor-medium'],
      dark: tokens['token-infocolor-darkest'],
    },
    success: {
      light: tokens['token-successcolor-lightest'],
      main: tokens['token-successcolor-medium'],
      dark: tokens['token-successcolor-darkest'],
    },
    grey: {
      100: tokens['token-neutralcolor-light-100'],
      200: tokens['token-neutralcolor-light-200'],
      300: tokens['token-neutralcolor-light-300'],
      400: tokens['token-neutralcolor-light-400'],
      500: tokens['token-neutralcolor-light-500'],
      600: tokens['token-neutralcolor-light-600'],
      700: tokens['token-neutralcolor-dark-100'],
      800: tokens['token-neutralcolor-dark-200'],
      900: tokens['token-neutralcolor-dark-300'],
      A100: tokens['token-neutralcolor-dark-400'],
      A200: tokens['token-neutralcolor-dark-500'],
      A400: tokens['token-neutralcolor-dark-600'],
      A700: tokens['token-neutralcolor-dark-600'],
    },
  },
  typography: {
    fontFamily: tokens['token-font-family-base'],
    h1: {
      fontSize: tokens['token-font-size-xxl'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-bold']),
    },
    h2: {
      fontSize: tokens['token-font-size-xl'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-bold']),
    },
    h3: {
      fontSize: tokens['token-font-size-lg'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-medium']),
    },
    h4: {
      fontSize: tokens['token-font-size-md'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-medium']),
    },
    h5: {
      fontSize: tokens['token-font-size-sm'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-medium']),
    },
    h6: {
      fontSize: tokens['token-font-size-xs'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-medium']),
    },
    body1: {
      fontSize: tokens['token-font-size-xs'],
      lineHeight: tokens['token-line-height-strong'],
      fontWeight: Number(tokens['token-font-weight-light']),
    },
    body2: {
      fontSize: tokens['token-font-size-xxs'],
      lineHeight: tokens['token-line-height-strong'],
      fontWeight: Number(tokens['token-font-weight-light']),
    },
    button: {
      fontSize: tokens['token-font-size-xxs'],
      lineHeight: tokens['token-line-height-slim'],
      fontWeight: Number(tokens['token-font-weight-medium']),
      paddingTop: '8px',
      paddingBottom: '8px',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    caption: {
      fontSize: tokens['token-font-size-xxxs'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-regular']),
    },
    overline: {
      fontSize: tokens['token-font-size-xs'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-regular']),
    },
    subtitle1: {
      fontSize: tokens['token-font-size-sm'],
      lineHeight: tokens['token-line-height-medium'],
      fontWeight: Number(tokens['token-font-weight-light']),
    },
  },
  overrides: {
    MuiLink: {
      root: {
        fontSize: tokens['token-font-size-xxs'],
        lineHeight: tokens['token-line-height-slim'],
        fontWeight: Number(tokens['token-font-weight-regular']),
      },
    },
    MuiButton: {
      root: {
        borderRadius: '8px',
      },
      containedSecondary: {
        color: tokens['token-brandcolor-primary-medium'],
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 64px',

        '& .MuiButton-fullWidth': {
          padding: '20px 0',
        },
      },
    },
  },
});

interface Props {
  children: React.ReactNode;
}

const Tema: React.FC<Props> = (props) => {
  const { children } = { ...props };
  return (
    <MuiThemeProvider theme={estilo}>
      {children}
    </MuiThemeProvider>
  );
};

export default Tema;
