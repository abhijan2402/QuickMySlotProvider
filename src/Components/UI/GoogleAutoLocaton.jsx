import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Typography} from './Typography';
import {COLOR} from '../../Constants/Colors';
import {Font} from '../../Constants/Font';
import { Google_Key } from '../../Constants/Utility';
const GoogleAutoLocaton = ({
  width,
  onPress = () => {},
  renderRightButton,
  value,
  style,
  placeholder = '',
  descriptionColor = COLOR.black,
  labelmainStyle,
  label,
  marginLeft,
}) => {
  const addressRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    addressRef?.current?.setAddressText(value);
  }, [value]);

  return (
    <View style={[styles.container(width, isFocus), style]}>
      {!!label && (
        <View style={[{paddingBottom: 5, paddingTop: 20}, labelmainStyle]}>
          <Typography
            size={14}
            color={'black'}
            marginLeft={marginLeft}
            font={Font.semibold}>
            {label}
          </Typography>
        </View>
      )}
      <GooglePlacesAutocomplete
        ref={addressRef}
        placeholder={placeholder}
        fetchDetails={true}
        enablePoweredByContainer={false}
        suppressDefaultStyles={false}
        debounce={200}
        minLength={0}
        disableScroll={false}
        timeout={5000}
        keyboardShouldPersistTaps="always"
        textInputProps={{
          placeholderTextColor: COLOR.grey,
          onFocus: () => console.log('Focused'),
        }}
        predefinedPlaces={[]}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderColor: COLOR.primary,
            borderRadius: 10,
            backgroundColor: COLOR.white,
            paddingHorizontal: 10,
            overflow: 'hidden',
          },

          description: {
            fontSize: 13,
            color: descriptionColor,
            fontFamily: Font?.MontserratRegular,
          },
          poweredContainer: {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
          },
          row: {
            backgroundColor: 'transparent',
            padding: 13,
            height: 44,
            flexDirection: 'row',
            zIndex:999
          },
          separator: {
            height: 0.5,
            backgroundColor: '#FFFDFD',
          },
        }}
        renderRightButton={renderRightButton}
        onPress={onPress}
        query={{
          key: `${Google_Key}`,
          language: 'en',
          // types: 'address',
        }}
        backgroundColor={'transparent'}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('No results found')}
      />
    </View>
  );
};
export default GoogleAutoLocaton;

const styles = StyleSheet.create({
  labelContainer: {
    marginLeft: 5,
    marginTop: 10,
    bottom: -5,
    backgroundColor: '#735AE7',
  },
  textInput: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 10,
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    fontFamily: Font?.MontserratMedium,
  },
  container: width => ({
    width: width,
    flex: 1,
  }),
});
