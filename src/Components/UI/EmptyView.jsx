import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { images } from './images';
import { Typography } from './Typography';

const EmptyView = ({style = {}, title = 'No record found!'}) => {
  return (
    <View
      style={[
        {
          alignSelf: 'center',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        },
        style,
      ]}>
      <Image
        source={images.camera}
        style={{
          height: 50,
          width: 50,
          alignSelf: 'center',
        }}
      />
      <Typography textAlign="center">{title}</Typography>
    </View>
  );
};

export default EmptyView;

const styles = StyleSheet.create({});
