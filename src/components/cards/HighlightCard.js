import React from 'react';
import { Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import StyleSheet from 'react-native-media-query';

import { Flex, Width, Height, Generic, Spacing } from '../../styles';
import { item_img } from '../../../assets/images';

import { spicy_icon, thumb_icon, vegetarian_icon, add_icon } from '../../../assets/icons/custom/index';
import { getHeight, getWidth } from '../../theme/Platform';
import { desktopBreakpoint, tabletBreakpoint } from '../../theme/Breakpoints';
import { DETAILS } from '../../navigations/Routes';

const HighlightCard = ( props ) => {  
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={ () => navigation.navigate(DETAILS, {
      itemId: props.item.id 
    }) } style={ [styles.card, props.style, props.dynamic == true ? styles.cardDyHeight : styles.cardFixedHeight] } dataSet={{ media: props.dynamic == true ? ids.cardDyHeight : ids.cardFixedHeight }}>
      <Image style={ styles.image } resizeMode="cover" source={ item_img } defaultSource={ item_img } /> 

      <Layout level="3" style={ styles.itemContainer }>
        <Layout level="3">
          <Layout level="3" style={ styles.iconsContainer }>
            <Image style={ styles.icon } resizeMode="contain" source={ thumb_icon } defaultSource={ thumb_icon } /> 
            <Image style={ styles.icon } resizeMode="contain" source={ spicy_icon } defaultSource={ spicy_icon } /> 
            <Image style={ styles.icon } resizeMode="contain" source={ vegetarian_icon } defaultSource={ vegetarian_icon } /> 
          </Layout>

          <Text category="s1" style={ styles.title }>{ props.item.title }</Text>
        </Layout>

        <Layout level="3" style={ styles.bottomContainer }>
          <Text category="s1" style={ styles.title }>RM { props.item.price.toFixed(2) }</Text>
          <Image style={ styles.addIcon } resizeMode="contain" source={ add_icon } defaultSource={ add_icon } /> 
        </Layout>
      </Layout> 
    </TouchableWithoutFeedback>
  );
}

HighlightCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object,
  dynamic: PropTypes.bool
}

const {ids, styles} = StyleSheet.create({
  card: {
    ...Flex.row,
    ...Generic.box_shadow,
    backgroundColor: "white"
  },  
  cardFixedHeight: {
    height: 200,
    width: "100%",
    [desktopBreakpoint]: {
      height: 400,
      width: "50%"
    },
    [tabletBreakpoint]: {
      height: 300,
      width: "100%",
    }
  },
  cardDyHeight: {
    height: getHeight() / 5,
    width: getWidth() - 50,
    [desktopBreakpoint]: {
      height: getHeight() / 3,
      width: getWidth() / 2.2
    },
    [tabletBreakpoint]: {
      height: getHeight() / 4,
      width: getWidth() - 50,
    }
  },
  image: {
    height: "100%",
    width: "50%"
  },
  itemContainer: {
    ...Flex.flex,
    ...Flex.justifyBetween,
    ...Spacing.m_3
  },  
  iconsContainer: {
    ...Flex.row
  },  
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    ...Spacing.mt_2
  },
  bottomContainer: {
    ...Flex.row,
    ...Flex.justifyBetween
  },  
  addIcon: {
    width: 35,
    height: 35
  }
});

export default HighlightCard;