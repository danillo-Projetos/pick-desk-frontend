import React, { useState } from 'react';
import { AccountInfo } from '@azure/msal-browser';
import { Button } from '@material-ui/core';
import AzureAuthenticationContext from '../../configurations/azure/azureAuthenticationContext';
import classes from './ButtonLogin.module.scss';

interface Props {
  label?: string,
  className?: string
}

// Log In, Log Out button
export default function ButtonMicrosoftLogin(props: Props) {
  const { onAuthenticated, label, className } = props;

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  const msie11 = ua.indexOf('Trident/');
  const isIE = msie > 0 || msie11 > 0;

  // Azure client context
  const authenticationContext = new AzureAuthenticationContext();

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AccountInfo>();

  const logIn = (method: string) => {
    const typeName = 'loginPopup';
    const logInType = isIE ? 'loginRedirect' : typeName;

    // Azure Login
    authenticationContext.login(logInType, returnedAccountInfo);
  };
  // const logOut = () => {
  //   if (user) {
  //     onAuthenticated(undefined);
  //     // Azure Logout
  //     authenticationContext.logout(user);
  //   }
  // };

  const returnedAccountInfo = (user: AccountInfo) => {
    if (user) {
      setAuthenticated(!!user.name);
      setUser(user);
    }
  };

  return (
    <>
      {authenticationContext.isAuthenticationConfigured ? (
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={className}
          onClick={() => logIn('loginPopup')}
        >
          {label}
        </Button>
      ) : (
        <div>Authentication Client ID is not configured.</div>
      )}
    </>
  );
}

ButtonMicrosoftLogin.defaultProps = {
  label: 'SignIn',
  className: '',
};
