import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Typography} from '../../../Components/UI/Typography';
import {useIsFocused} from '@react-navigation/native';
import {GET_WITH_TOKEN} from '../../../Backend/Api';
import {ANALYTICS} from '../../../Constants/ApiRoute';

const MyAnalytics = ({navigation}) => {
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocus) {
      GET_WITH_TOKEN(
        ANALYTICS,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
          setData(success?.data)
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

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 15}}>
        {/* Performance Overview */}
        <View style={styles.card}>
          <Typography style={styles.sectionTitle}>
            Performance Overview
          </Typography>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FFEEF0', '#E6E6FA']}
            style={styles.statBox}>
            <Typography style={styles.amount}>{data?.revenue_this_month}</Typography>
            <Typography style={styles.label}>Revenue This Month</Typography>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FFEEF0', '#E6E6FA']}
            style={styles.statBox}>
              <Typography style={styles.amount}>{data?.total_customers}</Typography>
            <Typography style={styles.label}>Total Customers</Typography>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FFEEF0', '#E6E6FA']}
            style={styles.statBox}>
            <Typography style={styles.amount}>{data?.reach}↑</Typography>
            <Typography style={styles.label}>Reach (vs. Last Month)</Typography>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FFEEF0', '#E6E6FA']}
            style={styles.statBox}>
            <Typography style={styles.amount}>{data?.estimated_footfall}</Typography>
            <Typography style={styles.label}>Estimated Footfall</Typography>
          </LinearGradient>
        </View>

        {/* Promotion Card */}
        <View style={styles.card}>
          <Typography style={styles.sectionTitle}>
            Promote Your Business
          </Typography>
          <View style={styles.promoBox}>
            <Typography style={styles.promoText}>
              Increase Profile Visibility{'\n'}Get noticed by more customers.
            </Typography>
            <TouchableOpacity
              style={styles.boostBtn}
              onPress={() => {
                navigation.navigate('BoostProfile');
              }}>
              <Typography style={styles.boostText}>Boost Profile</Typography>
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
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: COLOR.lavender,
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
