import React, { useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import StyleSheet from 'react-native-media-query';
import { Flex, Width, Spacing, Generic } from '../../../../styles';
import { desktopBreakpoint, tabletBreakpoint } from '../../../../theme/Breakpoints';

import GenericCard from '../../../../components/cards/GenericCard';
import Subtitle from '../../../../components/typography/Subtitle';
import RadioForm from './RadioForm';
import CheckboxForm from './CheckboxForm';

import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { addOnIds, choiceIds, productState } from '../../../../recoils/product/Atom';
import { addOnSelector, choiceSelector } from '../../../../recoils/product/Selector';

const AddOnCard = ( props ) => {
  const product = useRecoilValue(productState);
  const setAddOnIdsState = useSetRecoilState(addOnIds);
  const [addOn, setAddOn] = useRecoilState(addOnSelector(props.addOn.id));
  
  useEffect(() => {
    const addOnValue = props.addOn;

    addOnValue.choices.forEach((id) => {
      createChoice(product.entities.choices[id]);
    });

    setAddOnIdsState((currentState) => [...currentState, addOnValue.id]);
    setAddOn({...addOnValue, selected: 0});
  }, []);

  const createChoice = useRecoilCallback(({snapshot, set}) => async (choice) => {
    set(choiceIds, (currentState) => [...currentState, choice.id]);
    set(choiceSelector(choice.id), choice);
  });

  const getSideText = (addOn) => {
    let text = "";

    text += addOn.required == 1 ? "Required" : "Optional"; 
    text += addOn.limit == 1 ? ", Pick 1" : `, Max: ${addOn.limit}`;

    return text;
  }
 
  return (
    addOn.id == null 
    ?
    <Text>Loading...</Text>
    :
    <GenericCard style={ styles.card } dataSet={{ media: ids.card }}>
      <Subtitle
        text={ addOn.name }
        style={{ backgroundColor: "white" }}
        sideText={ getSideText(addOn) }
        sideCategory="s2"
        sideStatus="info"
      />
      
      {
        addOn.required == 1
        ? 
          <RadioForm 
            addOn={ addOn }
            setAddOn={ setAddOn }
          />
        :
          <Layout>
            { 
              addOn.choices.map((choice, index) => {
                return (
                  <CheckboxForm
                    addOn={ addOn }
                    choice={ choice }
                    key={ index }
                  />
                );
              })
            }
          </Layout>
      }
    </GenericCard>
  );
}

AddOnCard.propTypes = {
  addOn: PropTypes.object.isRequired,
  keyValue: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
}

const {ids, styles} = StyleSheet.create({
  container: {
    ...Width.w_100
  },
  image: {
    ...Width.w_100,
    height: 250
  },
  iconsContainer: {
    ...Flex.row
  }, 
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    ...Spacing.my_3,
    ...Flex.row,
    ...Flex.justifyBetween
  },
  amountContainer: {
    ...Flex.row,
    ...Flex.justifyCenter
  },
  quantityBtn: {
    height: 30,
    width: 30
  },
  amountInput: {
    width: 40
  },
  addOnContainer: {
    ...Flex.row,
    flexWrap: "wrap",
    ...Flex.justifyBetween,
  },
  card: {
    ...Spacing.p_3, 
    ...Spacing.my_3,
    ...Width.w_100,
    [desktopBreakpoint]: {
      width: "49%",
    },
    [tabletBreakpoint]: {
      width: "49%",
    }
  },
  choiceContainer: {
    ...Flex.flex,
    ...Flex.row,
    ...Flex.justifyBetween,
    ...Spacing.ml_3,
    ...Spacing.pb_1,
    ...Spacing.py_3
  },
  input: {
    ...Generic.box_shadow,
    ...Spacing.mt_3,
    ...Width.w_100
  },
  noteContainer: {
    ...Spacing.p_3, 
    ...Spacing.my_3,
    ...Width.w_100
  }
});

export default AddOnCard;