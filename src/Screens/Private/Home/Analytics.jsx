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
import LinearGradient from 'react-native-linear-gradient';

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

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FFEEF0', '#E6E6FA']} // light pink to lavender
            style={styles.statBox}>
            <Text style={styles.amount}>$1200.00</Text>
            <Text style={styles.label}>Revenue This Month</Text>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FFEEF0', '#E6E6FA']} // light pink to lavender
            style={styles.statBox}>
            {' '}
            <Text style={styles.amount}>150</Text>
            <Text style={styles.label}>Total Customers</Text>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FFEEF0', '#E6E6FA']} // light pink to lavender
            style={styles.statBox}>
            <Text style={styles.amount}>5% ↑</Text>
            <Text style={styles.label}>Reach (vs. Last Month)</Text>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FFEEF0', '#E6E6FA']} // light pink to lavender
            style={styles.statBox}>
            <Text style={styles.amount}>50 / Day</Text>
            <Text style={styles.label}>Estimated Footfall</Text>
          </LinearGradient>
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
    borderColor: COLOR.lavender,
    marginBottom: 15,
    // elevation: 10,
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
    color: COLOR.deepPurple,
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: COLOR.grey,
    fontSize: 12,
    marginTop: 4,
  },
  promoBox: {
    backgroundColor: COLOR.lavender,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  promoText: {
    color: COLOR.black,
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
