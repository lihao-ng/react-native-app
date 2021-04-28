import React from 'react';

import GenericButton from '../../../../components/buttons/GenericButton';
import axios from 'axios';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { allAddOnSelector, allChoiceSelector, totalProductPrice } from '../../../../recoils/product/Selector';
import { addOnIds, amountButtonState, productState } from '../../../../recoils/product/Atom';
import { inputSelector } from '../../../../recoils/input/Selector';

const SubmitButton = ( props ) => {
  const totalPrice = useRecoilValue(totalProductPrice);

  const onAddToCart = useRecoilCallback(({ snapshot, set }) => async () => {
    const product = await snapshot.getPromise(productState);
    const quantity = await snapshot.getPromise(amountButtonState);
    const addOnsIdsState = await snapshot.getPromise(addOnIds); 
    const addOns = await snapshot.getPromise(allAddOnSelector(addOnsIdsState)); 
    const note = await snapshot.getPromise(inputSelector(0)); 

    let choices = [];

    await addOns.forEach(async (addOn) => {
      if(addOn.required == 1) {
        choices.push(addOn.choices[addOn.selected]);
      } else { 
        const relatedChoices = await snapshot.getPromise(allChoiceSelector(addOn.choices)); 

        relatedChoices.forEach((choice) => {
          if(choice.selected == 1) {
            choices.push(choice.id);
          }
        });
      }
    });

    let data = {
      id: product.entities.product[1].id,
      quantity: quantity,
      extra_note: note,
      totalPrice: totalPrice,
      choices: choices
    }

    addToCartApi(data);
  });

  const addToCartApi = async (item) => {
    console.log(item);
    axios({
      method: 'post',
      url: 'http://bc5663f03589.ngrok.io/api/cart/H3U3XX/add-item',
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

  return (
    <GenericButton 
      text={ "Add to Cart - RM " + totalPrice.toFixed(2) }
      onClick={ onAddToCart }
    />
  );
}

export default SubmitButton;