import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import Login from '../auth/LoginScreen';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import lightTheme from '../../theme/Colors';
import { mapping } from '../../theme/Mapping';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Navigator from '../../navigations/Navigator';

import { RecoilRoot } from 'recoil';

const App = () => {
  const loadFonts = () => {
    return Font.loadAsync({
      'Lato-Regular': require('./../../../assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./../../../assets/fonts/Lato-Bold.ttf'),
      'Lato-Italic': require('./../../../assets/fonts/Lato-Italic.ttf')
    })
  }

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(!fontsLoaded) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoaded(true)} onError={ () => setFontsLoaded(false)} />
  }

  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <IconRegistry icons={ EvaIconsPack } />

        <ApplicationProvider { ...eva } customMapping={ mapping } theme={{ ...eva.light, ...lightTheme }}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <Navigator></Navigator>
          </SafeAreaView>
        </ApplicationProvider>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}

export { App };