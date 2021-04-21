import React, { useState } from 'react';
import { Image } from 'react-native';
import { Layout, Button, Text, Divider, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import update from 'immutability-helper';

import StyleSheet from 'react-native-media-query';
import ScrollLayout from '../../components/layouts/ScrollLayout';

import { useRecoilState } from 'recoil';
import { cartAtom } from '../../recoils/cart';
import GenericCard from '../../components/cards/GenericCard';
import { useEffect } from 'react/cjs/react.development';
import { Flex, Generic, Spacing, Width } from '../../styles';
import { delete_icon, thumb_icon, spicy_icon, vegetarian_icon } from '../../../assets/icons/custom';
import { item_img } from '../../../assets/images';
import TextInput from '../../components/inputs/TextInput';
import GenericButton from '../../components/buttons/GenericButton';
import Subtitle from '../../components/typography/Subtitle';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

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

const selectData = [
  'Delivery',
  'Pick Up'
];

const CartScreen = (props) => {
  const [cart, setCartAtom] = useRecoilState(cartAtom);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const onDeleteItem = (index) => {
    setCartAtom((prevState) => {
      return update(prevState, {
        items: {
          $splice: [[index, 1]]
        }
      })
    });
  }

  const onMinusQuantity = (quantity, index) => {
    setCartAtom((prevState) => {
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
      return update(prevState, {
        items: {
          [index]: {
            $apply: function(item) {
              return {
                ...item,
                quantity: quantity,
                totalPrice: item.totalPrice * quantity
              }
            } 
          }
        }
      })
    });
  };

  const onUpdateCoupon = (nextInput) => {
    setCartAtom((prevState) => {
      return update(prevState, {
        $apply: function(item) {
          return {
            ...item,
            coupon: nextInput
          }
        }
      })
    });
  }

  const onApplyCoupon = () => {
    console.log('Apply coupon');
  }

  const onSelectDelivery = (index) => {
    setSelectedIndex(index);

    setCartAtom((prevState) => {
      return update(prevState, {
        $apply: function(item) {
          return {
            ...item,
            delivery_option: index.row
          }
        }
      })
    });
  }

  const onCheckout = () => {
    console.log('checkout')
  }

  return (
    <Layout style={ Flex.flex }>
      <ScrollView contentContainerStyle={ styles.scrollView } dataSet={{ media: ids.scrollView }}>
        <Layout style={ styles.container }>  
          <Text category="h1" style={ [Spacing.mt_4, Spacing.mb_3] }>Order Summary</Text>
          
          <Divider />
  
          {
            cart.items.map((item, index) => {
              return (
                <GenericCard style={ styles.card } key={ index }>
                  <TouchableWithoutFeedback onPress={ () => onDeleteItem(index) }>
                    <Image style={ styles.delete } resizeMode="cover" source={ delete_icon } defaultSource={ delete_icon } /> 
                  </TouchableWithoutFeedback>
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
  
          <GenericCard style={{ ...styles.card, ...Spacing.mb_4 }}>
            <Layout level="3" style={ Width.w_100 }>
              <Layout level="3" style={ styles.couponContainer }>
                <Text category="s1">Coupon</Text>
                
                <Layout level="3" style={ styles.inputContainer }>
                  <TextInput 
                    value={ cart.coupon }
                    placeholder='Enter promo code here'
                    onChange={ onUpdateCoupon }
                    style={ Width.w_60 }
                  />
  
                  <GenericButton 
                    text="Apply"
                    onClick={ onApplyCoupon }
                    style={ Spacing.mt_0 }
                  />
                </Layout>
              </Layout>
            </Layout>                
          </GenericCard>          
          
          <Layout>
            <Layout style={ styles.summary }>
              <Text category="p2">Subtotal</Text>
              <Text category="p2">{ cart.subtotal.toFixed(2) }</Text>
            </Layout>
  
            <Layout style={ styles.summary }>
              <Text category="p2">Delivery Option</Text>
              <Select
                status="basic"
                size="small"
                value={ selectData[selectedIndex.row] }
                selectedIndex={ selectedIndex }
                onSelect={index => onSelectDelivery(index)}>
                  {
                    selectData.map((item, selectIndex) => {
                      return (
                        <SelectItem title={ item } key={ selectIndex } />
                      );
                    })
                  }
              </Select>
            </Layout>
  
            <Layout style={ styles.summary }>
              <Text category="p2">Shipping</Text>
              <Text category="p2">{ cart.shipping.toFixed(2) }</Text>
            </Layout>
  
            <Layout style={ styles.summary }>
              <Text category="p2">Tax</Text>
              <Text category="p2">{ cart.tax.toFixed(2) }</Text>
            </Layout>
          </Layout>

          <Layout style={{ height: 100 }}></Layout>
        </Layout>
      </ScrollView>  
    
      <Layout level="3" style={ styles.bottomBar }>
        <Layout level="3" style={ [Flex.row, Flex.justifyBetween] }>
          <Subtitle
            text="Cart Total"
            style={{ backgroundColor: "white", ...Width.w_60 }}
            sideText="(incl. tax)"
            sideCategory="s2"
            sideStatus="info"
          />

          <Text category="s1">RM 44.00</Text>
        </Layout>

        <GenericButton 
          text="Proceed to Checkout"
          onClick={ onCheckout }
          style={{ ...Spacing.mt_3, ...Width.w_100 }}
        />
      </Layout>
    </Layout>
  );
}

const {ids, styles} = StyleSheet.create({
  scrollView: {
    flexGrow: 1, 
    alignItems: "center"
  },
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
    ...Flex.itemsStart,
    ...Flex.wrap
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
  couponContainer: {
    ...Width.w_100
  },
  inputContainer: {
    ...Flex.row,
    ...Flex.justifyBetween,
    ...Flex.wrap
  },
  summary: {
    ...Flex.row,
    ...Flex.justifyBetween,
    ...Spacing.py_3
  },
  bottomBar: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 100,
    ...Spacing.p_4,
    ...Generic.box_shadow
  }
});

export default CartScreen;