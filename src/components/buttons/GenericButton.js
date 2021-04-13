import React from 'react';
import { Button } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { Spacing, Flex } from '../../styles';
import StyleSheet from 'react-native-media-query';

const GenericButton = ( props ) => {
  return (
    <Button size="medium" style={{ ...styles.button, ...props.style }} onPress={() => props.onClick()} dataSet={{ media: ids.button }}>
      { props.text }
    </Button>
  );
}

GenericButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
}

const {ids, styles} = StyleSheet.create({
  button: {
    ...Spacing.mt_5,
    ...Flex.selfCenter
  }
});

export default GenericButton;