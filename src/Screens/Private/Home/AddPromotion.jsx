import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Input from '../../../Components/Input';
import {COLOR} from '../../../Constants/Colors';
import {windowWidth} from '../../../Constants/Dimensions';
import HomeHeader from '../../../Components/HomeHeader';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';

const AddPromotion = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState(null); 
  const [brandName, setBrandName] = useState('');
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const discountOptions = [
    {label: 'Percent (%)', value: 'percent'},
    {label: 'Amount (₹)', value: 'amount'},
  ];

  const handleAddPromotion = () => {
    console.log('New Promotion:', {
      title,
      description,
      startDate,
      endDate,
      promoCode,
      discount,
      discountType,
      brandName,
    });
    navigation.goBack()
    // API call can go here
  };

  return (
    <View style={{flex: 1}}>
      <HomeHeader
        title="Add Promotion"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Input
          label="Promotion Code"
          placeholder="Enter promo code"
          value={promoCode}
          onChangeText={setPromoCode}
          style={styles.input}
          labelStyle={styles.label}
        />
        <View style={{alignSelf: 'center', width: '90%', marginVertical: 5}}>
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
            placeholder="Select type"
            value={discountType}
            onChange={item => setDiscountType(item.value)}
          />
        </View>
        <Input
          label="Description"
          placeholder="Enter promotion description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          labelStyle={styles.label}
          multiline
        />
         <Input
          label={discountType === 'amount' ? 'Discount Amount' : 'Discount Percent' }
          placeholder={discountType === 'amount' ? 'Enter Discount Amount' : 'Enter Discount Percent' }
          value={discount}
          onChangeText={setDiscount}
          style={[styles.input]}
          labelStyle={styles.label}
          keyboardType="numeric"
        />

        {/* Start Date */}
        <View style={{width: '90%', alignSelf: 'center', marginVertical: 8}}>
          <Text style={{marginBottom: 5, fontSize: 14, fontWeight: '500'}}>
            Start Date
          </Text>
          <TouchableOpacity
            onPress={() => setOpenStartPicker(true)}
            style={styles.dateInput}>
            <Text>
              {startDate
                ? startDate.toISOString().split('T')[0]
                : 'Select start date'}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openStartPicker}
            date={startDate}
            minimumDate={new Date()}
            mode="date"
            onConfirm={date => {
              setOpenStartPicker(false);
              setStartDate(date);
            }}
            onCancel={() => setOpenStartPicker(false)}
          />
        </View>

        {/* End Date */}
        <View style={{width: '90%', alignSelf: 'center', marginVertical: 8}}>
          <Text style={{marginBottom: 5, fontSize: 14, fontWeight: '500'}}>
            End Date
          </Text>
          <TouchableOpacity
            onPress={() => setOpenEndPicker(true)}
            style={styles.dateInput}>
            <Text>
              {endDate
                ? endDate.toISOString().split('T')[0]
                : 'Select end date'}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openEndPicker}
            date={endDate}
            minimumDate={startDate} 
            mode="date"
            onConfirm={date => {
              setOpenEndPicker(false);
              setEndDate(date);
            }}
            onCancel={() => setOpenEndPicker(false)}
          />
        </View>       

        <Input
          label="Brand Name"
          placeholder="Enter brand name"
          value={brandName}
          onChangeText={setBrandName}
          style={styles.input}
          labelStyle={styles.label}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddPromotion}>
          <Text style={styles.buttonText}>Save Promotion</Text>
        </TouchableOpacity>
      </ScrollView>
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
