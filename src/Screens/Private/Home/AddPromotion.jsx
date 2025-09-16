import React, {useEffect, useState} from 'react';
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
import Button from '../../../Components/UI/Button';
import {POST_FORM_DATA} from '../../../Backend/Api';
import {ADD_PROMOTION, UPDATE_PROMOTION} from '../../../Constants/ApiRoute';
import SwitchButton from '../../../Components/UI/SwitchButton';
import {Typography} from '../../../Components/UI/Typography';
import {useIsFocused} from '@react-navigation/native';
import {Font} from '../../../Constants/Font';

const AddPromotion = ({navigation, route}) => {
  const [error, setError] = useState({});
  const [description, setDescription] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState(null);
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const {isKeyboardVisible} = useKeyboard();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const data = route?.params?.data;
  console.log(data);
  const isEditing = route?.params?.isEditing;

  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      setPromoCode(data?.promo_code);
      setDiscount(data?.amount);
      setDescription(data?.description);
      setIsActive(data?.isActive);
      setDiscountType(data?.type);
      setStartDate(data?.start_on ? new Date(data.start_on) : '');
      setEndDate(data?.expired_on ? new Date(data.expired_on) : '');
    }
  }, [isFocus]);

  const discountOptions = [
    {label: 'Flat', value: 'flat'},
    // {label: 'Amount (₹)', value: 'amount'},
  ];

  const formatDate = date => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // ensure 2 digits
    const day = String(date.getDate()).padStart(2, '0'); // ensure 2 digits
    return `${year}-${month}-${day}`;
  };

  const handleAddPromotion = () => {
    let validationErrors = {
      promoCode: validators.checkRequire('Promotion code', promoCode),
      discountType: validators.checkRequire('Discount Type', discountType),
      discount: validators.checkNumber('Discount value', discount),
      startDate: validators.checkRequire('Start date', startDate),
      endDate: !endDate
        ? 'End date is required.'
        : endDate <= startDate
        ? 'End date must be after start date.'
        : '',
      description: validators.checkRequire('Description', description),
    };

    Object.keys(validationErrors).forEach(key => {
      if (!validationErrors[key]) {
        delete validationErrors[key];
      }
    });

    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append('promo_code', promoCode);
      formData.append('type', discountType);
      formData.append('amount', discount);
      formData.append('start_on', formatDate(startDate));
      formData.append('expired_on', formatDate(endDate));
      formData.append('description', description);
      formData.append('isActive', isActive ? 1 : 0);
      console.log('FormData ====>', formData);
      if (isEditing) {
        POST_FORM_DATA(
          UPDATE_PROMOTION + data?.id,
          formData,
          success => {
            console.log(success, 'successsuccesssuccess-->>>');
            setLoading(false);
            navigation.goBack();
          },
          error => {
            console.log(error, 'errorerrorerror>>');
            setLoading(false);
          },
          fail => {
            console.log(fail, 'errorerrorerror>>');

            setLoading(false);
          },
        );
      } else {
        POST_FORM_DATA(
          ADD_PROMOTION,
          formData,
          success => {
            console.log(success, 'successsuccesssuccess-->>>');
            setLoading(false);
            navigation.goBack();
          },
          error => {
            console.log(error, 'errorerrorerror>>');
            setLoading(false);
          },
          fail => {
            console.log(fail, 'errorerrorerror>>');

            setLoading(false);
          },
        );
      }
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 15}}>
      <HomeHeader
        title={isEditing ? 'Edit Promotion' : 'Add Promotion'}
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
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 5}}
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
                {!!startDate ? startDate.toLocaleDateString() : ''}
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
                {!!endDate ? endDate.toLocaleDateString() : ''}
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
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <Typography size={18} font={Font.medium} style={{marginRight: 5}}>
              IsActive
            </Typography>
            <SwitchButton
              value={isActive}
              onValueChange={() => setIsActive(!isActive)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Button
        loading={loading}
        onPress={handleAddPromotion}
        title={isEditing ? 'Edit Promotion' : 'Save Promotion'}
      />

      <DatePicker
        modal
        open={openStartPicker || openEndPicker}
        date={startDate || new Date()}
        minimumDate={openStartPicker ? startDate : new Date()}
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
    fontFamily: Font.medium,
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
    fontFamily: Font.medium,
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
    fontFamily: Font.semibold,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 8,
    padding: 14,
    backgroundColor: COLOR.white,
    fontFamily: Font.medium,
  },
});
