import React from 'react';
import { Input, Icon } from '@ui-kitten/components';
import { Generic, Spacing, Width } from '../../styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import StyleSheet from 'react-native-media-query';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TextInput = React.memo( props => {
  const renderIcon = (imageProps) => {
    if(!props.icon) {
      return (
        <></>
      );
    }

    return (
      <TouchableWithoutFeedback>
        { 
          <Icon { ...imageProps } name={ props.icon } />
        }
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Input
      size="small"
      style={{ ...styles.input, ...props.style }}
      value={ props.value }
      placeholder={ props.placeholder || '' }
      accessoryRight={ renderIcon }
      onChangeText={ nextValue => props.onChange(nextValue) }
      dataSet={{ media: ids.input }}
    />   
  );
}, (oldProps, newProps) => {
  return _.isEqual(
    _.omit(oldProps, ['onChange']), 
    _.omit(newProps, ['onChange'])
  );
});

TextInput.propTypes = {
  value: PropTypes.any.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

const {ids, styles} = StyleSheet.create({
  input: {
    ...Generic.box_shadow,
    ...Spacing.mt_3,
    ...Width.w_100
  }
});

export default TextInput;