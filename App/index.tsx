import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Places from './Screens/Places';
import Search from './Screens/Search';
import Weather from './Screens/Weather';
import store from './Store';
import { RootStackParamList } from './Types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const Index: FC = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Places" component={Places} />
        <Stack.Screen name="Weather" component={Weather} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default Index;
