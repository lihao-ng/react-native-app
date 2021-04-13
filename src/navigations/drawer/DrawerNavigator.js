import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import * as Routes from '../Routes';
import DrawerContent from "../../components/drawers/DrawerContent";
import BottomTabNavigator from "../tab/TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerPosition="right" drawerContent={ props => <DrawerContent {...props} /> } openByDefault={ false }>
      <Drawer.Screen name={ Routes.HOME } component={ BottomTabNavigator } options={{ drawerLabel: 'Home' }} />
      {/* <Drawer.Screen name={ Routes.CART } component={ CartStackNavigator } /> */}
    </Drawer.Navigator>
  );
}

export { DrawerNavigator };