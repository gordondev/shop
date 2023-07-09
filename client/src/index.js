import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import UserStore from './store/UserStore';

export const Context = createContext(null);

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <Context.Provider
        value={{
          user: new UserStore(),
        }}
      >
        <App />
      </Context.Provider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
