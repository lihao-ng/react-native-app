import React, { useEffect, useState } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { Image } from 'react-native';
import update from 'immutability-helper';

import StyleSheet from 'react-native-media-query';
import ScrollLayout from '../../components/layouts/ScrollLayout';

import { item_img } from '../../../assets/images';
import { Flex, Width, Spacing, Generic } from '../../styles';
import { desktopBreakpoint, tabletBreakpoint } from '../../theme/Breakpoints';
import { spicy_icon, thumb_icon, vegetarian_icon } from '../../../assets/icons/custom/index';

import GenericCard from '../../components/cards/GenericCard';
import Subtitle from '../../components/typography/Subtitle';
import TextInput from '../../components/inputs/TextInput';
import AddOnRadio from '../../components/radios/AddOnRadio';
import AddOnCheckBox from '../../components/checkboxes/AddOnCheckBox';
import GenericButton from '../../components/buttons/GenericButton';

import Item from '../../models/Item';

import { useRecoilState } from 'recoil';
import { cartAtom } from '../../recoils/cart';
import { HOME } from '../../navigations/Routes';

import axios from 'axios';

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
      id: 3,
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
  const [itemState, setItemState] = useState(null);
  const [total, setTotal] = useState(0.00);
  const [cart, setCartAtom] = useRecoilState(cartAtom);

  useEffect(() => {
    // Make API call to get the actual data based on route.params.itemId

    const item = new Item(
      DETAIL_DATA.id, 
      DETAIL_DATA.title, 
      DETAIL_DATA.description, 
      DETAIL_DATA.price, 
      1, 
      0.00,
      "",
      DETAIL_DATA.thumb, 
      DETAIL_DATA.spicy, 
      DETAIL_DATA.vegetarian, 
      DETAIL_DATA.add_ons
    );
    
    setItemState(item);
  }, []);

  useEffect(() => {
    if(itemState == null) {
      return;
    }

    let calcTotal = 0;

    calcTotal += itemState.price * itemState.quantity;
    
    itemState.addOns.forEach((addOn, index) => {
      if(addOn.required == 1) {
        calcTotal += addOn.choices[addOn.selected].price;
      } else {
        addOn.choices.forEach((choice) => {
          if(choice.selected == 1) {
            calcTotal += choice.price;
          }
        })
      }
    });    

    setTotal(calcTotal);
  }, [itemState]);

  const getSideText = (addOn) => {
    let text = "";

    text += addOn.required == 1 ? "Required" : "Optional"; 
    text += addOn.limit == 1 ? ", Pick 1" : `, Max: ${addOn.limit}`;

    return text;
  }

  const onMinusQuantity = (quantity) => {
    setItemState((prevState) => {
      if(prevState.quantity <= 1) {
        return prevState;
      }

      return update(prevState, {
        $apply: function(item) {
          return {
            ...item,
            quantity: quantity
          }
        } 
      });
    });
  };

  const onAddQuantity = (quantity) => {
    setItemState((prevState) => {
      return update(prevState, {
        $apply: function(item) {
          return {
            ...item,
            quantity: quantity
          }
        } 
      })
    });
  };

  const onUpdateRadio = (addOnIndex, selectedIndex) => {
    setItemState((prevState) => {
      return update(prevState, {
        addOns: {
          [addOnIndex]: {
            $apply: function(item) {
              return {
                ...item,
                selected: selectedIndex
              }
            }
          }
        }
      });
    })
  }

  const onUpdateChecked = (addOnIndex, checkboxIndex, nextChecked) => {
    setItemState((prevState) => {
      const addOn = prevState.addOns[addOnIndex];
  
      const selected = addOn.choices.filter((choice) => {
        return choice.selected == true
      });
      
      if(nextChecked == true && selected.length >= addOn.limit) {
        return prevState;
      }

      return update(prevState, {
        addOns: {
          [addOnIndex]: {
            choices: {
              [checkboxIndex]: {
                $apply: function(item) {
                  return {
                    ...item,
                    selected: nextChecked
                  }
                }
              }
            }
          }
        }
      });
    })
  }

  const onUpdateNote = (nextInput) => {
    setItemState((prevState) => {
      return update(prevState, {
        $apply: function(item) {
          return {
            ...item,
            note: nextInput
          }
        }
      })
    })
  }

  const addToCartApi = async (item) => {
    console.log(item);
    axios({
      method: 'post',
      url: 'http://89cadac8552c.ngrok.io/api/cart/H3U3XX/add-item',
      headers: {
        'Accept': 'application/json'
      },
      data: item
    })
    .then((response) => {
      console.log('resp', response.data)
    })
    .catch((error) => {
      console.log('err', error.response.data)
    });
  };

  const onAddToCart = () => {
    let { addOns, ...item } = itemState;
    let choices = [];

    itemState.addOns.map((addOn) => {
      if(addOn.required == 1) {
        choices.push(addOn.choices[addOn.selected].id);
      } else { 
        addOn.choices.forEach((choice) => {
          if(choice.selected == 1) {
            choices.push(choice.id);
          }
        });
      }
    });

    item['choices'] = choices;
    item.totalPrice = total;

    addToCartApi(item);
    // console.log('choices', choices);

    // setItemState((prevState) => {
    //   return update(prevState, {
    //     $apply: function(item) {
    //       return {
    //         ...item,
    //         totalPrice: total
    //       }
    //     }
    //   });
    // });

    // const updatedCart = update(prevState, {
    //   items: {
    //     $push: [itemState]
    //   } 
    // })

    // setCartAtom(updatedCart);
    // await setCartAtom((prevState) => {
      // return update(prevState, {
      //   items: {
      //     $push: [itemState]
      //   } 
      // })
    // });
    
    // navigation.navigate(HOME);
  }

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
              <Text category="s1">{ itemState.title }</Text>
              <Text category="s1">RM { itemState.price.toFixed(2) }</Text>
            </Layout>

            <Layout style={ styles.title }>
              <Text category="p1" style={ Spacing.my_2 }>{ itemState.description }</Text>

              <Layout style={ styles.amountContainer }>
                <Button size="tiny" style={ styles.quantityBtn } onPress={() => onMinusQuantity(itemState.quantity - 1)}>
                  <Text category="s1" status="control" >-</Text>
                </Button>
            
                <Layout>
                  <Text category="s1" style={ [Spacing.mx_4, Spacing.mt_2] }>{ itemState.quantity }</Text>
                </Layout>
                
                <Button size="tiny" style={ styles.quantityBtn } onPress={() => onAddQuantity(itemState.quantity + 1)}>
                  <Text category="s1" status="control" >+</Text>  
                </Button>  
              </Layout>  
            </Layout>

            <Layout style={ styles.addOnContainer }>
              {
                itemState.addOns.map((addOn, addOnIndex) => {
                  return (
                    <GenericCard style={ styles.card } key={ addOnIndex } dataSet={{ media: ids.card }}>
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
                        <AddOnRadio
                          selected={ addOn.selected }
                          addOnIndex={ addOnIndex }
                          onChange={ onUpdateRadio }
                          choices={ addOn.choices }
                        />
                        :
                          <Layout>
                            { 
                              addOn.choices.map((choice, index) => {
                                return <AddOnCheckBox 
                                  selected={ choice.selected }
                                  addOnIndex={ addOnIndex }
                                  onChange={ onUpdateChecked }
                                  choice={ choice }
                                  index={ index }
                                  key={ index }
                                />
                              })
                            }
                          </Layout>
                      }
                    </GenericCard>
                  );
                })
              }          
            </Layout>

            <GenericCard style={ styles.noteContainer }>
              <Subtitle
                text="Special Instruction"
                style={{ backgroundColor: "white" }}
                sideText="Optional"
                sideCategory="s2"
                sideStatus="info"
              />

              <TextInput 
                value={ itemState.note }
                placeholder='E.g. No coriander'
                onChange={ onUpdateNote }
              />
            </GenericCard>
            <GenericButton 
              text={ "Add to Cart - RM " + total.toFixed(2) }
              onClick={ onAddToCart }
            />
          </Layout>
        </Layout>
      </ScrollLayout>
    );
  }

  return (
    itemState == null
    ?
      <Text>Heello</Text>
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
    ...Spacing.pb_1
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

export default DetailsScreen;