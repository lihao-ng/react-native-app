import React from 'react';
import { Image } from 'react-native';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { HOME, CART } from '../../navigations/Routes';
import { 
  account_logo, 
  account_active_logo, 
  activity_active_logo, 
  activity_logo, 
  bell_logo, 
  bell_active_logo, 
  home_active_logo, 
  home_logo 
} from '../../../assets/icons/custom/index';
import { Generic } from '../../styles';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const BottomTabBarContent = ({ navigation, descriptors, state }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const insets = useSafeAreaInsets();
  const isActive = (route, state, icon, icon_active) => {
    let currentRoute = state.routeNames[state.index];
  
    if(currentRoute == route) {
      return <Image style={{ height: 30, width: 30 }} resizeMethod="scale" resizeMode="cover" source={icon_active} defaultSource={icon_active} />;
    }

    return <Image style={{ height: 30, width: 30 }} resizeMethod="scale" resizeMode="cover" source={icon} defaultSource={icon} />;
  }
  
  return (
    <BottomNavigation
      // style={{ ...Generic.box_shadow, ...tailwind("py-3"), marginBottom: insets.bottom }}
      style={{ ...Generic.box_shadow }}
      appearance="noIndicator"
      selectedIndex={ state.index }
      onSelect={ index => navigation.navigate(state.routeNames[index]) }>
      <BottomNavigationTab icon={ () => isActive(HOME, state, home_logo, home_active_logo) } title={ HOME }/>
      {/* <BottomNavigationTab icon={ () => isActive("Activity", state, activity_logo, activity_active_logo) } title="My Activity"/> */}
      {/* <BottomNavigationTab icon={ () => isActive("Notification", state, bell_logo, bell_active_logo) } title="Notification"/> */}
      <BottomNavigationTab icon={ () => isActive(CART, state, account_logo, account_active_logo) } title={ CART } />
    </BottomNavigation>
  );
} 

export default BottomTabBarContent;