import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../Components/HomeHeader';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import DatePickerModal from '../../Components/UI/DatePicker';
import {images} from '../../Components/UI/images';
import Button from '../../Components/UI/Button';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Availability = ({navigation}) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const toggleDay = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Complete Your Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
        onLeftPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{flex: 1, paddingBottom: 55}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
            backgroundColor: COLOR.lightYellow,
            padding: 10,
            borderRadius: 6,
            paddingHorizontal: 20,
            marginHorizontal: 20,
          }}>
          <Image
            style={{width: 20, height: 20, marginBottom: 5, marginRight: 6}}
            source={images.warning}
          />
          <Text
            style={{
              fontSize: 13,
              color: '#555',
              marginBottom: 15,
              flexWrap: 'wrap',
              marginEnd: 20,
            }}>
            Select your working days and set start and end times for each. This
            schedule will let customers know when you’re available for bookings.{' '}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Section */}
          <Text style={styles.sectionTitle}>Your Availability</Text>
          <Text style={styles.infoText}>
            Select the days that you are available
          </Text>
          {/* Days checkboxes */}
          <View style={styles.daysContainer}>
            {days.map(day => (
              <TouchableOpacity
                key={day}
                style={styles.dayRow}
                onPress={() => toggleDay(day)}>
                <View
                  style={[
                    styles.checkbox,
                    selectedDays.includes(day) && styles.checkboxSelected,
                  ]}>
                  <Image
                    source={selectedDays.includes(day) ? images.check : null}
                    style={{
                      width: 14,
                      height: 14,
                      tintColor: COLOR.white,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <Text style={styles.dayText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <DatePickerModal
            label="Daily Start Time (e.g., 9:00 AM)"
            value={startTime}
            mode="time"
            onChange={v => {
              setStartTime(v);
            }}
          />
          {/* End Time */}
          <DatePickerModal
            label="Daily End Time (e.g., 5:00 PM)"
            value={endTime}
            mode="time"
            onChange={v => {
              setEndTime(v);
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Submit */}

      <Button
        containerStyle={{
          marginBottom: 10,
          marginHorizontal: 20,
          width: '90%',
        }}
        // disabled={selectedDays.length === 0 || !startTime || !endTime}
        title="Save profile & Submit for Approval"
        onPress={() => {
          // Handle submit here
          console.log({selectedDays, startTime, endTime});
          navigation.navigate('BottomNavigation'); // Example navigation
        }}
      />
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 15,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%', // 2-column layout
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    borderRadius: 4,
    marginRight: 10,
    alignItems:"center",
    justifyContent:"center"
  },
  checkboxSelected: {
    backgroundColor: COLOR.primary,
  },
  dayText: {
    fontSize: 14,
    color: COLOR.black,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.black,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLOR.black,
    marginBottom: 20,
  },
});
