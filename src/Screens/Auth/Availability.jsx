import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../Components/HomeHeader';
import {COLOR} from '../../Constants/Colors';
import DatePickerModal from '../../Components/UI/DatePicker';
import {images} from '../../Components/UI/images';
import Button from '../../Components/UI/Button';
import {ErrorBox} from '../../Components/UI/ErrorBox';
import {Typography} from '../../Components/UI/Typography'; // ✅ use Typography
import { windowWidth } from '../../Constants/Dimensions';

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
  const [errors, setError] = useState('');

  const toggleDay = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = () => {
    let tempErrors = {};

    if (selectedDays.length === 0) {
      tempErrors.days = 'Please select at least one working day.';
    }
    if (!startTime) {
      tempErrors.start = 'Please select a start time.';
    }
    if (!endTime) {
      tempErrors.end = 'Please select an end time.';
    }

    setError(tempErrors);
    if (Object.keys(tempErrors).length > 0) {
      return;
    }
    setError({});

    console.log({selectedDays, startTime, endTime});
    navigation.navigate('BottomNavigation');
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Complete Your Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
        onLeftPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{flex: 1, paddingBottom: 55}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* Warning box */}
          <View style={styles.warningBox}>
            <Image
              style={{width: 22, height: 22, marginRight: 10, marginTop: 2}}
              source={images.warning}
              resizeMode="contain"
            />
            <Typography size={14} color="#444" lineHeight={20} style={{width: windowWidth * 0.75}}>
              Select your working days and set start and end times for each.
              This schedule will let customers know when you’re available for
              bookings.
            </Typography>
          </View>

          <Typography
            size={16}
            fontWeight="600"
            color={COLOR.black}
            style={{marginBottom: 8}}>
            Your Availability
          </Typography>

          <Typography size={13} color="#555" style={{marginBottom: 15}}>
            Select the days that you are available
          </Typography>

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
                  {selectedDays.includes(day) && (
                    <Image
                      source={images.check}
                      style={{
                        width: 14,
                        height: 14,
                        tintColor: COLOR.white,
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </View>
                <Typography size={14} color={COLOR.black}>
                  {day}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
          {errors.days && (
            <ErrorBox style={{marginTop: -6}} error={errors.days} />
          )}

          {/* Start Time */}
          <View style={{marginTop: 15}}>
            <DatePickerModal
              label="Daily Start Time (e.g., 9:00 AM)"
              value={startTime}
              mode="time"
              error={errors.start}
              onChange={v => setStartTime(v)}
            />
          </View>

          {/* End Time */}
          <DatePickerModal
            label="Daily End Time (e.g., 5:00 PM)"
            value={endTime}
            mode="time"
            error={errors.end}
            onChange={v => setEndTime(v)}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit */}
      <Button
        containerStyle={{
          marginBottom: 10,
          marginHorizontal: 20,
        }}
        title="Save profile & Submit for Approval"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 40,
    paddingTop: 10,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    backgroundColor: COLOR.lightYellow,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#f5a623',
    elevation: 3,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLOR.primary,
  },
});
