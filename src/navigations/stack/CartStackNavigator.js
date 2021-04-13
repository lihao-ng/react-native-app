import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Header from '../../components/headers/Header';
import * as Routes from '../Routes';
import * as Components from '../../scenes/index';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();
const unhiddenTabRoutes = [undefined, Routes.CART];

const CartStackNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    if(unhiddenTabRoutes.includes(getFocusedRouteNameFromRoute(route))){
      navigation.setOptions({tabBarVisible: true});
    }else {
      navigation.setOptions({tabBarVisible: false});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator 
      initialRouteName={ Routes.CART } 
      headerStyle={{ height:80 }}
      headerMode="float"
      headerStyle={{
        height: 80
      }}
      screenOptions={{
        headerMode: "float",
        // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        header: ({ scene, previous, navigation }) => <Header scene={ scene } navigation={ navigation } />
      }}
      >
      <Stack.Screen name={ Routes.CART } component={ Components.CartScreen } />
      <Stack.Screen name={ Routes.PAYMENTMETHOD } component={ Components.PaymentMethodScreen } />
    </Stack.Navigator>
  );
}

export { 
  CartStackNavigator 
};