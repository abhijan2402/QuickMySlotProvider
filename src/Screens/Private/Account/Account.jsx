import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import HomeHeader from '../../../Components/HomeHeader';
import CustomButton from '../../../Components/CustomButton';
import ConfirmModal from '../../../Components/UI/ConfirmModel';
import { AuthContext } from '../../../Backend/AuthContent';
import { COLOR } from '../../../Constants/Colors';
import { Typography } from '../../../Components/UI/Typography';
import { useIsFocused } from '@react-navigation/native';
import { GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../Backend/Api';
import {
  ANALYTICS,
  DELETE_ACCOUNT,
  GET_CURRENT_MEMBERSHIP,
} from '../../../Constants/ApiRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, Token, userDetails } from '../../../Redux/action';
import { Font } from '../../../Constants/Font';
import { cleanImageUrl } from '../../../Backend/Utility';

const Account = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userdata = useSelector(store => store.userDetails);
  console.log(userdata, 'PPPPPPPPPPPP---->>>');
  const token = useSelector(store => store.Token);
  console.log(token, 'tokenuuuuuuu---->>>');
  const dispatch = useDispatch();
  const [membership, setMembership] = useState();

  useEffect(() => {
    if (isFocus) {
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
        setMembership(success?.subscription);
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
  const handleDeleteAccount = () => {
    setLoading(true);
    POST_WITH_TOKEN(
      DELETE_ACCOUNT,
      {},
      success => {
        console.log(success, 'successsuccesssuccess-->>>');
        setLoading(false);
        handleLogout();
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

  const handleLogout = () => {
    setVisible(false);
    dispatch(Token(''));
    dispatch(userDetails(''));
    dispatch(isAuth(false));
    console.log('User logged out');
  };

  const profileImage = userdata?.image
    ? userdata?.image
    : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  const arrowIcon = 'https://cdn-icons-png.flaticon.com/128/2989/2989988.png';

  const tabs = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: 'https://cdn-icons-png.flaticon.com/128/1077/1077114.png',
      navigate: 'EditProfile',
    },
    {
      id: 2,
      title: 'QuickMySlot Wallet',
      icon: 'https://cdn-icons-png.flaticon.com/128/60/60484.png',
      navigate: 'Wallet',
    },
    {
      id: 3,
      title: 'Terms & Conditions',
      icon: 'https://cdn-icons-png.flaticon.com/128/10349/10349031.png',
      navigate: 'Cms',
      params: {
        title: `Terms & Conditions`,
        slug: 'terms-condition',
      },
    },
    {
      id: 14,
      title: 'Appointments',
      icon: 'https://cdn-icons-png.flaticon.com/128/7322/7322293.png',
      navigate: 'Appointment',

    },
    {
      id: 4,
      title: 'Privacy Policy',
      icon: 'https://cdn-icons-png.flaticon.com/128/10348/10348823.png',
      navigate: 'Cms',
      params: {
        title: `Privacy Policy`,
        slug: 'privacy-policy',
      },
    },
    {
      id: 5,
      title: 'Account Managment',
      icon: 'https://cdn-icons-png.flaticon.com/128/66/66455.png',
      navigate: 'BankDetails',
    },
    {
      id: 6,
      title: 'About Us',
      icon: 'https://cdn-icons-png.flaticon.com/128/1/1176.png',
      navigate: 'Cms',
      params: {
        title: `About Us`,
        slug: 'about-us',
      },
    },
    {
      id: 7,
      title: 'Support',
      icon: 'https://cdn-icons-png.flaticon.com/128/4460/4460756.png',
      navigate: 'Support',
    },
    {
      id: 8,
      title: 'FAQ',
      icon: 'https://cdn-icons-png.flaticon.com/128/1660/1660165.png',
      navigate: 'Faq',
    },
  ];

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: cleanImageUrl(profileImage) }}
            style={styles.profileImage}
          />
          <Typography font={Font.semibold} variant="h2" color={COLOR.black}>
            {userdata?.name}
          </Typography>
          <Typography font={Font.semibold} variant="body2" color={COLOR.GRAY}>
            {userdata?.email || userdata?.phone_number}
          </Typography>
        </View>

        {/* Plan Card */}
        <View style={styles.tabContainer}>
          <View style={styles.tabContainer}>
            {membership?.subscription ? (
              <View style={styles.planCard}>
                <Text style={styles.planTitle}>⭐ Current Plan</Text>
                <Text style={styles.planName}>
                  {membership.subscription.subscription_name}
                </Text>
                <Text style={styles.planDesc}>
                  {membership.subscription.description}
                </Text>
                <Text style={styles.planPrice}>
                  ₹{membership.subscription.price}
                </Text>

                <TouchableOpacity
                  style={styles.upgradeBtn}
                  onPress={() => navigation.navigate('BoostProfile')}>
                  <Text style={styles.upgradeText}>Upgrade Your Plan</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.planCard}>
                <Text style={styles.planTitle}>🚀 Boost Your Profile</Text>
                <Text style={styles.planDesc}>
                  Stand out and get more visibility! Purchase a plan to boost
                  your profile.
                </Text>
                <TouchableOpacity
                  style={styles.upgradeBtn}
                  onPress={() => navigation.navigate('BoostProfile')}>
                  <Text style={styles.upgradeText}>Purchase Plan</Text>
                </TouchableOpacity>
              </View>

            )}
          </View>

          {/* Tabs */}
          {tabs.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(item.navigate, item.params)}>
              <View style={styles.tabLeft}>
                <Image source={{ uri: item.icon }} style={styles.leftIcon} />
                <Typography
                  variant="body1"
                  color={COLOR.black}
                  font={Font.semibold}>
                  {item.title}
                </Typography>
              </View>
              <Image source={{ uri: arrowIcon }} style={styles.arrowIcon} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout / Delete */}
        <CustomButton
          title={'Log Out'}
          style={{ marginTop: 20 }}
          onPress={() => {
            setVisible(true);
          }}
        />
        <CustomButton
          textStyle={{ color: COLOR.red }}
          title={'Delete Account'}
          style={{
            marginTop: '5%',
            backgroundColor: COLOR.white,
            borderWidth: 1,
            borderColor: COLOR.red,
          }}
          onPress={() => setDeleteAccount(true)}
        />
      </ScrollView>

      {/* Confirm Modals */}
      <ConfirmModal
        visible={visible}
        close={() => setVisible(false)}
        title="Logout"
        description="Are you sure you want to logout?"
        yesTitle="Yes"
        noTitle="No"
        onPressYes={handleLogout}
        onPressNo={() => setVisible(false)}
      />
      <ConfirmModal
        visible={deleteAccount}
        close={() => setDeleteAccount(false)}
        title="Delete Account"
        description="Are you sure you want to Delete Account?"
        yesTitle="Yes"
        noTitle="No"
        loading={loading}
        onPressYes={() => handleDeleteAccount()}
        onPressNo={() => setDeleteAccount(false)}
      />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: COLOR.white,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  tabContainer: {
    marginTop: 20,
    backgroundColor: COLOR.white,
  },
  tabItem: {
    backgroundColor: COLOR.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: COLOR.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: COLOR.primary,
  },
  tabLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 12,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: COLOR.black,
  },
  planCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 5
  },
  planTitle: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: '#888',
    marginBottom: 8,
  },
  planName: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: '#222',
    marginBottom: 6,
  },
  planDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: Font.medium,
  },
  planPrice: {
    fontSize: 22,
    fontFamily: Font.bold,
    color: COLOR.primary,
    marginBottom: 10,
  },
  upgradeBtn: {
    backgroundColor: COLOR.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  upgradeText: {
    fontSize: 16,
    fontFamily: Font.medium,

    color: '#fff',
  },
});
