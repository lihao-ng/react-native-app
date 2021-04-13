import React from 'react';
import { View, Image, Animated } from 'react-native';
// import { Layout, TopNavigation, TopNavigationAction, Divider, useTheme,Text } from '@ui-kitten/components';

import { BackIcon, MenuIcon, CartIcon } from '../../../assets/icons/default/icons';
import { main_logo } from '../../../assets/images/index';
import { useNavigation, useNavigationState } from '@react-navigation/native';
// import { Generic } from '../../../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import { Icon, Menu, MenuGroup, MenuItem, TopNavigation } from '@ui-kitten/components';
import { useMediaQuery } from 'react-responsive';
import { CART, HOME } from '../../navigations/Routes';

const WebHeader = ({ scene, navigation }) => {
  const routesLength = useNavigationState(state => state.routes.length);
  // const navigation = useNavigation();

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const isDesktop = useMediaQuery({minWidth: 992});

  const progress = Animated.add(scene.progress.current, scene.progress.next || 0);

  const renderTitle = () => (
    <Image style={{ height: 50, width: 90 }} resizeMethod="scale" resizeMode="cover" source={main_logo} defaultSource={main_logo} /> 
  );

  const renderItems = () => (
    <>
      <MenuItem title='UI Kitten' />
      <MenuItem title='Kitten Tricks' />
    </>
  );

  return (
    // isDesktop 
    // ?
    //   <Menu
    //     selectedIndex={selectedIndex}
    //     onSelect={index => setSelectedIndex(index)}
    //     style={ Generic.box_shadow }
    //     <>
    //       <MenuItem title='UI Kitten' />
    //       <MenuItem title='Kitten Tricks' />
    //     </> 
    //   </Menu>
    // :
      <Menu
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        // style={ Generic.box_shadow }
        >
        <MenuGroup accessoryLeft={ renderTitle } accessoryRight={ MenuIcon }>
          <MenuItem title='Home' onPress={ () => navigation.navigate(HOME) } />
          <MenuItem title='Cart' onPress={ () => navigation.navigate(CART) } />
        </MenuGroup>
      </Menu>
  );
};

export default WebHeader;