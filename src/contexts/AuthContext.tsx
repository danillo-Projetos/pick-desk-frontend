import React, {
  createContext, ReactNode, useState, useEffect,
} from 'react';
import { AccountInfo, AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_CONFIG } from '../configurations/azure/azureAuthenticationConfig';

interface Props {
  children: ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (signInType: string, setUser: any) => void
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  let account: AccountInfo | undefined;
  const isAuthenticated = !!(MSAL_CONFIG && MSAL_CONFIG.auth && MSAL_CONFIG.auth.clientId);

  const myMSALObj = new PublicClientApplication(MSAL_CONFIG);
  const loginRequest = {
    scopes: [],
    prompt: 'select_account',
  };

  const loginRedirectRequest = {
    ...loginRequest,
    redirectStartPage: window.location.host,
  };

  const getAccount = (): AccountInfo | undefined => {
    console.log('loadAuthModule');
    const currentAccounts = myMSALObj.getAllAccounts();

    if (currentAccounts.length >= 1) {
      return currentAccounts[0];
    }

    console.log('No accounts detected');
    return undefined;
  };

  const handleResponse = (response: AuthenticationResult, incomingFunction: any) => {
    if (response !== null && response.account !== null) {
      account = response.account;
    } else {
      account = getAccount();
    }

    if (account) {
      incomingFunction(account);
    }
  };

  async function signIn(signInType: string, setUser: any) {
    if (signInType === 'loginPopup') {
      myMSALObj.loginPopup(loginRequest)
        .then((resp: AuthenticationResult) => {
          handleResponse(resp, setUser);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (signInType === 'loginRedirect') {
      myMSALObj.loginRedirect(loginRedirectRequest);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
