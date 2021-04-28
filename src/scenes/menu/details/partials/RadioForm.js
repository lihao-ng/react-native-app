import React, { useEffect } from 'react';
import { Layout, Text, RadioGroup, Radio } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import StyleSheet from 'react-native-media-query';
import { Flex, Spacing } from '../../../../styles';

import { useRecoilValue } from 'recoil';
import { allChoiceSelector } from "../../../../recoils/product/Selector";

const RadioForm = ( props ) => {
  const choices = useRecoilValue(allChoiceSelector(props.addOn.choices));

  const updateAddOn = (selectedIndex) => {
    return props.setAddOn((currentState) => { 
      return { ...currentState, selected: selectedIndex }
    })
  }

  return (
    <RadioGroup
      selectedIndex={ props.addOn.selected }
      onChange={ selectedIndex => { updateAddOn(selectedIndex) } }>
        { 
          choices.map((choice, index) => {
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
}

RadioForm.propTypes = {
  addOn: PropTypes.object.isRequired,
  setAddOn: PropTypes.func.isRequired
}

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

export default RadioForm;