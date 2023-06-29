import { StatusBar } from 'react-native';
import React from 'react';
import { Home } from './app/screens/Home';

const App = () => (
  <>
    <StatusBar
      barStyle='light-content'
      backgroundColor='transparent'
      translucent
    />
    <Home />
  </>
);

export default App;
