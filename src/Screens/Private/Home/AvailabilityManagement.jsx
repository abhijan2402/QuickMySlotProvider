// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import {Calendar} from 'react-native-calendars';
// import {COLOR} from '../../../Constants/Colors';
// import HomeHeader from '../../../Components/HomeHeader';
// import CustomButton from '../../../Components/CustomButton';

// const AvailabilityManagement = () => {
//   const [selectedDates, setSelectedDates] = useState({});

//   // Get today's date in YYYY-MM-DD format
//   const today = new Date().toISOString().split('T')[0];

//   // Handle date selection
//   const onDayPress = day => {
//     const date = day.dateString;

//     // Toggle selection
//     if (selectedDates[date]) {
//       const updated = {...selectedDates};
//       delete updated[date];
//       setSelectedDates(updated);
//     } else {
//       setSelectedDates({
//         ...selectedDates,
//         [date]: {
//           selected: true,
//           marked: true,
//           selectedColor: COLOR.primary || '#8f7de8',
//         },
//       });
//     }
//   };

//   // Remove date manually (via cross button)
//   const removeDate = date => {
//     const updated = {...selectedDates};
//     delete updated[date];
//     setSelectedDates(updated);
//   };

//   return (
//     <View style={styles.container}>
//       <HomeHeader
//         title="Manage Availability"
//         leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
//         leftTint={COLOR.black}
//       />
//       <Calendar
//         onDayPress={onDayPress}
//         markedDates={selectedDates}
//         markingType={'multi-dot'}
//         minDate={today}  // ✅ disables past dates
//       />

//       <Text style={styles.subtitle}>Selected Dates:</Text>

//       <ScrollView contentContainerStyle={styles.datesContainer}>
//         {Object.keys(selectedDates).length === 0 ? (
//           <Text style={styles.empty}>No dates selected</Text>
//         ) : (
//           Object.keys(selectedDates).map(date => (
//             <View key={date} style={styles.dateChip}>
//               <Text style={styles.dateText}>{date}</Text>
//               <TouchableOpacity onPress={() => removeDate(date)}>
//                 <Image
//                   source={{
//                     uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png',
//                   }}
//                   style={styles.crossIcon}
//                 />
//               </TouchableOpacity>
//             </View>
//           ))
//         )}
//       </ScrollView>
//       <CustomButton title={'Update Availability'} style={{marginBottom: 50}} />
//     </View>
//   );
// };

// export default AvailabilityManagement;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLOR.white,
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginVertical: 10,
//     paddingHorizontal: 15,
//   },
//   empty: {
//     fontSize: 12,
//     color: COLOR.darkGrey,
//   },
//   datesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     paddingHorizontal: 15,
//   },
//   dateChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f1f1f1',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     margin: 4,
//   },
//   dateText: {
//     fontSize: 13,
//     color: COLOR.black,
//     marginRight: 6,
//   },
//   crossIcon: {
//     width: 11,
//     height: 11,
//     tintColor: 'red',
//   },
// });


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
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState({});

  const today = new Date().toISOString().split('T')[0];

  // Generate slots (10 AM to 8 PM)
  const slots = Array.from({length: 10}, (_, i) => {
    const startHour = 10 + i;
    const endHour = startHour + 1;
    return `${startHour}:00 - ${endHour}:00`;
  });

  // Handle date selection
  const onDayPress = day => {
    const date = day.dateString;
    setSelectedDate(date);

    if (selectedDates[date]) {
      // const updated = {...selectedDates};
      // delete updated[date];
      // setSelectedDates(updated);
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

  // Toggle slot for a date
  const toggleSlot = slot => {
    if (!selectedDate) return;

    const updated = {...selectedSlots};
    if (!updated[selectedDate]) updated[selectedDate] = [];

    if (updated[selectedDate].includes(slot)) {
      updated[selectedDate] = updated[selectedDate].filter(s => s !== slot);
    } else {
      updated[selectedDate].push(slot);
    }
    setSelectedSlots(updated);
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Manage Availability"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />
      <Calendar
        onDayPress={onDayPress}
        markedDates={selectedDates}
        markingType={'multi-dot'}
        minDate={today}
      />

      {selectedDate && (
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
                  selectedSlots[selectedDate]?.includes(slot) &&
                    styles.selectedSlot,
                ]}
                onPress={() => toggleSlot(slot)}>
                <Text
                  style={[
                    styles.slotText,
                    selectedSlots[selectedDate]?.includes(slot) &&
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
        {Object.keys(selectedDates).length === 0 ? (
          <Text style={styles.empty}>No dates selected</Text>
        ) : (
          Object.keys(selectedDates).map(date => (
            <View key={date} style={styles.dateChip}>
              <Text style={styles.dateText}>{date}</Text>
              <TouchableOpacity
                onPress={() => {
                  const updated = {...selectedDates};
                  delete updated[date];
                  setSelectedDates(updated);

                  const updatedSlots = {...selectedSlots};
                  delete updatedSlots[date];
                  setSelectedSlots(updatedSlots);
                }}>
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

      <CustomButton title={'Update Availability'} style={{marginBottom: 50}} />
    </View>
  );
};

export default AvailabilityManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  slotChip: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 5,
    width: '45%', // ✅ 2 per row
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
