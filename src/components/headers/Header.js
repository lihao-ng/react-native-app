import React from 'react';
import { View, Image, Animated } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { BackIcon, MenuIcon, CartIcon } from '../../../assets/icons/default/icons';
import { main_logo } from '../../../assets/images/index';
import { useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Generic } from '../../styles';

const Header = ({ scene, navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const routesLength = useNavigationState(state => state.routes.length);

  const progress = Animated.add(scene.progress.current, scene.progress.next || 0);

  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  const renderBackAction = () => (
    <TopNavigationAction icon={ BackIcon } onPress={ () => navigation.goBack() }/>
  );

  const renderMenuAction = () => (
    <Layout style={{ flexDirection:"row", backgroundColor:"transparent" }}>
      <TopNavigationAction icon={ CartIcon } onPress={ () => navigation.toggleDrawer() }/>
      <TopNavigationAction icon={ MenuIcon } onPress={ () => navigation.toggleDrawer() }/>
    </Layout>
  );

  const renderTitle = () => (
    <Image style={{ height: 50, width: 90 }} resizeMethod="scale" resizeMode="cover" source={main_logo} defaultSource={main_logo} /> 
  );
  
  return (
    // <Animated.View style={{ opacity }}>
      <Layout>
        <TopNavigation
          alignment="center"
          // style={{ ...Generic.box_shadow, marginTop: insets.top }}
          style={{ ...Generic.box_shadow }}
          title={ renderTitle }
          accessoryLeft={ routesLength > 1 ? renderBackAction : () => <View /> }
          accessoryRight={ renderMenuAction }
        />
      </Layout>
    // </Animated.View>
  );
};

export default Header;