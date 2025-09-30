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
import {Typography} from '../../../Components/UI/Typography';
import {useIsFocused} from '@react-navigation/native';
import {
  GET_CURRENT_MEMBERSHIP,
  MEMBERSHIP_CREATE_ORDER,
  MEMBERSHIP_VERIFY_PAYMENT,
  SUBSCRIPTION,
} from '../../../Constants/ApiRoute';
import {GET_WITH_TOKEN, POST_FORM_DATA} from '../../../Backend/Api';
import {Font} from '../../../Constants/Font';
import {ToastMsg} from '../../../Backend/Utility';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';

const BoostProfile = ({navigation}) => {
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selected, setSelected] = useState();
  console.log(selected);
  const [currentPlan, setCurrentPlan] = useState();

  const userdata = useSelector(store => store.userDetails);
  const razorpayConfig = {
    key_id: 'rzp_test_RL1gmdHRZxYSlx',
    currency: 'INR',
    name: 'QuickMySlot',
    description: 'Membership Subscription',
  };

  useEffect(() => {
    setLoading(true);
    if (isFocus) {
      GET_WITH_TOKEN(
        SUBSCRIPTION,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
          setSubscription(success.data);
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
      GetMembership();
    }
  }, [isFocus]);
  const GetMembership = () => {
    setLoading(true);
    GET_WITH_TOKEN(
      GET_CURRENT_MEMBERSHIP,
      success => {
        console.log(success, 'successsuccesssuccess-->>>');
        setLoading(false);
        setSelected(success?.subscription?.subscription);
        setCurrentPlan(success?.subscription);
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
  };

  const createRazorpayOrder = async subscription_id => {
    try {
      const formData = new FormData();
      formData.append('subscription_id', subscription_id);
      formData.append('role', 'vendor');

      const orderResponse = await new Promise((resolve, reject) => {
        POST_FORM_DATA(
          MEMBERSHIP_CREATE_ORDER,
          formData,
          success => {
            console.log('Order creation success:', success);
            resolve(success);
          },
          error => {
            console.log('Order creation error:', JSON.stringify(error));
            reject(error);
          },
          fail => {
            console.log('Order creation fail:', fail);
            reject(fail);
          },
        );
      });

      return orderResponse;
    } catch (error) {
      console.log('Order creation exception:', error);
      throw new Error('Failed to create order: ' + error.message);
    }
  };

  const verifyPayment = (paymentData, plan) => {
    console.log(plan, 'plan in verify payment');
    const formData = new FormData();
    formData.append('subscription_id', plan?.id);
    formData.append('razorpay_signature', paymentData?.razorpay_signature);
    formData.append('razorpay_order_id', paymentData?.razorpay_order_id);
    formData.append('razorpay_payment_id', paymentData?.razorpay_payment_id);
    POST_FORM_DATA(
      MEMBERSHIP_VERIFY_PAYMENT,
      formData,
      success => {
        setPaymentLoading(false);
        ToastMsg('Membership subscription successful!');
      },
      error => {
        console.log(error, 'Membership verification error>>');

        setPaymentLoading(false);
        ToastMsg('Payment verification failed. Please contact support.');
      },
      fail => {
        setPaymentLoading(false);
        ToastMsg('Network error. Please try again.');
      },
    );
  };

  const initiateRazorpayPayment = async plan => {
    console.log(plan, 'kkkkkk');

    setPaymentLoading(true);
    try {
      // Step 1: Create Razorpay order on your backend
      const orderData = await createRazorpayOrder(plan?.id);

      // Check the response structure
      const orderId =
        orderData?.order_id || orderData?.data?.order_id || orderData?.data?.id;
      console.log(orderId, 'llllllllllllhjg');

      if (!orderId) {
        console.log('Order data received:', orderData);
        throw new Error(
          'Failed to create payment order - no order ID received',
        );
      }

      // Convert price to paise (Razorpay expects amount in smallest currency unit)
      const amountInPaise = Math.round(parseFloat(plan.price) * 100);

      // Step 2: Initialize Razorpay checkout
      const options = {
        description: `Membership: ${plan.subscription_name}`,
        image: 'https://your-app-logo.png', // Your app logo
        currency: razorpayConfig.currency,
        key: razorpayConfig.key_id,
        amount: amountInPaise,
        name: razorpayConfig.name,
        order_id: orderId,
        prefill: {
          email: userdata?.email || 'user@example.com',
          contact: userdata?.phone_number || '9999999999',
          name: userdata?.name || 'User',
        },
        theme: {color: COLOR.primary},
      };

      console.log('Razorpay options:', options);

      // Step 3: Open Razorpay checkout
      RazorpayCheckout.open(options)
        .then(data => {
          // Payment successful
          console.log('Payment Success:', data);

          // Step 4: Verify payment on your backend
          verifyPayment(
            {
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id,
              razorpay_signature: data.razorpay_signature,
            },
            plan,
          );
        })
        .catch(error => {
          setPaymentLoading(false);
          console.log('Razorpay Payment Error:', error);

          // Handle different error cases
          if (error.code === 2) {
            // Payment cancelled by user
            ToastMsg('Payment was cancelled');
          } else if (error.code === 0) {
            // Network error
            ToastMsg('Network error. Please check your connection.');
          } else {
            // Other errors
            ToastMsg(error.description || 'Payment failed. Please try again.');
          }
        });
    } catch (error) {
      setPaymentLoading(false);
      console.log('Razorpay Init Error:', error);
      ToastMsg(
        error.message || 'Failed to initialize payment. Please try again.',
      );
    }
  };

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
        <Button
          title={'Checkout'}
          onPress={() => {
            const samePlan = selected?.id === currentPlan?.subscription?.id;
            if (samePlan) {
              ToastMsg('You are already subscribed to this plan');
            } else {
              initiateRazorpayPayment(selected);
            }
          }}
          loading={paymentLoading}
        />
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
