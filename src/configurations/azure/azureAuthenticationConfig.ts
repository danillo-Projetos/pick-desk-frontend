/* eslint-disable default-case */
/* eslint-disable no-console */
import { Configuration, LogLevel } from '@azure/msal-browser';

const azureClientID = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
console.log('clientId', azureClientID);
export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: azureClientID || '',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        console.log('containsPii', containsPii);
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
        }
      },
    },
  },
};
