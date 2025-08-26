import React from 'react';
import {Text} from 'react-native';

export const ErrorBox = ({error, style}) => {
  return (
    <Text
      numberOfLines={2}
      adjustsFontSizeToFit
      style={[
        {
          fontSize: 13,
          color: 'red',
          alignSelf: 'flex-start',
          // width: '95%',
          marginTop: 5,
        },
        style,
      ]}>
      {error}
    </Text>
  );
};
