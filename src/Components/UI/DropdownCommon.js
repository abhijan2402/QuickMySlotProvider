import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Typography} from './Typography';
import {validators} from '../../Backend/Validator';
import {COLOR} from '../../Constants/Colors';
import {Font} from '../../Constants/Font';

const DropdownCommon = ({onChange, data, value, label, disable}) => {
  return (
    <View>
      <Typography style={[styles.label, {marginTop: 18}]}>{label}</Typography>
      <Dropdown
        disable={disable}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder=""
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export default DropdownCommon;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLOR.black,
  },
  dropdown: {
    height: 50,
    borderColor: COLOR.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontFamily: Font.medium,
    fontSize: 14,
    color: COLOR.black,
  },
});
