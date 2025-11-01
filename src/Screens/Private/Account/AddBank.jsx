import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Input from '../../../Components/Input';
import { COLOR } from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import { Dropdown } from 'react-native-element-dropdown';
import { validators } from '../../../Backend/Validator';
import { isValidForm } from '../../../Backend/Utility';
import { ErrorBox } from '../../../Components/UI/ErrorBox';
import useKeyboard from '../../../Constants/Utility';
import Button from '../../../Components/UI/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ADD_BANK, UPDATE_BANK } from '../../../Constants/ApiRoute';
import { POST_FORM_DATA } from '../../../Backend/Api';
import { useIsFocused } from '@react-navigation/native';
import { Font } from '../../../Constants/Font';

const AddBank = ({ navigation, route }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankType, setBankType] = useState(null);
  const [pan, setPan] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { isKeyboardVisible } = useKeyboard();
  const isFocus = useIsFocused();

  const data = route?.params?.data;
  const isEditing = route?.params?.isEditing;

  const bankTypeOptions = [
    { label: 'Saving', value: 'saving' },
    { label: 'Current', value: 'current' },
  ];

  useEffect(() => {
    if (isFocus && data) {
      setAccountNumber(data?.account_number || '');
      setBankName(data?.bank_name || '');
      setIfscCode(data?.ifsc_code || '');
      setBankType(data?.bank_type || null);
      setPan(data?.pan || '');
      setStreet1(data?.street1 || '');
      setStreet2(data?.street2 || '');
      setCity(data?.city || '');
      setState(data?.state || '');
      setPostalCode(data?.postal_code || '');
    }
  }, [isFocus]);

  const handleSubmit = () => {
    let validationErrors = {
      bankName: validators.checkRequire('Bank Name', bankName),
      accountNumber: validators.checkNumber('Account Number', accountNumber),
      ifscCode: validators.checkRequire('IFSC Code', ifscCode),
      bankType: validators.checkRequire('Bank Type', bankType),
      pan: validators.checkRequire('PAN', pan),
      street1: validators.checkRequire('Street 1', street1),
      city: validators.checkRequire('City', city),
      state: validators.checkRequire('State', state),
      postalCode: validators.checkNumber('Postal Code', postalCode),
    };

    setError(validationErrors);

    if (isValidForm(validationErrors)) {
      setLoading(true);
      const formData = new FormData();
      formData.append('bank_name', bankName);
      formData.append('account_number', accountNumber);
      formData.append('ifsc_code', ifscCode);
      formData.append('bank_type', bankType);
      formData.append('pan', pan);
      formData.append('street1', street1);
      formData.append('street2', street2);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('postal_code', postalCode);
      console.log(formData, "DATATTATTTATA");

      const url = isEditing ? UPDATE_BANK + data?.id : ADD_BANK;

      POST_FORM_DATA(
        url,
        formData,
        success => {
          console.log(success, '✅ Success');
          setLoading(false);
          navigation.goBack();
        },
        err => {
          console.log(err, '❌ Error');
          setLoading(false);
        },
        fail => {
          console.log(fail, '⚠️ Fail');
          setLoading(false);
        },
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : isKeyboardVisible
            ? 'height'
            : undefined
      }
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}>
      <HomeHeader
        title={isEditing ? 'Edit Bank' : 'Add Bank'}
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 5 }}
        contentContainerStyle={styles.container}>
        <Input
          label="Bank Name"
          placeholder="Enter bank name"
          value={bankName}
          onChangeText={setBankName}
          style={{ borderColor: COLOR.primary }}
          error={error.bankName}
        />

        <Input
          label="Account Number"
          placeholder="Enter account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          style={{ borderColor: COLOR.primary }}
          error={error.accountNumber}
          keyboardType="numeric"
        />

        <Input
          label="IFSC Code"
          placeholder="Enter IFSC code"
          value={ifscCode}
          onChangeText={setIfscCode}
          style={{ borderColor: COLOR.primary }}
          error={error.ifscCode}
        />

        <Text style={[styles.label, { marginTop: 18 }]}>Bank Type</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={bankTypeOptions}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder="Select Bank Type"
          value={bankType}
          onChange={item => setBankType(item.value)}
        />
        {error.bankType && <ErrorBox error={error.bankType} />}

        <Input
          label="PAN"
          placeholder="Enter PAN number"
          value={pan}
          onChangeText={setPan}
          style={{ borderColor: COLOR.primary }}
          error={error.pan}
        />

        <Input
          label="Street 1"
          placeholder="Enter address line 1"
          value={street1}
          onChangeText={setStreet1}
          style={{ borderColor: COLOR.primary }}
          error={error.street1}
        />

        <Input
          label="Street 2"
          placeholder="Enter address line 2 (optional)"
          value={street2}
          onChangeText={setStreet2}
          style={{ borderColor: COLOR.primary }}
        />

        <Input
          label="City"
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
          style={{ borderColor: COLOR.primary }}
          error={error.city}
        />

        <Input
          label="State"
          placeholder="Enter state"
          value={state}
          onChangeText={setState}
          style={{ borderColor: COLOR.primary }}
          error={error.state}
        />

        <Input
          label="Postal Code"
          placeholder="Enter postal code"
          value={postalCode}
          onChangeText={setPostalCode}
          style={{ borderColor: COLOR.primary }}
          error={error.postalCode}
          keyboardType="numeric"
        />
      </KeyboardAwareScrollView>

      <Button
        loading={loading}
        title={isEditing ? 'Edit' : 'Submit'}
        onPress={handleSubmit}
      />
    </KeyboardAvoidingView>
  );
};

export default AddBank;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: COLOR.bgColor,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: COLOR.black,
    fontFamily: Font.semibold,
  },
  dropdown: {
    height: 50,
    borderColor: COLOR.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: Font.semibold,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
    fontFamily: Font.semibold,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLOR.black,
    fontFamily: Font.semibold,
  },
});
