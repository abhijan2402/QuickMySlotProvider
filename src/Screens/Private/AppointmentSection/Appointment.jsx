import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import HomeHeader from '../../../Components/HomeHeader';
import {COLOR} from '../../../Constants/Colors';

const VendorAppointments = () => {
  const [tab, setTab] = useState('Upcoming');

  const appointments = [
    {
      id: '1',
      customerName: 'Ravi Sharma',
      customerPhone: '9876543210',
      customerAddress: '123, MG Road, Jaipur',
      services: [
        {name: 'Bridal Makeup', price: '₹3000'},
        {name: 'Hair Styling', price: '₹500'},
      ],
      date: 'Aug 20, 2025',
      time: '3:00 PM',
      duration: '2 hrs',
      status: 'Upcoming',
    },
    {
      id: '2',
      customerName: 'Priya Mehta',
      customerPhone: '9123456780',
      customerAddress: '22, Malviya Nagar, Delhi',
      services: [{name: 'Hair Spa', price: '₹1200'}],
      date: 'Aug 15, 2025',
      time: '1:00 PM',
      duration: '1 hr',
      status: 'Past',
    },
  ];

  const filteredAppointments = appointments.filter(item => item.status === tab);

  const renderCard = ({item}) => {
    const totalPrice = item.services.reduce(
      (sum, s) => sum + parseInt(s.price.replace('₹', '')),
      0,
    );

    return (
      <View style={styles.card}>
        {/* Customer Info */}
        <Text style={styles.sectionTitle}>👤 Customer Details</Text>
        <Text style={styles.infoText}>Name: {item.customerName}</Text>
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL(`tel:${item.customerPhone}`)}>
          📞 {item.customerPhone}
        </Text>
        <Text style={styles.infoText}>📍 {item.customerAddress}</Text>

        <View style={styles.divider} />

        {/* Services */}
        <Text style={styles.sectionTitle}>💇 Services Booked</Text>
        {item.services.map((s, index) => (
          <Text key={index} style={styles.infoText}>
            • {s.name} - {s.price}
          </Text>
        ))}
        <Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text>

        <View style={styles.divider} />

        {/* Booking Details */}
        <Text style={styles.sectionTitle}>🗓 Booking Details</Text>
        <Text style={styles.infoText}>
          Date & Time: {item.date}, {item.time}
        </Text>
        <Text style={styles.infoText}>Duration: {item.duration}</Text>

        {/* Actions */}
        {tab === 'Upcoming' && (
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.acceptBtn}>
              <Text style={styles.actionText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectBtn}>
              <Text style={styles.actionText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}

        {tab === 'Past' && (
          <TouchableOpacity style={styles.feedbackBtn}>
            <Text style={styles.feedbackText}>✍️ Give Feedback</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Appointments"
        leftTint={COLOR.black}
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
      />

      {/* Tabs */}
      <View style={styles.tabRow}>
        {['Upcoming', 'Past'].map(label => (
          <TouchableOpacity
            key={label}
            style={[
              styles.tabButton,
              tab === label && {backgroundColor: COLOR.primary},
            ]}
            onPress={() => setTab(label)}>
            <Text
              style={[
                styles.tabText,
                {color: tab === label ? COLOR.white : COLOR.black},
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filteredAppointments}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default VendorAppointments;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 15},
  tabRow: {flexDirection: 'row', marginVertical: 15, justifyContent: 'center'},
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
  },
  tabText: {fontSize: 14, fontWeight: '600'},
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {fontSize: 14, fontWeight: '700', marginBottom: 4},
  infoText: {fontSize: 13, color: '#333', marginBottom: 2},
  linkText: {
    fontSize: 13,
    color: COLOR.primary,
    textDecorationLine: 'underline',
    marginBottom: 2,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
    color: '#222',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    marginRight: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: '#C62828',
    paddingVertical: 10,
    marginLeft: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {color: COLOR.white, fontWeight: '600'},
  feedbackBtn: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.primary,
    alignItems: 'center',
  },
  feedbackText: {color: COLOR.primary, fontWeight: '600'},
});
