import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { UserProvider } from './components/UserContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  
  
  <Auth0Provider
    domain="pinal9.us.auth0.com"
    clientId="LLhCT9KMHoFBuNV2SBqHOdKVQT4xWKeC"
    redirectUri={window.location.origin}
    >
    <UserProvider>
    <App />
    </UserProvider>
    </Auth0Provider>
  

  // </React.StrictMode>
);


