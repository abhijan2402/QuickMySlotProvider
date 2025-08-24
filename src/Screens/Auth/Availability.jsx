import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../Components/HomeHeader';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

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
                  ]}
                />
                <Text style={styles.dayText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Start Time */}
          <Text style={styles.label}>Daily Start Time (e.g., 9:00 AM)</Text>
          <TextInput
            style={styles.input}
            placeholder="--:-- --"
            value={startTime}
            onChangeText={setStartTime}
          />

          {/* End Time */}
          <Text style={styles.label}>Daily End Time (e.g., 5:00 PM)</Text>
          <TextInput
            style={styles.input}
            placeholder="--:-- --"
            value={endTime}
            onChangeText={setEndTime}
          />
        </ScrollView>
        {/* Submit */}
        <CustomButton
          textStyle={{fontSize: 14}}
          title="Save profile & Submit for Approval"
          onPress={() => {
            // Handle submit here
            console.log({selectedDays, startTime, endTime});
            navigation.navigate('BottomNavigation'); // Example navigation
          }}
        />
      </KeyboardAvoidingView>
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
