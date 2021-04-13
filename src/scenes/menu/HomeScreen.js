import React from 'react';
import { StyleService, Layout, Button, Text, useStyleSheet } from '@ui-kitten/components';
import { Desktop, Mobile, Tablet } from '../../theme/Breakpoints';
import { Dimensions } from 'react-native';

const HomeScreen = (props) => {
  const styles = useStyleSheet(themedStyles);
  
  return (
    <Layout style={ styles.container }>
      <Desktop>
        <Text>HIHI DESK</Text>
      </Desktop>

      <Tablet>
        <Text>HIHI TABLED</Text>
      </Tablet>

      <Mobile>
        <Text>HIHI MOBILE</Text>
        <Button onPress={ () => props.navigation.navigate("menu") }>Next Page</Button>
      </Mobile>
    </Layout>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'color-primary-500',
  },
});

export default HomeScreen;