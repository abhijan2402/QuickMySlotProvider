import React from 'react';
import { Typography } from './Typography';

export const ErrorBox = ({error, style}) => {
  return (
    <Typography
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
    </Typography>
  );
};
