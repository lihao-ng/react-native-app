import React, { useState } from 'react';
import { Input, Icon } from '@ui-kitten/components';
import { Generic, Spacing } from '../../styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import StyleSheet from 'react-native-media-query';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { inputSelector } from '../../recoils/input/Selector';

const PasswordInput = ( props ) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [input, setInput] = useRecoilState(inputSelector(props.id));

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (imageProps) => {
    if(!props.showIcon) {
      return (
        <></>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        { 
          <Icon { ...imageProps } name={ secureTextEntry ? "eye-off-outline" : "eye-outline" } />
        }
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Input
      style={{ ...styles.input, ...props.style }}
      value={ input.value }
      placeholder={ props.placeholder || '' }
      accessoryRight={ renderIcon }
      secureTextEntry={ secureTextEntry }
      onChangeText={ nextValue => setInput({ value: nextValue }) }
      dataSet={{ media: ids.input }}
    />   
  );
}

PasswordInput.propTypes = {
  value: PropTypes.any.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  showIcon: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

const {ids, styles} = StyleSheet.create({
  input: {
    ...Generic.box_shadow,
    ...Spacing.mt_3,
    width: "100%"
  }
});

export default PasswordInput;