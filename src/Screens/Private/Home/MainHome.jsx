import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import React from 'react';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';

const MainHome = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Dashboard"
        rightIcon={'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'}
        rightTint={COLOR.black}
        style={{paddingHorizontal: 15}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        {/* Salon Card */}
        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://explorerresearch.com/wp-content/uploads/2022/07/luxury-brand-retail-store-design-1.jpg',
            }}
            style={styles.cardIcon}
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.cardTitle}>Glamour Touch Salon</Text>
            <Text style={styles.cardSub}>John Doe | +1 (555) 123-4567</Text>
            <Text style={styles.cardSub}>
              123 main Street., Anytown, CA 90210
            </Text>
          </View>
        </View>

        {/* Upcoming Booking Section */}
        <View style={styles.bookingContainer}>
          <Text style={styles.sectionTitle}>Upcoming Booking</Text>

          <View style={styles.bookingCard}>
            <View style={styles.bookingRow}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/3641/3641838.png',
                }}
                style={styles.customerImg}
              />
              <View style={{flex: 1, marginLeft: 12}}>
                <Text style={styles.customerName}>Jane Smith</Text>
                <Text style={styles.bookingDetail}>Service: Hair Styling</Text>
                <Text style={styles.bookingDetail}>
                  Time: 18 Aug, 3:00 PM - 4:00 PM
                </Text>
                <Text style={styles.bookingPrice}>₹1200</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Grid Menu */}
        <View style={styles.grid}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Appointment');
            }}
            style={styles.gridItem}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/747/747310.png',
              }}
              style={styles.gridIcon}
            />
            <Text style={styles.gridText}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => {
              navigation.navigate('MyAnalytics');
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828911.png',
              }}
              style={styles.gridIcon}
            />
            <Text style={styles.gridText}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => {
              navigation.navigate('Promotion');
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828961.png',
              }}
              style={styles.gridIcon}
            />
            <Text style={styles.gridText}>Promotions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => {
              navigation.navigate('ManageServices');
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524659.png',
              }}
              style={styles.gridIcon}
            />
            <Text style={styles.gridText}>Manage Services</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.bannerWrapper}
          onPress={() => {
            Linking.openURL('https://quick-my-slot-prov-web.vercel.app/');
          }}>
          <Image
            source={{
              uri: 'https://img.freepik.com/premium-vector/beauty-salon-banner-template_23-2148614461.jpg',
            }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: '#a58de4',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  cardIcon: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.white,
  },
  cardSub: {
    fontSize: 13,
    color: COLOR.white,
    marginTop: 3,
  },
  bookingContainer: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: '#f8f6ff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLOR.black,
  },
  bookingDetail: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7B5CFA',
    marginTop: 4,
  },
  viewButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
    backgroundColor: '#7B5CFA',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  viewButtonText: {
    color: COLOR.white,
    fontSize: 13,
    fontWeight: '500',
  },
  grid: {
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#f5f3ff',
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  gridIcon: {
    width: 28,
    height: 28,
    tintColor: '#7B5CFA',
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.black,
  },
  bannerWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
});
