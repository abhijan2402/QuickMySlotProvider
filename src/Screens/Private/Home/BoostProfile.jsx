import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import CustomButton from '../../../Components/CustomButton';

const BoostProfile = ({navigation}) => {
  const boosts = [
    {
      id: 1,
      title: 'Basic Visibility Boost',
      desc: 'Appear higher in search results for 7 days.',
      price: 25,
    },
    {
      id: 2,
      title: 'Featured Listing (Weekly)',
      desc: 'Highlighted spot on category pages for 7 days.',
      price: 75,
    },
    {
      id: 3,
      title: 'Homepage Banner Ad (Weekly)',
      desc: 'Prominent banner on app homepage for 7 days.',
      price: 120,
    },
    {
      id: 4,
      title: 'No Promotion',
      desc: 'Continue with standard visibility.',
      price: 0,
    },
  ];

  const [selected, setSelected] = useState(boosts[0]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Boost Your Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <ScrollView contentContainerStyle={{padding: 15}}>
        {/* Boost Options */}
        <Text style={styles.sectionTitle}>Choose Plan</Text>

        {boosts.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.boostCard,
              selected?.id === item.id && styles.selectedBoost,
            ]}
            onPress={() => setSelected(item)}>
            <View style={styles.radioCircle}>
              {selected?.id === item.id && <View style={styles.radioDot} />}
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.boostTitle}>{item.title}</Text>
              <Text style={styles.boostDesc}>{item.desc}</Text>
            </View>

            <Text style={styles.boostPrice}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}

        {/* Order Summary */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>{selected?.title}</Text>
            <Text style={styles.summaryText}>
              ${selected?.price.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, {fontWeight: 'bold'}]}>
              Total:
            </Text>
            <Text style={[styles.summaryText, {fontWeight: 'bold'}]}>
              ${selected?.price.toFixed(2)}
            </Text>
          </View>
        </View>
        {/* Checkout Button */}
        {/* <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity> */}
      </ScrollView>
      <CustomButton title={'Checkout'} style={{marginBottom: 50}} />
    </View>
  );
};

export default BoostProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
    color: COLOR.black,
  },
  boostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    padding: 12,
    marginBottom: 10,
  },
  selectedBoost: {
    borderColor: COLOR.primary,
    backgroundColor: '#f4e9ff',
  },
  boostTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.black,
  },
  boostDesc: {
    fontSize: 12,
    color: COLOR.darkGrey,
    marginTop: 2,
  },
  boostPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.primary,
    marginLeft: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLOR.primary,
  },
  summaryBox: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    padding: 15,
    marginTop: 15,
  },
  summaryTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 10,
    color: COLOR.black,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 13,
    color: COLOR.black,
  },
  divider: {
    height: 1,
    backgroundColor: COLOR.lightGrey,
    marginVertical: 8,
  },
  checkoutBtn: {
    backgroundColor: COLOR.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutText: {
    color: COLOR.white,
    fontWeight: '600',
    fontSize: 15,
  },
});
