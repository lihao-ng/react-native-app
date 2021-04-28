import React from 'react';
import { Input, Icon } from '@ui-kitten/components';
import { Generic, Spacing, Width } from '../../styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import StyleSheet from 'react-native-media-query';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { inputSelector } from '../../recoils/input/Selector';

const TextInput = (props) => {
  const [input, setInput] = useRecoilState(inputSelector(props.id));

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
      // size="small"
      style={{ ...styles.input, ...props.style }}
      value={ input.value }
      placeholder={ props.placeholder || '' }
      accessoryRight={ renderIcon }
      onChangeText={ nextValue => {
        setInput({ value: nextValue });
      }}
      dataSet={{ media: ids.input }}
    />   
  );
};

TextInput.propTypes = {
  id: PropTypes.number.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  icon: PropTypes.string
}

const {ids, styles} = StyleSheet.create({
  input: {
    ...Generic.box_shadow,
    ...Spacing.mt_3,
    ...Width.w_100
  }
});

export default TextInput;