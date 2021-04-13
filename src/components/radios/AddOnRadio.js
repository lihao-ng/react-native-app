import React from 'react';
import { Layout, Text, RadioGroup, Radio } from '@ui-kitten/components';
import { Flex, Spacing } from '../../styles';
import StyleSheet from 'react-native-media-query';
import _ from 'lodash';

const AddOnRadio = React.memo(props => {
  return (
    <RadioGroup
      selectedIndex={ props.selected }
      onChange={selectedIndex => props.onChange(props.addOnIndex, selectedIndex)}>
        { 
          props.choices.map((choice, index) => {
            return (
              <Radio key={ index }>
                {
                  evaProps =>
                  <Layout level="3" style={ styles.choiceContainer } >
                    <Text category="p1" >{ choice.name }</Text>
                    <Text category="p1" >+ RM { choice.price.toFixed(2) }</Text>
                  </Layout>
                }
              </Radio>
            );
          })
        }
    </RadioGroup> 
  );
}, (oldProps, newProps) => {
  return _.isEqual(
    _.omit(oldProps, ['onChange']), 
    _.omit(newProps, ['onChange'])
  );
});

const {ids, styles} = StyleSheet.create({
  choiceContainer: {
    ...Flex.flex,
    ...Flex.row,
    ...Flex.justifyBetween,
    ...Spacing.ml_3,
    ...Spacing.pb_1
  }
});

export default AddOnRadio;