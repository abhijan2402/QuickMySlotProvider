import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import Button from '../../../Components/UI/Button';
import {Typography} from '../../../Components/UI/Typography'; // ✅ import Typography

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

      <ScrollView contentContainerStyle={{paddingVertical: 15, paddingHorizontal: 5}}>
        {/* Boost Options */}
        <Typography size={15} fontWeight="600" style={styles.sectionTitle}>
          Choose Plan
        </Typography>

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
              <Typography size={14} fontWeight="600" style={styles.boostTitle}>
                {item.title}
              </Typography>
              <Typography size={12} color={COLOR.darkGrey} style={styles.boostDesc}>
                {item.desc}
              </Typography>
            </View>

            <Typography size={14} fontWeight="600" color={COLOR.primary} style={styles.boostPrice}>
              ${item.price.toFixed(2)}
            </Typography>
          </TouchableOpacity>
        ))}

        {/* Order Summary */}
        <View style={styles.summaryBox}>
          <Typography size={14} fontWeight="600" style={styles.summaryTitle}>
            Order Summary
          </Typography>

          <View style={styles.summaryRow}>
            <Typography size={13} style={styles.summaryText}>
              {selected?.title}
            </Typography>
            <Typography size={13} style={styles.summaryText}>
              ${selected?.price.toFixed(2)}
            </Typography>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Typography size={13} fontWeight="bold" style={styles.summaryText}>
              Total:
            </Typography>
            <Typography size={13} fontWeight="bold" style={styles.summaryText}>
              ${selected?.price.toFixed(2)}
            </Typography>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <Button title={'Checkout'} />
    </View>
  );
};

export default BoostProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
  },
  sectionTitle: {
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
    color: COLOR.black,
  },
  boostDesc: {
    marginTop: 2,
  },
  boostPrice: {
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
    marginBottom: 10,
    color: COLOR.black,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryText: {
    color: COLOR.black,
  },
  divider: {
    height: 1,
    backgroundColor: COLOR.lightGrey,
    marginVertical: 8,
  },
});
