import React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Layout, Avatar, Drawer, DrawerItem, Text, IndexPath } from '@ui-kitten/components';
import { LOGOUT } from '../../navigations/Routes';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSetRecoilState } from 'recoil';
import { tokenAtom } from '../../recoils/token';

function DrawerContent({ navigation, state }) {
  const setToken = useSetRecoilState(tokenAtom);

  const onSelect = async (navigation, state, index) => {
    const route = state.routeNames[index.row];
    
    navigation.navigate(route);
  }

  return (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => onSelect(navigation, state, index)}> 
        <DrawerItem title='Home' />
        {/* <DrawerItem title='Details' /> */}
        {/* <TouchableOpacity onPress={ () => {
           AsyncStorage.clear();
           setToken(null);
        } }> */}
          <DrawerItem title={ LOGOUT } onPress={ () => {
           AsyncStorage.clear();
           setToken(null);
        } } />
        {/* </TouchableOpacity> */}
    </Drawer> 
  );

  return (
    <Layout style={{flex:1}}>
      <DrawerContentScrollView {...props}>
          <Layout style={styles.drawerContent}>
              <Layout style={styles.userInfoSection}>
                <Layout style={{flexDirection:'row',marginTop: 15}}>
                    <Avatar 
                        source={{
                            uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                        }}
                        size={50}
                    />
                    <Layout style={{marginLeft:15, flexDirection:'column'}}>
                        <Text style={styles.title}>John Doe</Text>
                        <Text style={styles.caption}>@j_doe</Text>
                    </Layout>
                </Layout>

                <Layout style={styles.row}>
                  <Layout style={styles.section}>
                      <Text style={[styles.paragraph, styles.caption]}>80</Text>
                      <Text style={styles.caption}>Following</Text>
                  </Layout>
                  <Layout style={styles.section}>
                      <Text style={[styles.paragraph, styles.caption]}>100</Text>
                      <Text style={styles.caption}>Followers</Text>
                  </Layout>
                </Layout>
              </Layout>

              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="home-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Home"
                    onPress={() => {props.navigation.navigate('Home')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="account-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Profile"
                    onPress={() => {props.navigation.navigate('Profile')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="bookmark-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Bookmarks"
                    onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="settings-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Settings"
                    onPress={() => {props.navigation.navigate('SettingsScreen')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="account-check-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Support"
                    onPress={() => {props.navigation.navigate('SupportScreen')}}
                />
              </Drawer.Section>
              {/* <Drawer.Section title="Preferences"> */}
                  {/* <TouchableRipple onPress={() => {toggleTheme()}}>
                      <Layout style={styles.preference}>
                          <Text>Dark Theme</Text>
                          <Layout pointerEvents="none">
                              <Switch value={paperTheme.dark}/>
                          </Layout>
                      </Layout>
                  </TouchableRipple> */}
              {/* </Drawer.Section> */}
          </Layout>
      </DrawerContentScrollView>
      
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem 
            icon={({color, size}) => (
                <Icon 
                name="exit-to-app" 
                color={color}
                size={size}
                />
            )}
            label="Sign Out"
            onPress={() => {signOut()}}
          />
      </Drawer.Section>
    </Layout>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;