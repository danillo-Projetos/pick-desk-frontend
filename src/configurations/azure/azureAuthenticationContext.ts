import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  EndSessionRequest,
  RedirectRequest,
  PopupRequest,
} from '@azure/msal-browser';
import { MSAL_CONFIG } from './azureAuthenticationConfig';

export class AzureAuthenticationContext {
  private myMSALObj = new PublicClientApplication(
    MSAL_CONFIG,
  );

  private account?: AccountInfo | null;

  private loginRedirectRequest?: RedirectRequest;

  private loginRequest?: PopupRequest;

  public isAuthenticationConfigured = false;

  constructor() {
    this.account = null;
    this.setRequestObjects();
    console.log(this.myMSALObj);
    if (MSAL_CONFIG && MSAL_CONFIG.auth && MSAL_CONFIG.auth.clientId) {
      this.isAuthenticationConfigured = true;
    }
  }

  private setRequestObjects(): void {
    this.loginRequest = {
      scopes: [],
      prompt: 'select_account',
    };
    console.log('page', window.location.host);
    this.loginRedirectRequest = {
      ...this.loginRequest,
      redirectStartPage: `${window.location.host}/login`,
    };
  }

  public login(signInType: string, setUser: any): void {
    if (signInType === 'loginPopup') {
      this.myMSALObj
        .loginPopup(this.loginRequest)
        .then((resp: AuthenticationResult) => {
          this.handleResponse(resp, setUser);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (signInType === 'loginRedirect') {
      this.myMSALObj.loginRedirect(this.loginRedirectRequest);
    }
  }

  public logout(account: AccountInfo): void {
    const logOutRequest: EndSessionRequest = {
      account,
    };

    this.myMSALObj.logout(logOutRequest);
  }

  public handleResponse(response: AuthenticationResult, incomingFunction: any) {
    if (response !== null && response.account !== null) {
      this.account = response.account;
    } else {
      this.account = this.getAccount();
    }

    if (this.account) {
      incomingFunction(this.account);
    }
  }

  // eslint-disable-next-line consistent-return
  private getAccount(): AccountInfo | undefined {
    console.log('loadAuthModule');
    const currentAccounts = this.myMSALObj.getAllAccounts();

    if (currentAccounts === null) {
      console.log('No accounts detected');
      return undefined;
    }

    if (currentAccounts.length > 1) {
      console.log(
        'Multiple accounts detected, need to add choose account code.',
      );
      return currentAccounts[0];
    }

    if (currentAccounts.length === 1) {
      return currentAccounts[0];
    }
  }
}

export default AzureAuthenticationContext;
