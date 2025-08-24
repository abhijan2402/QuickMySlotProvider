import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';

const MyAnalytics = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Analytics & Promotion"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <ScrollView contentContainerStyle={{padding: 15}}>
        {/* Performance Overview */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>

          <View style={styles.statBox}>
            <Text style={styles.amount}>$1200.00</Text>
            <Text style={styles.label}>Revenue This Month</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.amount}>150</Text>
            <Text style={styles.label}>Total Customers</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.amount}>5% ↑</Text>
            <Text style={styles.label}>Reach (vs. Last Month)</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.amount}>50 / Day</Text>
            <Text style={styles.label}>Estimated Footfall</Text>
          </View>
        </View>

        {/* Promotion Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Promote Your Business</Text>

          <View style={styles.promoBox}>
            <Text style={styles.promoText}>
              Increase Profile Visibility{'\n'}Get noticed by more customers.
            </Text>

            <TouchableOpacity
              style={styles.boostBtn}
              onPress={() => {
                navigation.navigate('BoostProfile');
              }}>
              <Text style={styles.boostText}>Boost Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyAnalytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
    color: COLOR.black,
  },
  statBox: {
    backgroundColor: '#a98dd9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  amount: {
    color: COLOR.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: COLOR.white,
    fontSize: 12,
    marginTop: 4,
  },
  promoBox: {
    backgroundColor: COLOR.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  promoText: {
    color: COLOR.white,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  boostBtn: {
    backgroundColor: COLOR.white,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  boostText: {
    color: COLOR.primary,
    fontWeight: '600',
  },
});
