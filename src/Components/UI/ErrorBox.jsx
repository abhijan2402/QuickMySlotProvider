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
          alignSelf: 'flex-end',
          marginTop: 5,
        },
        style,
      ]}>
      {error}
    </Typography>
  );
};
