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
import { Typography } from '../../../Components/UI/Typography';
import { Font } from '../../../Constants/Font';

const AvailabilityManagement = () => {
  const [availability, setAvailability] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  console.log(availability, 'availability');

  const today = new Date().toISOString().split('T')[0];

  // Format date YYYY-MM-DD → DD-MM-YYYY
  const formatDate = (dateStr) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  };

  // Generate slots (10 AM to 8 PM)
  const slots = Array.from({length: 10}, (_, i) => {
    const startHour = 10 + i;
    const suffix = startHour >= 12 ? 'PM' : 'AM';
    const hour12 = startHour > 12 ? startHour - 12 : startHour;
    return `${hour12}:00 ${suffix}`;
  });

  // Handle date selection
  const onDayPress = day => {
    const formattedDate = formatDate(day.dateString);
    setSelectedDate(formattedDate);

    setAvailability(prev => {
      const updated = {...prev};
      if (!updated[formattedDate]) {
        updated[formattedDate] = [];
      }
      return updated;
    });
  };

  // Toggle slot for a date
  const toggleSlot = slot => {
    if (!selectedDate) return;

    setAvailability(prev => {
      const updated = {...prev};
      const slotsArr = updated[selectedDate] || [];

      if (slotsArr.includes(slot)) {
        updated[selectedDate] = slotsArr.filter(s => s !== slot);

        // remove date completely if no slots remain
        if (updated[selectedDate].length === 0) {
          delete updated[selectedDate];
          return updated;
        }
      } else {
        updated[selectedDate] = [...slotsArr, slot];
      }
      return updated;
    });
  };

  // Delete a date manually
  const deleteDate = date => {
    setAvailability(prev => {
      const updated = {...prev};
      delete updated[date];
      return updated;
    });
    if (selectedDate === date) setSelectedDate(null);
  };

  return (
    <View style={styles.container}>
      <Typography size={18} font={Font.bold}>Manage Availability</Typography>

      <Calendar
        onDayPress={onDayPress}
        markedDates={Object.fromEntries(
          Object.keys(availability).map(date => {
            // convert back DD-MM-YYYY → YYYY-MM-DD for calendar
            const [d, m, y] = date.split('-');
            return [`${y}-${m}-${d}`, {selected: true, selectedColor: COLOR.primary}];
          })
        )}
        minDate={today}
      />

      {selectedDate && availability[selectedDate] && (
        <>
          <Text style={styles.subtitle}>
            Available Slots for {selectedDate}:
          </Text>
          <View style={styles.slotsContainer}>
            {slots.map(slot => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slotChip,
                  availability[selectedDate]?.includes(slot) &&
                    styles.selectedSlot,
                ]}
                onPress={() => toggleSlot(slot)}>
                <Text
                  style={[
                    styles.slotText,
                    availability[selectedDate]?.includes(slot) &&
                      styles.selectedSlotText,
                  ]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text style={styles.subtitle}>Selected Dates:</Text>
      <ScrollView contentContainerStyle={styles.datesContainer}>
        {Object.keys(availability).length === 0 ? (
          <Text style={styles.empty}>No dates selected</Text>
        ) : (
          Object.keys(availability).map(date => (
            <View key={date} style={styles.dateChip}>
              <Text style={styles.dateText}>
                {date}: {availability[date].join(', ')}
              </Text>
              <TouchableOpacity onPress={() => deleteDate(date)}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png',
                  }}
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default AvailabilityManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  empty: {
    fontSize: 12,
    color: COLOR.darkGrey,
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 5,
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
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  slotChip: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 5,
    width: '45%',
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: COLOR.primary,
  },
  slotText: {
    fontSize: 13,
    color: COLOR.primary,
  },
  selectedSlotText: {
    color: COLOR.white,
  },
});
