
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import Feeds from '../screens/Feeds';
import Videos from '../screens/videos';
import CardSwap from '../screens/CardSwap';
import About from '../screens/about';
import Note from '../screens/note';



const Stack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();

const MyStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Feeds" component={Feeds} options={{ headerShown: false }}/>
    <Stack.Screen name="Videos" component={Videos} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: 'black' },
      headerShown: false,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Feeds" component={MyStack} />
    <Tab.Screen name="Videos" component={Videos} />
    <Tab.Screen name="CardSwap" component={CardSwap} />
    <Tab.Screen name="About" component={About} />
    <Tab.Screen name="Note" component={Note} />
  </Tab.Navigator>
);

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='black' barStyle="light-content" />
      <MyTabs />
    </NavigationContainer>
  );
};

export default RootNavigation;