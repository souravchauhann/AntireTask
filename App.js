
import React from 'react';
import RootNavigation from './src/components/navigation';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const App = () => (
  <RootNavigation/>
);

export default App;