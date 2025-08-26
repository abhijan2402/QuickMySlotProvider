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
//       {/* <Text style={styles.title}>Manage Availability</Text> */}
//       <HomeHeader
//         title="Manage Availability"
//         leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
//         leftTint={COLOR.black}
//       />
//       <Calendar
//         onDayPress={onDayPress}
//         markedDates={selectedDates}
//         markingType={'multi-dot'}
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
//                     uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png', // cross icon
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
//     // padding: 15,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: COLOR.black,
//     marginBottom: 10,
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
  const [markedDates, setMarkedDates] = useState({});
  const [slotsData, setSlotsData] = useState({});

  // Generate hourly slots (10 AM – 8 PM)
  const generateSlots = () => {
    const slots = [];
    for (let i = 10; i < 20; i++) {
      const startHour = i;
      const endHour = i + 1;

      const formatTime = h => {
        const suffix = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 === 0 ? 12 : h % 12;
        return `${hour}:00 ${suffix}`;
      };

      slots.push({
        time: `${formatTime(startHour)} - ${formatTime(endHour)}`,
        available: true,
      });
    }
    return slots;
  };

  // Handle date selection
  const onDayPress = day => {
    const date = day.dateString;

    if (markedDates[date]) {
      // remove date
      const updatedMarks = {...markedDates};
      delete updatedMarks[date];
      setMarkedDates(updatedMarks);

      const updatedSlots = {...slotsData};
      delete updatedSlots[date];
      setSlotsData(updatedSlots);
    } else {
      // add date
      setMarkedDates({
        ...markedDates,
        [date]: {
          selected: true,
          marked: true,
          selectedColor: COLOR.primary || '#8f7de8',
        },
      });

      setSlotsData({
        ...slotsData,
        [date]: generateSlots(),
      });
    }
  };

  // Toggle slot availability
  const toggleSlot = (date, index) => {
    const updated = {...slotsData};
    updated[date][index].available = !updated[date][index].available;
    setSlotsData(updated);
  };

  // Remove date manually
  const removeDate = date => {
    const updatedMarks = {...markedDates};
    delete updatedMarks[date];
    setMarkedDates(updatedMarks);

    const updatedSlots = {...slotsData};
    delete updatedSlots[date];
    setSlotsData(updatedSlots);
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
        markedDates={markedDates}
        markingType={'multi-dot'}
      />

      <Text style={styles.subtitle}>Selected Dates & Time Slots:</Text>

      <ScrollView contentContainerStyle={styles.datesContainer}>
        {Object.keys(slotsData).length === 0 ? (
          <Text style={styles.empty}>No dates selected</Text>
        ) : (
          Object.keys(slotsData).map(date => (
            <View key={date} style={styles.dateSection}>
              {/* Date header with remove button */}
              <View style={styles.dateChip}>
                <Text style={styles.dateText}>{date}</Text>
                <TouchableOpacity onPress={() => removeDate(date)}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png',
                    }}
                    style={styles.crossIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* Slots */}
              {/* Slots */}
<View style={styles.slotsContainer}>
  {slotsData[date].map((slot, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.slot,
        {
          borderColor: slot.available ? COLOR.primary : '#ccc',
        },
      ]}
      onPress={() => toggleSlot(date, index)}>
      <Text
        style={[
          styles.slotText,
          {color: slot.available ? COLOR.primary : COLOR.black},
        ]}>
        {slot.time}
      </Text>
    </TouchableOpacity>
  ))}
</View>

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
    paddingHorizontal: 15,
  },
  datesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
    alignSelf: 'flex-start',
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
  justifyContent: 'space-between',
},
slot: {
  width: '48%',            // two per row
  paddingVertical: 10,
  borderRadius: 8,
  borderWidth: 1,
  marginBottom: 10,
  alignItems: 'center',
  justifyContent: 'center',
},
slotText: {
  fontSize: 13,
  fontWeight: '500',
},

});
