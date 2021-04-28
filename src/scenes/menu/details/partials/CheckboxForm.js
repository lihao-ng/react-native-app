import React from 'react';
import { Layout, Text, CheckBox } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import StyleSheet from 'react-native-media-query';
import { Flex, Spacing } from '../../../../styles';

import { useRecoilCallback, useRecoilState } from 'recoil';
import { allChoiceSelector, choiceSelector } from '../../../../recoils/product/Selector';

const CheckboxForm = ( props ) => {
  const [choice, setChoice] = useRecoilState(choiceSelector(props.choice));

  const updateChoice = useRecoilCallback(({snapshot, set}) => async (nextChecked) => {
    const choices = await snapshot.getPromise(allChoiceSelector(props.addOn.choices));
    
    const selected = choices.filter((choice) => {
      return choice.selected == true
    });
    
    if(nextChecked == true && selected.length >= props.addOn.limit) {
      return;
    }

    setChoice((currentState) => { 
      return {...currentState, selected: nextChecked}  
    })
  });

  return (
    <CheckBox
      checked={ choice.selected }
      onChange={ nextChecked => updateChoice(nextChecked) }>
      {
        evaProps => 
        <Layout level="3" style={ styles.choiceContainer } >
          <Text category="p1" >{ choice.name }</Text>
          <Text category="p1" >+ RM { choice.price.toFixed(2) }</Text>
        </Layout>
      }
    </CheckBox>
  );
}

CheckboxForm.propTypes = {
  addOn: PropTypes.object.isRequired,
  choice: PropTypes.number.isRequired
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

export default CheckboxForm;