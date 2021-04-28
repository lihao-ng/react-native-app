import React from 'react';
import { Layout, Text, CheckBox } from '@ui-kitten/components';
import { Flex, Spacing } from '../../styles';
import StyleSheet from 'react-native-media-query';
import _ from 'lodash';

const AddOnCheckBox = ( props ) => {
  return (
    <CheckBox
      checked={ props.selected }
      onChange={ nextChecked => props.onChange(props.addOnIndex, props.index, nextChecked) }>
      {
        evaProps => 
        <Layout level="3" style={ styles.choiceContainer } >
          <Text category="p1" >{ props.choice.name }</Text>
          <Text category="p1" >+ RM { props.choice.price.toFixed(2) }</Text>
        </Layout>
      }
    </CheckBox>
  ); 
};

const {ids, styles} = StyleSheet.create({
  choiceContainer: {
    ...Flex.flex,
    ...Flex.row,
    ...Flex.justifyBetween,
    ...Spacing.ml_3,
    ...Spacing.pb_1,
    ...Spacing.py_3
  }
});

export default AddOnCheckBox;