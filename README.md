# Azure MSAL

- MSAL (Microsoft Authentication Library) è una libreria che permette alla tua app di autenticare utenti tramite Microsoft Identity Platform

Serve per :
- Autentica l'utente — apre il login Microsoft (popup o redirect)
- Ottiene un ID token — contiene info sull'utente (nome, email, ecc.)
- Ottiene un access token — usato per chiamare API protette (es. Microsoft Graph, o la tua API aziendale)
- Gestisce la cache dei token — così l'utente non deve rifare il login ad ogni refresh
- Rinnova i token in scadenza — automaticamente con acquireTokenSilent

## Configurazione base
- Si crea una configurazione e una nuova istanza PCA, da passare al provider di azure

```tsx
  const msalConfig = {
      auth: {
        clientId: 'xxxx-xxxx',           // id dell'app registrata su Azure
        tenantId: 'xxxx-xxxx',           // il tenant aziendale dell'organizzazione
        redirectUri: 'http://dominio',   // redirect verso l'app dopo auth
        navigateToLoginRequestUrl : true // permette ri ritornare all'ultimo URL dopo un redirect di login
      },
      cache: {                           // configurazione extra
        cacheLocation: "localStorage"    // di default è un sessionStorage
      }
  };

  const pca = new PublicClientApplication( msalConfig );

  <MsalProvider instance={pca}>
    <App />
  </MsalProvider>
```

## Componenti

```tsx
  <AuthenticatedTemplate/>      // renderizza i figli solo se loggato , non fa redirect, passivo
  <UnauthenticatedTemplate/>    // renderizza i figli solo se NON loggato , passivo
  <MsalAuthenticationTemplate/> // controlla il login , se assente causa redirect o popup , attivo
```

###  <MsalAuthenticationTemplate/>

E' quel componente che permette di controllare attivamente l'autenticazione di un utente

```tsx
onst authRequest = {
  scopes: ["User.Read", "openid", "profile"]
};

<MsalAuthenticationTemplate
  interactionType={InteractionType.Redirect}   // obbligatorio: Redirect o Popup
  authenticationRequest={authRequest}          // opzionale: scopes e parametri extra
  errorComponent={ErrorComponent}              // opzionale: cosa mostrare in caso di errore
  loadingComponent={LoadingComponent}          // opzionale: cosa mostrare durante il login
>
  <PaginaProtetta />
</MsalAuthenticationTemplate>
```
#### InteractionType (MsalAuthentication)

Ci sono 4 tipi di InteractionType:
- InteractionType.Redirect  —  Redirect completo verso login Microsoft
- InteractionType.Popup	    —  Apre un popup di login
- InteractionType.Silent	  —  Tenta login silenzioso via iframe (senza UI)
- InteractionType.None	    —  Nessuna interazione automatica

Un Redirect fa uscire dall'app, generalmente viene usata ad inizo App, per il resto si usa il popup

# Token 

MSAL salva dopo un login i dati dell'auth in sessionStorage, e da li controlla l'autenticazione nelle sezioni

Salva:
- ID Token              — contiene le info dell'utente (nome, email, ruoli, ecc.)
- Access Token          — usato per chiamare le API protette
- Refresh Token         — usato per rinnovare l'access token quando scade senza fare un nuovo login
- Account info          — i dati dell'account loggato
- Stato della richiesta — usato durante il redirect per sapere dove tornare

tramite acquireToken() di useMsalAuthentication o useMsal è possibile leggere il sessionStorage per il token

o tramite istance.acquireTokenSilent, utile negli interceptor di axios per gestire API che richiedono auth

```tsx
// Esempio con axios
const getAccessToken = async () => {
  const response = await instance.acquireTokenSilent({
    scopes: ["api://mia-api/Read"],
    account: accounts[0]
  });
  return response.accessToken;
};

const fetchDati = async () => {
  const token = await getAccessToken();
  axios.get("/api/dati", {
    headers: { Authorization: `Bearer ${token}` }
  });
};
```

### Gestione dei token

- Access Token  → scade dopo circa 1 ora
- Refresh Token → scade dopo 24 ore (o più, dipende dalla config Azure)

Un token scade, e potrebbe accadere durante la sessione, o tra sessioni diverse, istance.acquireTokenSilent permette di controllare token e refresh token in background per non bloccare la sessione dell'utente e permettere di rimanere loggato

1. Access token valido   → lo restituisce
2. Access token scaduto  → usa il refresh token automaticamente per ottenerne uno nuovo
3. Refresh token scaduto → lancia InteractionRequiredAuthError e slogga l'utente

Questo per evitare che durante l'utilizzo dell'app l'utente veda errori di chiamata o altri bug dovuti alla sessione

## Hook

### useMsalAuthentication

Funziona come il componente, ma in questa maniera permette di personalizzare la logica
Tenta il login automaticamente e gestisce i token.

```tsx
const { login, acquireToken, result, error } = useMsalAuthentication(
  InteractionType.Redirect,
  { scopes: ["User.Read"] }
);

result        // risultato dell'ultimo login/token
error         // eventuale errore
login         // funzione per ritentare il login
acquireToken  // funzione per ottenere un nuovo token
```

### useAccount

Restituisce le info di un account specifico (o l'account attivo se non passi nulla).
Utile per leggere i dati dell'utente loggato (nome, email, ecc.).

```tsx
const accountInfo = useAccount({ localAccountId: "xxx" });
// oppure
const accountInfo = useAccount() ; // account attivo
```

### useMsal

Il più completo — restituisce tre cose:

```tsx
const { instance, accounts, inProgress } = useMsal();

instance    // la PublicClientApplication, per chiamare login/logout/acquireToken
accounts    // array degli account loggati
inProgress  // stato corrente ("login", "logout", "none", ecc.)
```

### useIsAuthenticated

Un utility hook che restituisce solo un booleano, controlla il log di un singolo utente o più utenti se non specificato

```tsx
  const accountIdentifiers = {
      localAccountId: "example-local-account-identifier",
      homeAccountId: "example-home-account-identifier",
      username: "example-username"
  }

  useIsAuthenticated(accountIdentifiers)  // restituisce true/false, utile per conditional rendering
```

## Pattern principali

```tsx
  const { instance, accounts , inProgress } = useMsal();

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
