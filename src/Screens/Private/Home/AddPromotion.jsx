import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Input from '../../../Components/Input';
import {COLOR} from '../../../Constants/Colors';
import {windowWidth} from '../../../Constants/Dimensions';
import HomeHeader from '../../../Components/HomeHeader';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import {validators} from '../../../Backend/Validator';
import {ErrorBox} from '../../../Components/UI/ErrorBox';
import useKeyboard from '../../../Constants/Utility';

const AddPromotion = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState({});
  const [description, setDescription] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const {isKeyboardVisible} = useKeyboard();

  const discountOptions = [
    {label: 'Percent (%)', value: 'percent'},
    {label: 'Amount (₹)', value: 'amount'},
  ];

  const handleAddPromotion = () => {
    let errorObj = {};

    if (!promoCode?.trim()) {
      errorObj.promoCode = 'Promotion code is required.';
    }

    if (!discountType) {
      errorObj.discountType = 'Please select a discount type.';
    }

    if (!discount?.trim()) {
      errorObj.discount = 'Discount value is required.';
    }

    if (!startDate) {
      errorObj.startDate = 'Start date is required.';
    }

    if (!endDate) {
      errorObj.endDate = 'End date is required.';
    } else if (endDate <= startDate) {
      errorObj.endDate = 'End date must be after start date.';
    }

    if (!description?.trim()) {
      errorObj.description = 'Description is required.';
    }

    setError(errorObj);

    if (Object.keys(errorObj).length === 0) {
      // Submit only if no errors
      navigation.goBack();
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      <HomeHeader
        title="Add Promotion"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 0 : isKeyboardVisible ? 40 : -40
        }>
        <ScrollView
          style={{paddingHorizontal: 20}}
          contentContainerStyle={styles.container}>
          <Input
            label="Promotion Code"
            placeholder=""
            value={promoCode}
            onChangeText={setPromoCode}
            style={styles.input}
            error={error.promoCode}
          />
          <View style={{alignSelf: 'center', width: '100%', marginTop: 20}}>
            <Text style={{marginBottom: 5, fontSize: 14, fontWeight: '500'}}>
              Discount Type
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={discountOptions}
              maxHeight={120}
              labelField="label"
              valueField="value"
              placeholder=""
              value={discountType}
              onChange={item => setDiscountType(item.value)}
            />
          </View>
          {error.discountType && <ErrorBox error={error.discountType} />}

          <Input
            label={'Discount (Amount/Percent)'}
            value={discount}
            onChangeText={setDiscount}
            style={[styles.input]}
            keyboardType="numeric"
            error={error.discount}
          />
          {/* Start Date */}
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              marginBottom: 8,
              marginTop: 20,
            }}>
            <Text style={{marginBottom: 5, fontSize: 14, fontWeight: '500'}}>
              Start Date
            </Text>
            <TouchableOpacity
              onPress={() => setOpenStartPicker(true)}
              style={styles.dateInput}>
              <Text
                style={{
                  color: startDate ? COLOR.black : COLOR.grey,
                  fontSize: 14,
                }}>
                {!!startDate ? startDate.toISOString().split('T')[0] : ''}
              </Text>
            </TouchableOpacity>
          </View>
          {error.startDate && <ErrorBox error={error.startDate} />}
          {/* End Date */}
          <View style={{width: '100%', alignSelf: 'center', marginTop: 8}}>
            <Text style={{marginBottom: 5, fontSize: 14, fontWeight: '500'}}>
              End Date
            </Text>
            <TouchableOpacity
              onPress={() => setOpenEndPicker(true)}
              style={styles.dateInput}>
              <Text
                style={{
                  color: endDate ? COLOR.black : COLOR.grey,
                  fontSize: 14,
                }}>
                {!!endDate ? endDate.toISOString().split('T')[0] : ''}
              </Text>
            </TouchableOpacity>
          </View>
          {error.endDate && <ErrorBox error={error.endDate} />}
          <Input
            label="Description"
            placeholder=""
            value={description}
            onChangeText={setDescription}
            style={[styles.input, {height: 100}]}
            multiline={true}
            error={error.description}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.button} onPress={handleAddPromotion}>
        <Text style={styles.buttonText}>Save Promotion</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={openStartPicker || openEndPicker}
        date={startDate || new Date()}
        minimumDate={openStartPicker ? openStartPicker : new Date()}
        mode="date"
        onConfirm={date => {
          if (openStartPicker) {
            setOpenStartPicker(false);
            setStartDate(date);
          } else {
            setOpenEndPicker(false);
            setEndDate(date);
          }
        }}
        onCancel={() => {
          setOpenStartPicker(false);
          setOpenEndPicker(false);
        }}
      />
    </View>
  );
};

export default AddPromotion;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 15,
    backgroundColor: COLOR.bgColor,
  },
  input: {
    borderColor: COLOR.primary,
  },
  label: {
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: COLOR.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLOR.white,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#999',
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
    marginBottom: 30,
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 8,
    padding: 14,
    backgroundColor: COLOR.white,
  },
});
