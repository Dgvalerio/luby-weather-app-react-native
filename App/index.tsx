import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Search from './Screens/Search';
import Weather from './Screens/Weather';
import { RootStackParamList } from './Types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const Index: FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Weather" component={Weather} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Index;
