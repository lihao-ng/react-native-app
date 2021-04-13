import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as Routes from '../Routes';

import BottomTabBarContent from "../../components/tabs/BottomTabBarContent";
import { MenuStackNavigator } from "../stack/MenuStackNavigator";
import { CartStackNavigator } from "../stack/CartStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {  
  return (
    <Tab.Navigator initialRouteName={ Routes.HOME } tabBar={ props => <BottomTabBarContent { ...props } />}>
      <Tab.Screen name={ Routes.HOME } component={ MenuStackNavigator } />
      {/* <Tab.Screen name="activity" component={ MenuStackNavigator } /> */}
      {/* <Tab.Screen name="notification" component={ MenuStackNavigator } /> */}
      <Tab.Screen name={ Routes.CART } component={ CartStackNavigator } />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;