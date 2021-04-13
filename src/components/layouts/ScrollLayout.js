import React from 'react';
import { ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Flex, Spacing } from '../../styles';
import StyleSheet from 'react-native-media-query';

const ScrollLayout = ({ children }) => {
  return (
    <Layout style={ styles.layout }>
      <ScrollView contentContainerStyle={ styles.scrollView } dataSet={{ media: ids.scrollView }}>
        { children }
      </ScrollView>
    </Layout>
  );
}

const {ids, styles} = StyleSheet.create({
  layout: {
    ...Flex.flex
  },
  scrollView: {
    flexGrow: 1, 
    alignItems: "center"
  }
});

export default ScrollLayout;