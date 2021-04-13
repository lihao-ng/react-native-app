import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import * as Routes from '../Routes';
import * as Components from '../../scenes/index';
import { DrawerNavigator } from '../drawer/DrawerNavigator';

const Stack = createStackNavigator();

const AuthStackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator 
      initialRouteName={ Routes.LOGIN }  
      screenOptions={{
        headerShown: false,
        // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
       }}
      > 
      <Stack.Screen name={ Routes.LOGIN } component={ Components.LoginScreen } />
      <Stack.Screen name={ Routes.REGISTER } component={ Components.RegisterScreen } />
    </Stack.Navigator>
  );
}

export { AuthStackNavigator };