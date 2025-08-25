import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import Input from '../../../Components/Input';
import {COLOR} from '../../../Constants/Colors';
import {windowWidth} from '../../../Constants/Dimensions';
import HomeHeader from '../../../Components/HomeHeader';

const AddBank = ({navigation}) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankType, setBankType] = useState('');

  const handleSubmit = () => {
    console.log('Bank Details:', {
      bankName,
      accountNumber,
      ifscCode,
      bankType,
    });
    navigation.goBack()
    // you can add API call or navigation here
  };

  return (
    <View style={{flex: 1}}>
      <HomeHeader
        title="Add Bank"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Input
          label="Bank Name"
          placeholder="Enter bank name"
          value={bankName}
          onChangeText={setBankName}
          labelStyle={{marginLeft: 30}}
          style={{borderColor: COLOR.primary}}
        />

        <Input
          label="Account Number"
          placeholder="Enter account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          labelStyle={{marginLeft: 30}}
          style={{borderColor: COLOR.primary}}
          keyboardType="numeric"
        />

        <Input
          label="IFSC Code"
          placeholder="Enter IFSC code"
          value={ifscCode}
          onChangeText={setIfscCode}
          labelStyle={{marginLeft: 30}}
          style={{borderColor: COLOR.primary}}
        />

        <Input
          label="Bank Type"
          placeholder="e.g. Savings / Current"
          value={bankType}
          onChangeText={setBankType}
          labelStyle={{marginLeft: 30}}
          style={{borderColor: COLOR.primary}}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
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
  button: {
    marginTop: 20,
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    borderRadius: 10,
    width: windowWidth / 1.16,
    alignSelf: 'center',
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
