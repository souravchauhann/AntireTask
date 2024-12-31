// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Home from './src/screens/home';

// // create a component
// const App = () => {
//   return (
//     <View style={styles.container}>
//   <Home/>
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
 
//   },
// });

// //make this component available to the app
// export default App;

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ProductList from './src/screens/home';


const App = () => (
  <Provider store={store}>
    <ProductList />
  </Provider>
);

export default App;
