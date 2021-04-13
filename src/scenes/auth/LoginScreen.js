import React, { useState } from 'react';
import { Image } from 'react-native';
import { Layout, Text, CheckBox } from '@ui-kitten/components';
import { desktopBreakpoint, tabletBreakpoint } from '../../theme/Breakpoints';
import { main_logo } from '../../../assets/images';
import { Flex, Spacing, Width } from '../../styles';
import StyleSheet from 'react-native-media-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSetRecoilState } from 'recoil';
import { tokenAtom } from '../../recoils/token';

import { isWeb } from '../../theme/Platform';

import ScrollLayout from '../../components/layouts/ScrollLayout';
import TextInput from '../../components/inputs/TextInput';
import PasswordInput from '../../components/inputs/PasswordInput';
import Subtitle from '../../components/typography/Subtitle';
import GenericButton from '../../components/buttons/GenericButton';
import { HOME } from '../../navigations/Routes';

const LoginScreen = ( props ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const setToken = useSetRecoilState(tokenAtom);

  const onLogin = async () => {
    // Make auth call to server

    try {
      const response = {
        'user_id': 1,
        'token': '1234567'
      };

      await AsyncStorage.setItem('@access_token', JSON.stringify(response));
      
      setToken(response);

      if(isWeb()) {
        props.navigation.navigate(HOME);
      }
    } catch (e) {
      console.log('err', e)
    }
  }
  
  return (
    <ScrollLayout>
      <Layout style={ styles.container } dataSet={{ media: ids.container }}>
        <Image style={ styles.image } resizeMode="contain" source={main_logo} defaultSource={main_logo} /> 
        
        <Text category="h2">Welcome Back</Text>    
        <Text category="p1" style={ [styles.textCenter, Spacing.mt_4] } dataSet={{ media: ids.textCenter }}>
          If you have shopped with us before, please enter your details below. 
          If you are a new customer, please proceed to the registration.
        </Text>  

        <Layout style={ styles.inputContainer } dataSet={{ media: ids.inputContainer }}>
          <Subtitle 
            text="Email"
            sideText="*"
            sideStatus="danger"
          />

          <TextInput
            value={ email }
            placeholder='example@mail.com'
            icon={ "email" }
            onChange={ setEmail }
          />    

          <Subtitle 
            text="Password"
            style={ Spacing.mt_5 }
            sideText="*"
            sideStatus="danger"
          />

          <PasswordInput
            value={ password }
            placeholder='Password'
            showIcon={ true }
            onChange={ setPassword }
          />    

          <Layout style={ styles.checkboxContent }>
            <CheckBox
              checked={ remember }
              onChange={nextChecked => setRemember(nextChecked)}>
              <Text category="p1">Remember me</Text>
            </CheckBox>

            <Text category="p1" status="primary">Forgot password?</Text>
          </Layout>
          
          <GenericButton 
            text="Login"
            onClick={ onLogin }
          />

          <Layout style={ [styles.registerContent] } dataSet={{ media: ids.registerContent }}>
            <Text category="p1">Don't have an account yet?</Text>   
            <Text category="p1" status="primary"> Register here</Text>   
          </Layout>
        </Layout>
      </Layout>  
    </ScrollLayout>
  );
}

const {ids, styles} = StyleSheet.create({
  container: {
    ...Flex.itemsCenter,
    ...Width.w_100,
    ...Spacing.p_5,
    [desktopBreakpoint]: {
      ...Width.w_40
    },
    [tabletBreakpoint]: {
      ...Width.w_60
    }
  },
  image: {
    height: 150,
    ...Width.w_80,
    ...Spacing.mb_5
  },
  textCenter: {
    textAlign: "center"
  },  
  inputContainer: {
    ...Flex.itemsStart,
    ...Flex.justifyStart,
    ...Spacing.mt_5,
    ...Width.w_100
  },
  checkboxContent: { 
    ...Flex.row, 
    ...Width.w_100,
   ...Flex.justifyBetween,
    ...Spacing.mt_3
  },
  registerContent: {
    ...Flex.row,
    ...Width.w_100,
    ...Flex.justifyCenter,
    ...Spacing.mt_5
  }
});

export default LoginScreen;