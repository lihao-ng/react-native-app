
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { Platform } from 'react-native';
import { isWeb } from '../theme/Platform';

import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WebStackNavigator } from './stack/WebStackNavigator';
import { ParentStackNavigator } from './stack/ParentStackNavigator';

import { useSetRecoilState } from 'recoil';
import { tokenAtom } from '../recoils/token';

const Navigator = () => {
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const setToken = useSetRecoilState(tokenAtom);

  const linking = {
    prefixes: ['http://localhost:19006', 'localhost:19006://'],
    enabled: true,
  }

  const loadToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('@access_token');
      
      setToken(accessToken);

      return accessToken;
    } catch(e) {
      console.log('err', e);
      return e;
    }
  }

  if(!tokenLoaded) {
    return <AppLoading startAsync={loadToken} onFinish={() => setTokenLoaded(true)} onError={ () => setTokenLoaded(false)} />
  }

  return (
    <NavigationContainer
      linking={Platform.select({
        web: linking
      })}>
      { 
        isWeb()
        ? <WebStackNavigator />
        : <ParentStackNavigator /> 
      }
    </NavigationContainer>
  );
}

export default Navigator;