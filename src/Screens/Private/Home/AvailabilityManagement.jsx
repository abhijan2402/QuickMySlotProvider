import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import CustomButton from '../../../Components/CustomButton';

const AvailabilityManagement = () => {
  const [selectedDates, setSelectedDates] = useState({});

  // Handle date selection
  const onDayPress = day => {
    const date = day.dateString;

    // Toggle selection
    if (selectedDates[date]) {
      const updated = {...selectedDates};
      delete updated[date];
      setSelectedDates(updated);
    } else {
      setSelectedDates({
        ...selectedDates,
        [date]: {
          selected: true,
          marked: true,
          selectedColor: COLOR.primary || '#8f7de8',
        },
      });
    }
  };

  // Remove date manually (via cross button)
  const removeDate = date => {
    const updated = {...selectedDates};
    delete updated[date];
    setSelectedDates(updated);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Manage Availability</Text> */}
      <HomeHeader
        title="Manage Availability"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />
      <Calendar
        onDayPress={onDayPress}
        markedDates={selectedDates}
        markingType={'multi-dot'}
      />

      <Text style={styles.subtitle}>Selected Dates:</Text>

      <ScrollView contentContainerStyle={styles.datesContainer}>
        {Object.keys(selectedDates).length === 0 ? (
          <Text style={styles.empty}>No dates selected</Text>
        ) : (
          Object.keys(selectedDates).map(date => (
            <View key={date} style={styles.dateChip}>
              <Text style={styles.dateText}>{date}</Text>
              <TouchableOpacity onPress={() => removeDate(date)}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png', // cross icon
                  }}
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <CustomButton title={'Update Availability'} style={{marginBottom: 50}} />
    </View>
  );
};

export default AvailabilityManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    // padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  empty: {
    fontSize: 12,
    color: COLOR.darkGrey,
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 15,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
  },
  dateText: {
    fontSize: 13,
    color: COLOR.black,
    marginRight: 6,
  },
  crossIcon: {
    width: 11,
    height: 11,
    tintColor: 'red',
  },
});
