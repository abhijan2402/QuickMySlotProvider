import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { COLOR } from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../../Components/UI/Typography';
import { useIsFocused } from '@react-navigation/native';
import { GET_WITH_TOKEN } from '../../../Backend/Api';
import { ANALYTICS } from '../../../Constants/ApiRoute';
import { Font } from '../../../Constants/Font';

const MyAnalytics = ({ navigation }) => {
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocus) {
      setLoading(true);
      GET_WITH_TOKEN(
        ANALYTICS,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
          setData(success?.data);
        },
        error => {
          console.log(error, 'errorerrorerror>>');
          setLoading(false);
        },
        fail => {
          console.log(fail, 'errorerrorerror>>');
          setLoading(false);
        },
      );
    }
  }, [isFocus]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Analytics & Promotion"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLOR.primary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 15,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}>
          {/* Performance Overview */}
          <View style={[styles.card, styles.shadow]}>
            <Typography style={styles.sectionTitle}>
              Performance Overview
            </Typography>

            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#F3E5F5', '#E6E6FA']}
              style={[styles.statBox, styles.shadow]}>
              <Typography style={styles.amount}>
                ₹{data?.revenue_this_month || 0}
              </Typography>
              <Typography style={styles.label}>Revenue This Month</Typography>
            </LinearGradient>

            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#E8F5E9', '#D0F0C0']}
              style={[styles.statBox, styles.shadow]}>
              <Typography style={styles.amount}>
                {data?.total_customers || 0}
              </Typography>
              <Typography style={styles.label}>Total Customers</Typography>
            </LinearGradient>

            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#FFF3E0', '#FFE0B2']}
              style={[styles.statBox, styles.shadow]}>
              <Typography style={styles.amount}>
                {data?.reach ? `${data?.reach}↑` : '0'}
              </Typography>
              <Typography style={styles.label}>
                Reach (vs. Last Month)
              </Typography>
            </LinearGradient>

            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#E3F2FD', '#BBDEFB']}
              style={[styles.statBox, styles.shadow]}>
              <Typography style={styles.amount}>
                {data?.estimated_footfall || 0}
              </Typography>
              <Typography style={styles.label}>Estimated Footfall</Typography>
            </LinearGradient>
          </View>

          {/* Promotion Card */}
          <View style={[styles.card, styles.shadow]}>
            <Typography style={styles.sectionTitle}>
              Promote Your Business
            </Typography>
            <View style={[styles.promoBox, styles.shadow]}>
              <Typography style={styles.promoText}>
                Increase Profile Visibility{'\n'}Get noticed by more customers.
              </Typography>
              <TouchableOpacity
                style={[styles.boostBtn, styles.shadow]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('BoostProfile')}>
                <Typography style={styles.boostText}>Boost Profile</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyAnalytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 12,
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    marginBottom: 18,
  },
  sectionTitle: {
    fontFamily: Font.semibold,
    fontSize: 16,
    marginBottom: 12,
    color: COLOR.black,
  },
  statBox: {
    borderRadius: 10,
    // padding: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 70
  },
  amount: {
    color: COLOR.deepPurple,
    fontFamily: Font.semibold,
    fontSize: 17,
  },
  label: {
    color: COLOR.black,
    fontSize: 13,
    marginTop: 5,
    fontFamily: Font.medium,
  },
  promoBox: {
    backgroundColor: COLOR.lavender,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  promoText: {
    color: COLOR.black,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: Font.medium,
  },
  boostBtn: {
    backgroundColor: COLOR.white,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  boostText: {
    color: COLOR.primary,
    fontFamily: Font.semibold,
    fontSize: 14,
  },

  // ✅ Cross-platform shadow styling
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0.3,
    shadowRadius: 3.5,
    elevation: 3,
  },
});
