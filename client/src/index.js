import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  
  
  <Auth0Provider
    domain="pinal9.us.auth0.com"
    clientId="LLhCT9KMHoFBuNV2SBqHOdKVQT4xWKeC"
    redirectUri={window.location.origin}
    >
    <App />
    </Auth0Provider>
  

  // </React.StrictMode>
);


