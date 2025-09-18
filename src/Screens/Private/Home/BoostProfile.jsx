import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import Button from '../../../Components/UI/Button';
import {Typography} from '../../../Components/UI/Typography'; // ✅ import Typography
import {useIsFocused} from '@react-navigation/native';
import {SUBSCRIPTION} from '../../../Constants/ApiRoute';
import {GET_WITH_TOKEN} from '../../../Backend/Api';
import {Font} from '../../../Constants/Font';

const BoostProfile = ({navigation}) => {
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (isFocus) {
      GET_WITH_TOKEN(
        SUBSCRIPTION,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
          setSubscription(success.data);

          // 👉 Auto select the first plan
          if (success.data?.length > 0) {
            setSelected(success.data[0]);
          }
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

  const [selected, setSelected] = useState(subscription[0]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Boost Your Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{marginTop: 20}}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{paddingVertical: 15, paddingHorizontal: 5}}>
          {/* Boost Options */}
          <Typography size={15} font={Font.medium} style={styles.sectionTitle}>
            Choose Plan
          </Typography>

          {subscription.map(item => (
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
                <Typography
                  size={16}
                  font={Font.semibold}
                  style={styles.boostTitle}>
                  {item.subscription_name}
                </Typography>
                <Typography
                  font={Font.medium}
                  size={12}
                  color={COLOR.darkGrey}
                  style={styles.boostDesc}>
                  {item.description}
                </Typography>
                <Typography
                  font={Font.medium}
                  size={12}
                  color={COLOR.darkGrey}
                  style={styles.boostDesc}>
                  Validity: {item.validity} days
                </Typography>
              </View>

              <Typography size={15} font={Font.semibold} color={COLOR.primary}>
                ₹{Number(item.price).toFixed(2)}
              </Typography>
            </TouchableOpacity>
          ))}

          {/* Order Summary */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Typography
                font={Font.medium}
                size={13}
                style={styles.summaryText}>
                {selected?.subscription_name}
              </Typography>
              <Typography
                font={Font.semibold}
                size={13}
                style={styles.summaryText}>
                ₹{Number(selected?.price || 0).toFixed(2)}
              </Typography>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Typography
                size={13}
                font={Font.medium}
                style={styles.summaryText}>
                Total:
              </Typography>
              <Typography
                size={13}
                font={Font.semibold}
                style={styles.summaryText}>
                ₹{Number(selected?.price || 0).toFixed(2)}
              </Typography>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Checkout Button */}
      <View style={{position: 'absolute', left: 20, right: 20, bottom: 10}}>
        <Button title={'Checkout'} onPress={() => navigation.goBack()} />
      </View>
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
    backgroundColor: '#f9f4ff',
  },
  boostTitle: {
    color: COLOR.black,
  },
  boostDesc: {
    marginTop: 5,
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
  },
  summaryText: {
    color: COLOR.black,
  },
  divider: {
    height: 1,
    backgroundColor: COLOR.lightGrey,
    marginVertical: 12,
  },
});
