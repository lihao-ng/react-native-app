import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import WebHeader from '../../components/headers/WebHeader';

import * as Routes from '../Routes';
import * as Components from '../../scenes/index';
import RecoilScreen from '../../scenes/menu/RecoilScreen';

const Stack = createStackNavigator();

const WebStackNavigator = () => {
  return(
    <Stack.Navigator 
      initialRouteName={ Routes.HOME }
      headerStyle={{ height:80 }}
      headerMode="float"
      headerStyle={{
        height: 80
      }}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerMode: "float",
        header: ({ scene, previous, navigation }) => <WebHeader scene={ scene } navigation={ navigation } />
      }}
      > 
      <Stack.Screen name={ Routes.LOGIN } component={ Components.LoginScreen } />
      <Stack.Screen name={ Routes.HOME } component={ Components.HomeScreen } />
      <Stack.Screen name={ Routes.MENU } component={ Components.MenuScreen } />
      {/* <Stack.Screen name={ Routes.MENU } initialParams={{ itemId: 100 }}> */}
        {/* { props => <Components.MenuScreen {...props} /> }
      </Stack.Screen> */}
      <Stack.Screen name={ Routes.DETAILS } component={ Components.DetailsScreen } />
      <Stack.Screen name={ Routes.CART } component={ Components.CartScreen } />
    </Stack.Navigator>
  );
}

export { WebStackNavigator };