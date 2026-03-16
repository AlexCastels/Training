# Azure MSAL

## Configurazione base

```tsx
  const msalConfig = {
      auth: {
          clientId: 'xxxx-xxxx',      // dall'App Registration Azure
          tenantId: 'xxxx-xxxx',      // il tenant aziendale
          redirectUri: 'http://localhost:5173'
      }
  };
```

## Pattern principali

```tsx
  const { instance, accounts } = useMsal();

  // login
  instance.loginRedirect();

  // logout
  instance.logoutRedirect();

  // utente loggato
  const user = accounts[0];
  console.log(user.name, user.username);

  // token per le chiamate API
  const token = await instance.acquireTokenSilent({ scopes: ['api://xxx'] });
  axios.defaults.headers.Authorization = `Bearer ${token.accessToken}`;
```
