import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, BookDetails} from '../pages';

export type RootStackParamList = {
  Home: undefined;
  BookDetails: {bookId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackAuthRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
    </Stack.Navigator>
  );
};
