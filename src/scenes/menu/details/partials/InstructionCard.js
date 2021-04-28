import React from 'react';

import StyleSheet from 'react-native-media-query';
import { Width, Spacing } from '../../../../styles';

import GenericCard from '../../../../components/cards/GenericCard';
import Subtitle from '../../../../components/typography/Subtitle';
import TextInput from '../../../../components/inputs/TextInput';

const InstructionCard = ( props ) => {
  return (
    <GenericCard style={ styles.noteContainer }>
      <Subtitle
        text="Special Instruction"
        style={{ backgroundColor: "white" }}
        sideText="Optional"
        sideCategory="s2"
        sideStatus="info"
      />

      <TextInput 
        placeholder='E.g. No coriander'
        id={ 0 }
      />
    </GenericCard>
  );
}

const {ids, styles} = StyleSheet.create({
  noteContainer: {
    ...Spacing.p_3, 
    ...Spacing.my_3,
    ...Width.w_100
  }
});

export default InstructionCard;