import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Input from '../../../Components/Input';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {validators} from '../../../Backend/Validator';
import {isValidForm} from '../../../Backend/Utility';
import {ErrorBox} from '../../../Components/UI/ErrorBox';

const AddBank = ({navigation}) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankType, setBankType] = useState(null);

  // Validation errors
  const [error, setError] = useState({});

  const bankTypeOptions = [
    {label: 'Savings', value: 'savings'},
    {label: 'Current', value: 'current'},
    {label: 'Salary', value: 'salary'},
    {label: 'Other', value: 'other'},
  ];

  const handleSubmit = () => {
    let validationErrors = {
      bankName: validators.checkRequire('Bank Name', bankName),
      accountNumber: validators.checkNumber('Account Number', accountNumber),
      ifscCode: validators.checkRequire('IFSC Code', ifscCode),
      bankType: validators.checkRequire('Bank Type', bankType),
    };

    setError(validationErrors);

    if (isValidForm(validationErrors)) {
      console.log('✅ Bank Details:', {
        bankName,
        accountNumber,
        ifscCode,
        bankType,
      });
      navigation.goBack();
      // Add API call here if needed
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HomeHeader
        title="Add Bank"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <ScrollView
        style={{paddingHorizontal: 20}}
        contentContainerStyle={styles.container}>
        <Input
          label="Bank Name"
          placeholder="Enter bank name"
          value={bankName}
          onChangeText={setBankName}
          style={{borderColor: COLOR.primary}}
        />
        {error.bankName && <ErrorBox error={error.bankName} />}

        <Input
          label="Account Number"
          placeholder="Enter account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          style={{borderColor: COLOR.primary}}
          keyboardType="numeric"
        />
        {error.accountNumber && <ErrorBox error={error.accountNumber} />}

        <Input
          label="IFSC Code"
          placeholder="Enter IFSC code"
          value={ifscCode}
          onChangeText={setIfscCode}
          style={{borderColor: COLOR.primary}}
        />
        {error.ifscCode && <ErrorBox error={error.ifscCode} />}

        <Text style={[styles.label, {marginTop: 18}]}>Bank Type</Text>
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
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBank;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: COLOR.bgColor,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.black,
  },
  dropdown: {
    height: 50,
    borderColor: COLOR.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLOR.black,
  },
  button: {
    marginTop: 20,
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
