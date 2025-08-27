import React, {useContext, useState} from 'react';
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
import {AuthContext} from '../../../Backend/AuthContent';
import {COLOR} from '../../../Constants/Colors';
import {Typography} from '../../../Components/UI/Typography';

const Account = ({navigation}) => {
  const {setUser} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const handleLogout = () => {
    setVisible(false);
    console.log('User logged out');
  };

  const profileImage =
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  const arrowIcon = 'https://cdn-icons-png.flaticon.com/512/271/271228.png';

  const tabs = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: 'https://cdn-icons-png.flaticon.com/512/2922/2922561.png',
      navigate: 'EditProfile',
    },
    {
      id: 7,
      title: 'QuickMySlot Wallet',
      icon: 'https://cdn-icons-png.flaticon.com/128/3258/3258446.png',
      navigate: 'Wallet',
    },
    {
      id: 3,
      title: 'Terms & Conditions',
      icon: 'https://cdn-icons-png.flaticon.com/128/1458/1458279.png',
      navigate: 'Cms',
      params: {
        title: `Terms & Conditions`,
        slug: 'terms-condition',
      },
    },
    {
      id: 7,
      title: 'Account Managment',
      icon: 'https://cdn-icons-png.flaticon.com/128/3258/3258446.png',
      navigate: 'BankDetails',
    },
    {
      id: 4,
      title: 'About Us',
      icon: 'https://cdn-icons-png.flaticon.com/128/16343/16343680.png',
      navigate: 'Cms',
      params: {
        title: `About Us`,
        slug: 'about-us',
      },
    },
    {
      id: 5,
      title: 'Support',
      icon: 'https://cdn-icons-png.flaticon.com/128/8898/8898827.png',
      navigate: 'Support',
    },
    {
      id: 6,
      title: 'Change Password',
      icon: 'https://cdn-icons-png.flaticon.com/128/11135/11135307.png',
      navigate: 'ForgotPassword',
    },
    {
      id: 7,
      title: 'FAQ',
      icon: 'https://cdn-icons-png.flaticon.com/128/4403/4403603.png',
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

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{uri: profileImage}} style={styles.profileImage} />
        <Typography variant="h2" color={COLOR.black}>
          John Doe
        </Typography>
        <Typography variant="body2" color={COLOR.GRAY}>
          john@example.com
        </Typography>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        {/* Plan Card */}
        <View style={styles.tabContainer}>
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>⭐ Current Plan</Text>
            <Text style={styles.planName}>Basic Visibility Boost</Text>{' '}
            <Text style={styles.planDesc}>
              Appear higher in search results for 7 days.
            </Text>
            <Text style={styles.planPrice}>$25.00</Text>{' '}
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => navigation.navigate('BoostProfile')}>
              <Text style={styles.upgradeText}>Upgrade Your Plan</Text>
            </TouchableOpacity>
          </View>
          {/* Tabs */}
          {tabs.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(item.navigate, item.params)}>
              <View style={styles.tabLeft}>
                <Image source={{uri: item.icon}} style={styles.leftIcon} />
                <Typography variant="body1" color={COLOR.black}>
                  {item.title}
                </Typography>
              </View>
              <Image source={{uri: arrowIcon}} style={styles.arrowIcon} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout / Delete */}
        <CustomButton
          title={'Log Out'}
          style={{marginTop: 20}}
          onPress={() => setVisible(true)}
        />
        <CustomButton
          textStyle={{color: COLOR.red}}
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
        onPressYes={handleLogout}
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
    tintColor: '#999',
  },
  planCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  planDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E86DE',
    marginBottom: 10,
  },
  upgradeBtn: {
    backgroundColor: '#2E86DE',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
