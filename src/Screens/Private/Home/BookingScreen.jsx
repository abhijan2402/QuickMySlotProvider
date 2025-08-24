import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import CustomButton from '../../../Components/CustomButton';
import {windowHeight, windowWidth} from '../../../Constants/Dimensions';

const BookingScreen = ({navigation}) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(27);
  const [selectedTime, setSelectedTime] = useState(null);

  const services = [
    {
      id: 1,
      name: 'Haircut & Styling',
      price: 45,
      details: 'Includes wash, cut and blow-dry\nApproxs 45 mins',
    },
    {
      id: 2,
      name: 'Haircut & Styling',
      price: 45,
      details: 'Includes wash, cut and blow-dry\nApprox 45 mins',
    },
    {
      id: 3,
      name: 'Hair Coloring',
      price: 45,
      details: 'Includes wash, color and blow-dry\nApprox 2 Hours',
    },
  ];

  const dates = [
    {day: 27, label: 'Fri'},
    {day: 28, label: 'Sat'},
    {day: 29, label: 'Sun'},
    {day: 30, label: 'Mon'},
    {day: 31, label: 'Tue'},
  ];

  const times = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
  ];

  const toggleService = id => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Available Services"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.primary}
        onLeftPress={() => navigation.goBack()}
      />

      <View
        style={{
          height: windowHeight / 1.2,
        }}
        showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Salon Card */}
          <View style={styles.salonCard}>
            <Text style={styles.salonName}>Glamour Touch Salon</Text>
            <Text style={styles.salonSubtitle}>Luxury salon services</Text>
          </View>

          {/* Services */}
          <Text style={styles.sectionTitle}>Our Services</Text>
          {services.map(service => (
            <View style={styles.serviceCard} key={service.id}>
              <View style={{flex: 1}}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDetails}>{service.details}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.price}>${service.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={[
                    styles.addBtn,
                    selectedServices.includes(service.id) && styles.addedBtn,
                  ]}
                  onPress={() => toggleService(service.id)}>
                  <Text
                    style={[
                      styles.addBtnText,
                      selectedServices.includes(service.id) &&
                        styles.addedBtnText,
                    ]}>
                    {selectedServices.includes(service.id) ? 'Added' : 'Add'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Date Selector */}
          <Text style={styles.sectionTitle}>Choose date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dateRow}>
            {dates.map(d => (
              <TouchableOpacity
                key={d.day}
                style={[
                  styles.dateBox,
                  selectedDate === d.day && styles.selectedDateBox,
                ]}
                onPress={() => setSelectedDate(d.day)}>
                <Text
                  style={[
                    styles.dateDay,
                    selectedDate === d.day && styles.selectedDateText,
                  ]}>
                  {d.day}
                </Text>
                <Text
                  style={[
                    styles.dateLabel,
                    selectedDate === d.day && styles.selectedDateText,
                  ]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Time Selector */}
          <Text style={styles.sectionTitle}>Choose time</Text>
          <View style={styles.timeGrid}>
            {times.map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeBox,
                  selectedTime === time && styles.selectedTimeBox,
                ]}
                onPress={() => setSelectedTime(time)}>
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <CustomButton
            title="Checkout"
            onPress={() => {
              navigation.navigate('Checkout');
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {textAlign: 'center', fontSize: 18, fontWeight: '600'},

  salonCard: {
    backgroundColor: COLOR.primary,
    padding: 15,
    borderRadius: 8,
    margin: 15,
  },
  salonName: {color: '#fff', fontSize: 16, fontWeight: '600'},
  salonSubtitle: {color: '#eee', fontSize: 14},

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
  },

  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  serviceName: {fontSize: 15, fontWeight: '600'},
  serviceDetails: {fontSize: 12, color: '#666', marginTop: 4},
  price: {fontSize: 14, fontWeight: '600', marginBottom: 8},
  addBtn: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: '#E1D9F8',
    borderRadius: 8,
  },
  addedBtn: {backgroundColor: '#C7E9C0'},
  addBtnText: {fontSize: 13, color: COLOR.primary},
  addedBtnText: {color: '#2E7D32'},

  dateRow: {paddingHorizontal: 15},
  dateBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  selectedDateBox: {backgroundColor: COLOR.primary},
  dateDay: {fontSize: 16, fontWeight: '600', color: '#333'},
  dateLabel: {fontSize: 12, color: '#666'},
  selectedDateText: {color: '#fff'},

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  timeBox: {
    backgroundColor: '#FCE4EC',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    width: windowWidth * 0.2,
    alignItems: 'center',
  },
  selectedTimeBox: {backgroundColor: COLOR.primary},
  timeText: {color: '#333', fontSize: 13},
  selectedTimeText: {color: '#fff'},

  checkoutBtn: {
    backgroundColor: COLOR.primary,
    margin: 15,
    paddingVertical: 14,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
