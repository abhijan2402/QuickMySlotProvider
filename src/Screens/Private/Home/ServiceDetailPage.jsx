import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import CustomButton from '../../../Components/CustomButton';

const ProviderDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Provider Details"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.primary}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        {/* Image */}
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg',
          }}
          style={styles.mainImage}
        />

        {/* Provider Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Glamour Touch Salon</Text>
          <Text style={styles.detail}>123 Beauty Blvd, Anytown, CA 90210</Text>
          <Text style={styles.detail}>8 Years of Experience</Text>
          <Text style={styles.detail}>Available Mon-Sat, 9 AM - 4 PM</Text>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            Dr. Emily Carter is a highly experienced family physician dedicated
            to providing comprehensive healthcare for patients of all ages. She
            is known for her compassionate approach and commitment to preventive
            care.
          </Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationCard}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
              }}
              style={styles.locationIcon}
            />
            <View style={{flex: 1}}>
              <Text style={styles.locationName}>Care Medical Center</Text>
              <Text style={styles.locationAddress}>1284 W. Grey St, D1</Text>
            </View>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2989/2989988.png',
              }}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          title={'Checkout Services'}
          onPress={() => {
            navigation.navigate('BookingScreen');
          }}
          style={{margin: 15}}
        />
      </ScrollView>
    </View>
  );
};

export default ProviderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    // paddingHorizontal: 15,
  },
  mainImage: {
    width: '100%',
    height: 220,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: COLOR.white,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  detail: {
    fontSize: 13,
    color: '#555',
    marginTop: 3,
  },
  section: {
    padding: 15,
    backgroundColor: COLOR.white,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLOR.black,
  },
  sectionText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  locationIcon: {
    width: 22,
    height: 22,
    tintColor: COLOR.primary,
    marginRight: 10,
  },
  locationName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  locationAddress: {
    fontSize: 12,
    color: '#777',
  },
  arrowIcon: {
    width: 18,
    height: 18,
    tintColor: '#aaa',
  },
  checkoutBtn: {
    backgroundColor: '#7B5AF1',
    margin: 15,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: COLOR.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
