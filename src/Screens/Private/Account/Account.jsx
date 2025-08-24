// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import Header from '../../../Components/FeedHeader';
// import HomeHeader from '../../../Components/HomeHeader';
// import {COLOR} from '../../../Constants/Colors';

// const Account = () => {
//   return (
//     <View>
//       <HomeHeader
//         title="Profile"
//         leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
//         leftTint={COLOR.black}
//       />
//     </View>
//   );
// };

// export default Account;

// const styles = StyleSheet.create({});

import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';
import CustomButton from '../../../Components/CustomButton';
import {AuthContext} from '../../../Backend/AuthContent';
import HomeHeader from '../../../Components/HomeHeader';

const Account = ({navigation}) => {
  const {setUser} = useContext(AuthContext);

  const profileImage =
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // default profile icon

  const arrowIcon = 'https://cdn-icons-png.flaticon.com/512/271/271228.png'; // right arrow icon

  const tabs = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: 'https://cdn-icons-png.flaticon.com/512/2922/2922561.png',
      navigate: 'EditProfile',
    },

    {
      id: 7,
      title: 'QucikMySlot Wallet',
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
      title: 'Invite family and Friends',
      icon: 'https://cdn-icons-png.flaticon.com/128/10206/10206656.png',
      navigate: 'Invite',
    },
    {
      id: 7,
      title: 'Change Password',
      icon: 'https://cdn-icons-png.flaticon.com/128/11135/11135307.png',
      navigate: 'ForgotPassword',
    },
    {
      id: 8,
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
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john@example.com</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(item.navigate, item.params)}>
              <View style={styles.tabLeft}>
                <Image source={{uri: item.icon}} style={styles.leftIcon} />
                <Text style={styles.tabText}>{item.title}</Text>
              </View>
              <Image source={{uri: arrowIcon}} style={styles.arrowIcon} />
            </TouchableOpacity>
          ))}
        </View>
        <CustomButton
          title={'Log Out'}
          style={{marginTop: '10%'}}
          onPress={() => {
            setUser('ABCC');
          }}
        />
        <CustomButton
          textStyle={{color: COLOR.primary}}
          title={'Delete Account'}
          style={{
            marginTop: '5%',
            backgroundColor: COLOR.white,
            borderWidth: 1,
            borderColor: COLOR.primary,
          }}
          onPress={() => {
            setUser('ABCC');
          }}
        />
      </ScrollView>
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
    backgroundColor: COLOR.white || '#f9f9f9',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  profileEmail: {
    fontSize: 14,
    color: COLOR.GRAY,
    marginTop: 4,
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
  tabText: {
    fontSize: 16,
    color: COLOR.black,
  },
});
