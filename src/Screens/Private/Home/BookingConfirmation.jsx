import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import CustomButton from '../../../Components/CustomButton';

const BookingConfirmation = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/5290/5290058.png',
          }}
          style={{width: 60, height: 60}}
        />
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subtitle}>
        Your appointment has been successfully booked and payment processed.
      </Text>

      {/* Price Details Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>$50.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tax (10%)</Text>
          <Text style={styles.value}>$5.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fees</Text>
          <Text style={styles.value}>$0.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, styles.totalLabel]}>Total</Text>
          <Text style={[styles.value, styles.totalValue]}>$55.00</Text>
        </View>
        {/* <View style={[styles.row, {marginTop: 10}]}>
          <Text style={styles.label}>Card</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: 'https://img.icons8.com/color/48/visa.png'}}
              style={{width: 30, height: 20, marginRight: 8}}
            />
            <Text style={styles.value}>****** 1234</Text>
          </View>
        </View> */}
      </View>

      {/* Feedback */}
      <Text style={styles.feedbackText}>How was your experience?</Text>
      <View style={styles.starContainer}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            // <Icon key={i} name="star" size={28} color="#ccc" />
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828970.png',
              }}
              key={i}
              style={{width: 28, height: 28, marginHorizontal: 2}}
            />
          ))}
      </View>

      <CustomButton
        title={'Back to Dashboard'}
        onPress={() => navigation.navigate('MainHome')}
        style={{marginBottom: 50}}
      />
    </View>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: 'green',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
    padding: 15,
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontWeight: 'bold',
    color: 'green',
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 10,
    color: '#333',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLOR.primary || '#7B61FF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
