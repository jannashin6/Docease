import React from 'react';
import Routes from './routes';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;