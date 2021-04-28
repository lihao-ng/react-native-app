import React, { useEffect } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';

import { Flex, Spacing } from '../../../../styles';
import StyleSheet from 'react-native-media-query';

import { useRecoilState, useRecoilValue } from 'recoil';
import { productState, amountButtonState } from '../../../../recoils/product/Atom';

const AmountButton = ( props ) => {
  const product = useRecoilValue(productState);
  const [amountButton, setAmountButton] = useRecoilState(amountButtonState); 

  const updateAmountButton = (quantity) => {
    if(quantity == 0) {
      return;
    }

    setAmountButton(quantity);
  }

  return (
    <Layout style={ styles.title }>
      <Text category="p1" style={ Spacing.my_2 }>{ product.description }</Text>

      <Layout style={ styles.amountContainer }>
        <Button size="tiny" style={ styles.quantityBtn } onPress={() => updateAmountButton(amountButton - 1)}>
          <Text category="s1" status="control" >-</Text>
        </Button>
    
        <Layout>
          <Text category="s1" style={ [Spacing.mx_4, Spacing.mt_2] }>{ amountButton }</Text>
        </Layout>
        
        <Button size="tiny" style={ styles.quantityBtn } onPress={() => updateAmountButton(amountButton + 1)}>
          <Text category="s1" status="control" >+</Text>  
        </Button>  
      </Layout>  
    </Layout>
  );
}

const {ids, styles} = StyleSheet.create({
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
  }
});

export default AmountButton;