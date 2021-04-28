import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import StyleSheet from 'react-native-media-query';
import ScrollLayout from '../../components/layouts/ScrollLayout';
import { Flex, Width, Spacing } from '../../styles';

import { item_img } from '../../../assets/images';
import { spicy_icon, thumb_icon, vegetarian_icon } from '../../../assets/icons/custom/index';

import { useRecoilCallback, useRecoilState } from 'recoil';
import { addOnIds, amountButtonState, choiceIds, productState } from '../../recoils/product/Atom';
import { allAddOnSelector, allChoiceSelector } from '../../recoils/product/Selector';
import { cartAtom } from '../../recoils/cart';

import { productSchema } from '../../schema/Product';

import AmountButton from './details/partials/AmountButton';
import AddOnCard from './details/partials/AddOnCard';
import InstructionCard from './details/partials/InstructionCard';
import SubmitButton from './details/partials/SubmitButton';

import _ from 'lodash';
import { inputSelector } from '../../recoils/input/Selector';

const DETAIL_DATA = {
  id: "1",
  title: "MB01. Super Combo 1",
  description: "bla bla black sheep",
  price: 32.00,
  thumb: true,
  spicy: true,
  vegetarian: true,
  add_ons: [
    {
      id: 2,
      name: "Extras",
      limit: 1,
      required: 1,
      choices: [
        {
          id: 7,
          name: "Signature Chicken Wing",
          price: 9.60
        },
        {
          id: 8,
          name: "Vegetable",
          price: 9.10
        },
        {
          id: 9,
          name: "Signature Pork Chop",
          price: 13.00
        }
      ]
    },
    {
      id: 3,
      name: "Black Sheep",
      limit: 2,
      required: 0,
      choices: [
        {
          id: 10,
          name: "Curry Sauce",
          price: 5.00
        },
        {
          id: 11,
          name: "Saucyy",
          price: 5.10
        },
        {
          id: 12,
          name: "Yes Sauce",
          price: 7.00
        }
      ]
    }
  ]
};

const DetailsScreen = ({ navigation, route }) => {
  const [product, setProduct] = useRecoilState(productState);

  const resetAll = useRecoilCallback(({snapshot, reset }) => async () => {
    const addOnIdsValue = await snapshot.getPromise(addOnIds);
    const choiceIdsValue = await snapshot.getPromise(choiceIds);
    
    reset(productState);
    reset(amountButtonState);
    reset(inputSelector(0));
    
    if(addOnIdsValue.length != 0) {
      reset(allAddOnSelector(addOnIdsValue));
      reset(addOnIds);
    }

    if(choiceIdsValue.length != 0) {
      reset(allChoiceSelector(choiceIdsValue));
      reset(choiceIds);
    }
  });

  const getProduct = async () => {
    await resetAll();

    const normalizedData = productSchema(DETAIL_DATA);
    setProduct(normalizedData);
    console.log(normalizedData)
  }

  useEffect(() => {
    getProduct();
    // Make API call to get the actual data based on route.params.itemId
    // console.log(DETAIL_DATA);

    // const item = new Item(
    //   DETAIL_DATA.id, 
    //   DETAIL_DATA.title, 
    //   DETAIL_DATA.description, 
    //   DETAIL_DATA.price, 
    //   1, 
    //   0.00,
    //   "",
    //   DETAIL_DATA.thumb, 
    //   DETAIL_DATA.spicy, 
    //   DETAIL_DATA.vegetarian, 
    //   DETAIL_DATA.add_ons
    // );
    
    // setItemState(item);
  }, []);

  const render = () => {
    return (
      <ScrollLayout>
        <Layout style={ styles.container }>
          <Image style={ styles.image } resizeMode="cover" source={ item_img } defaultSource={ item_img } /> 

          <Layout style={ Spacing.m_4 }>
            <Layout style={ styles.iconsContainer }>
              <Image style={ styles.icon } resizeMode="contain" source={ thumb_icon } defaultSource={ thumb_icon } /> 
              <Image style={ styles.icon } resizeMode="contain" source={ spicy_icon } defaultSource={ spicy_icon } /> 
              <Image style={ styles.icon } resizeMode="contain" source={ vegetarian_icon } defaultSource={ vegetarian_icon } /> 
            </Layout>

            <Layout style={ styles.title }>
              <Text category="s1">{ product.entities.product[1].title }</Text>
              <Text category="s1">RM { product.entities.product[1].price.toFixed(2) }</Text>
            </Layout>

            <AmountButton />

            <Layout style={ styles.addOnContainer }>
              {
                Object.entries(product.entities.addOns).map(([key, addOn], index) => {
                  return (
                    <AddOnCard
                      addOn={ addOn }
                      keyValue={ parseInt(key) } 
                      index={ index }
                      key={ key }
                    />
                  );
                })
              }
            </Layout>
            
            <InstructionCard />
            <SubmitButton />
          </Layout>
        </Layout>
      </ScrollLayout>
    );
  }

  return (
    _.isEmpty(product)
    ?
      <Text>Loading...</Text>
    :
      render()
  );
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
  }
});

export default DetailsScreen;