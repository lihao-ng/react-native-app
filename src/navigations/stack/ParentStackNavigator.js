import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import * as Routes from '../Routes';
import { DrawerNavigator } from '../drawer/DrawerNavigator';
import { AuthStackNavigator } from './AuthStackNavigator';

import { useRecoilValue } from 'recoil';
import { tokenAtom } from '../../recoils/token';

const Stack = createStackNavigator();

const ParentStackNavigator = ({ navigation, route }) => {
  const token = useRecoilValue(tokenAtom);

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
       }}
      > 
      {
        token == null
        ? <Stack.Screen name={ Routes.LOGIN } component={ AuthStackNavigator } />
        : <Stack.Screen name={ Routes.HOME } component={ DrawerNavigator } />
      }
    </Stack.Navigator>
  );
}

export { ParentStackNavigator };