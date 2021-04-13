import React, { useLayoutEffect } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Header from '../../components/headers/Header';
import WebHeader from '../../components/headers/WebHeader';

import * as Routes from '../Routes';
import * as Components from '../../scenes/index';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();
const someData = 12;
const unhiddenTabRoutes = [undefined, Routes.HOME];

const MenuStackNavigator = ({ navigation, route }) => {
  useLayoutEffect(() => {
    if(unhiddenTabRoutes.includes(getFocusedRouteNameFromRoute(route))){
      navigation.setOptions({tabBarVisible: true});
    }else {
      navigation.setOptions({tabBarVisible: false});
    }
  }, [navigation, route]);

  return (
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
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        header: ({ scene, previous, navigation }) => <Header scene={ scene } navigation={ navigation } />
      }}
      > 
      <Stack.Screen name={ Routes.HOME } component={ Components.HomeScreen } />
      <Stack.Screen name={ Routes.MENU } initialParams={{ itemId: 100 }} >
        { props => <Components.MenuScreen {...props} extraData={someData} /> }
      </Stack.Screen>
      <Stack.Screen name={ Routes.DETAILS } component={ Components.DetailsScreen } />
    </Stack.Navigator>
  );
}

export { MenuStackNavigator };