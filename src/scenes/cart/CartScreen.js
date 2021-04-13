import React from 'react';
import { Image } from 'react-native';
import { Layout, Button, Text, Divider } from '@ui-kitten/components';
import update from 'immutability-helper';

import StyleSheet from 'react-native-media-query';
import ScrollLayout from '../../components/layouts/ScrollLayout';

import { useRecoilState } from 'recoil';
import { cartAtom } from '../../recoils/cart';
import GenericCard from '../../components/cards/GenericCard';
import { useEffect } from 'react/cjs/react.development';
import { Flex, Spacing, Width } from '../../styles';
import { delete_icon, thumb_icon, spicy_icon, vegetarian_icon } from '../../../assets/icons/custom';
import { item_img } from '../../../assets/images';

const DATA = {
  "items": [
    {
      "addOns": [
        {
          "choices": [
            {
              "id": 7,
              "name": "Signature Chicken Wing",
              "price": 9.6,
              "selected": null,
            },
            {
              "id": 8,
              "name": "Vegetable",
              "price": 9.1,
              "selected": null,
            },
            {
              "id": 9,
              "name": "Signature Pork Chop",
              "price": 13,
              "selected": null,
            },
          ],
          "id": 3,
          "limit": 1,
          "name": "Extras",
          "required": 1,
          "selected": 0,
        },
        {
          "choices": [
            {
              "id": 7,
              "name": "Curry Sauce",
              "price": 5,
              "selected": false,
            },
            {
              "id": 8,
              "name": "Saucyy",
              "price": 5.1,
              "selected": true,
            },
            {
              "id": 9,
              "name": "Yes Sauce",
              "price": 7,
              "selected": true,
            },
          ],
          "id": 3,
          "limit": 2,
          "name": "Black Sheep",
          "required": 0,
          "selected": 0,
        },
      ],
      "description": "bla bla black sheep",
      "id": "1",
      "note": "",
      "price": 32,
      "quantity": 1,
      "spicy": true,
      "thumb": true,
      "title": "MB01. Super Combo 1",
      "totalPrice": 51.00,
      "vegetarian": true,
    },
  ],
  "user_id": 1,
}

const CartScreen = (props) => {
  const [cart, setCartAtom] = useRecoilState(cartAtom);

  useEffect(() => {
    console.log('cart', cart);
  }, [cart]);

  const onMinusQuantity = (quantity, index) => {
    setCartAtom((prevState) => {
      console.log('minus', prevState);
      if(prevState.quantity <= 1) {
        return prevState;
      }

      return update(prevState, {
        items: {
          [index]: {
            $apply: function(item) {
              return {
                ...item,
                quantity: quantity
              }
            }
          }
        } 
      });
    });
  };

  const onAddQuantity = (quantity, index) => {
    setCartAtom((prevState) => {
      console.log('add', prevState);
      
      return update(prevState, {
        items: {
          [index]: {
            $apply: function(item) {
              return {
                ...item,
                quantity: quantity
              }
            } 
          }
        }
      })
    });
  };

  return (
    <ScrollLayout>
      <Layout style={ styles.container }>  
        <Text category="h1" style={ [Spacing.mt_4, Spacing.mb_3] }>Order Summary</Text>
        
        <Divider />

        {
          cart.items.map((item, index) => {
            return (
              <GenericCard style={ styles.card } key={ index }>
                <Image style={ styles.delete } resizeMode="cover" source={ delete_icon } defaultSource={ delete_icon } /> 
                <Image style={ styles.image } resizeMode="cover" source={ item_img } defaultSource={ item_img } /> 
              
                <Layout level="3" style={ styles.contentContainer }>
                  <Layout level="3" style={ styles.iconsContainer }>
                    <Image style={ styles.icon } resizeMode="contain" source={ thumb_icon } defaultSource={ thumb_icon } /> 
                    <Image style={ styles.icon } resizeMode="contain" source={ spicy_icon } defaultSource={ spicy_icon } /> 
                    <Image style={ styles.icon } resizeMode="contain" source={ vegetarian_icon } defaultSource={ vegetarian_icon } /> 
                  </Layout>

                  <Layout level="3" style={ styles.title }>
                    <Text category="s1">{ item.title }</Text>
                    <Text category="s1">RM { item.totalPrice.toFixed(2) }</Text>
                  </Layout>

                  <Layout level="3" style={ styles.descContainer }>
                    <Layout level="3">
                      {
                        item.addOns.map((addOn, index) => {
                          if(addOn.required == 1) {
                            return <Text category="p1" key={ index }>{ addOn.choices[addOn.selected].name }</Text>
                          } else {
                            return addOn.choices.map((choice, index) => {
                              if(choice.selected == true) {
                                return <Text category="p1" key={ index }>{ choice.name }</Text>
                              }
                            })
                          }
                        })
                      }
                    </Layout>

                    <Layout level="3" style={ styles.amountContainer }>
                      <Button size="tiny" style={ styles.quantityBtn } onPress={() => onMinusQuantity(item.quantity - 1, index)}>
                        <Text category="s1" status="control" >-</Text>
                      </Button>

                      <Layout level="3">
                        <Text category="s1" style={ [Spacing.mx_4, Spacing.mt_2] }>{ item.quantity }</Text>
                      </Layout>
                      
                      <Button size="tiny" style={ styles.quantityBtn } onPress={() => onAddQuantity(item.quantity + 1, index)}>
                        <Text category="s1" status="control" >+</Text>  
                      </Button>  
                    </Layout>  
                  </Layout>
                </Layout>                
              </GenericCard>          
            );
          })
        }
        <Button status="danger" onPress={ () => props.navigation.navigate("payment-method") }>PAYMENT METHOD</Button>
      </Layout>
    </ScrollLayout>  
  );
}


const {ids, styles} = StyleSheet.create({
  container: {
    ...Width.w_100,
    ...Spacing.px_4
  },
  card: {
    ...Spacing.mt_3,
    ...Spacing.px_3,
    ...Spacing.py_4,
    ...Flex.row
  },
  delete: {
    height: 25,
    width: 25,
  },
  image: {
    height: 60,
    width: 60,
    ...Spacing.mx_3
  },
  contentContainer: {
    ...Flex.flex
  },  
  iconsContainer: {
    ...Flex.row
  }, 
  icon: {
    width: 15,
    height: 15,
  },
  title: {
    ...Flex.row,
    ...Flex.justifyBetween,
    ...Flex.flex,
    ...Flex.wrap,
    ...Spacing.my_2
  },
  descContainer: {
    ...Flex.row,
    ...Flex.justifyBetween,
    ...Flex.itemsStart
  },
  amountContainer: {
    ...Flex.row,
    ...Flex.justifyCenter,
    ...Spacing.pt_2
  },
  quantityBtn: {
    height: 30,
    width: 30
  },
  amountInput: {
    width: 40
  },
});

export default CartScreen;