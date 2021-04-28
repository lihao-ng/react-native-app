import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { Flex, Spacing, Width } from '../../styles';
import StyleSheet from 'react-native-media-query';

const Subtitle = ( props ) => {
  return (
    <Layout style={{ ...styles.inputLabel, ...props.style }} dataSet={{ media: ids.inputLabel }}>
      <Text category="s1" style={ Spacing.mr_2 } status={ props.status ? props.status : "basic" }>{ props.text }</Text>   
      <Text 
        category={ props.sideCategory ? props.sideCategory : "s1" } 
        status={ props.sideStatus ? props.sideStatus : "basic" }
      >
        { props.sideText }
      </Text>   
    </Layout>
  );
}

Subtitle.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.string,
  style: PropTypes.object,
  sideText: PropTypes.string,
  sideCategory: PropTypes.string,
  sideStatus: PropTypes.string
}

const {ids, styles} = StyleSheet.create({
  inputLabel: {
    ...Flex.row,
    ...Flex.itemsCenter,
    ...Width.w_100
  }
});

export default Subtitle;