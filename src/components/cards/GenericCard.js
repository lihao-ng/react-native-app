import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import StyleSheet from 'react-native-media-query';

import { Flex, Generic, Spacing } from '../../styles';
import { item_img } from '../../../assets/images';

import { spicy_icon, thumb_icon, vegetarian_icon, add_icon } from '../../../assets/icons/custom/index';
import { desktopBreakpoint, tabletBreakpoint } from '../../theme/Breakpoints';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { DETAILS } from '../../navigations/Routes';

const GenericCard = ( props ) => {  
  return (
    <Layout style={ [styles.card, props.style] } dataSet={{ ...props.dataSet }}>
      { props.children }
    </Layout>
    // <TouchableWithoutFeedback onPress={ () => navigation.navigate(DETAILS, {
    //   itemId: props.item.id 
    // }) } style={ [styles.card, props.style] } dataSet={{ media: ids.card }}>
    //   <Image style={ styles.image } resizeMode="cover" source={ item_img } defaultSource={ item_img } /> 

    //   <Layout level="3" style={ styles.itemContainer }>
    //     <Layout level="3">
    //       <Layout level="3" style={ styles.iconsContainer }>
    //         <Image style={ styles.icon } resizeMode="contain" source={ thumb_icon } defaultSource={ thumb_icon } /> 
    //         <Image style={ styles.icon } resizeMode="contain" source={ spicy_icon } defaultSource={ spicy_icon } /> 
    //         <Image style={ styles.icon } resizeMode="contain" source={ vegetarian_icon } defaultSource={ vegetarian_icon } /> 
    //       </Layout>

    //       <Text category="s1" style={ styles.title }>{ props.item.title }</Text>
    //     </Layout>

    //     <Layout level="3" style={ styles.bottomContainer }>
    //       <Text category="s1" style={ styles.title }>RM { props.item.price.toFixed(2) }</Text>
    //       <Image style={ styles.addIcon } resizeMode="contain" source={ add_icon } defaultSource={ add_icon } /> 
    //     </Layout>
    //   </Layout> 
    // </TouchableWithoutFeedback>
  );
}

GenericCard.propTypes = {
  style: PropTypes.object,
}

const {ids, styles} = StyleSheet.create({
  card: {
    ...Generic.box_shadow,
    backgroundColor: 'white',
    borderRadius: 5
    // [desktopBreakpoint]: {
    //   height: 400,
    //   width: "24%"
    // },
    // [tabletBreakpoint]: {
    //   height: 250,
    //   width: "48%"
    // }
  }
});

export default GenericCard;