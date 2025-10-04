import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import {FlatList} from 'react-native';
import {Typography} from '../../../Components/UI/Typography';
import {useIsFocused} from '@react-navigation/native';
import {GET_WITH_TOKEN} from '../../../Backend/Api';
import {GET_APPOINTMENTS, GET_PROFILE} from '../../../Constants/ApiRoute';
import {useDispatch, useSelector} from 'react-redux';
import {userDetails} from '../../../Redux/action';
import {Font} from '../../../Constants/Font';
import {windowWidth} from '../../../Constants/Dimensions';
import {cleanImageUrl} from '../../../Backend/Utility';
import {images} from '../../../Components/UI/images';
import AppointmentCard from '../../../Components/UI/AppointmentCard';
import EmptyView from '../../../Components/UI/EmptyView';

const MainHome = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const userdata = useSelector(store => store.userDetails);
  const [loading, setLoading] = useState();
  const [Appointment, setAppointments] = useState([]);

  useEffect(() => {
    if (isFocus) {
      fetchUserProfile();
      GetServices();
    }
  }, [isFocus]);

  const GetServices = () => {
    setLoading(true);
    GET_WITH_TOKEN(
      GET_APPOINTMENTS,
      success => {
        setLoading(false);
        const allAppointments = success?.data || [];
        const filteredAppointments = allAppointments.filter(
          a => a.status === 'pending',
        );
        setAppointments(filteredAppointments);
      },
      error => {
        console.log(error, 'errorerrorerror>>');
        setLoading(false);
      },
      fail => {
        console.log(fail, 'failfailfail>>');
        setLoading(false);
      },
    );
  };

  global.fetchUserProfile = () => {
    GET_WITH_TOKEN(
      GET_PROFILE,
      success => {
        console.log(success, 'GET_PROFILE-->>>');
      },
      error => {
        console.log(error, 'errorerrorerror>>');
      },
      fail => {},
    );
  };

  const banners = [
    {
      id: '1',
      image:
        'https://img.freepik.com/premium-vector/beauty-salon-banner-template_23-2148614461.jpg',
      link: 'https://quick-my-slot-prov-web.vercel.app/',
    },
    {
      id: '2',
      image:
        'https://img.freepik.com/free-vector/spa-beauty-salon-horizontal-banners-set_1284-9915.jpg',
      link: 'https://example.com/another-banner',
    },
    {
      id: '3',
      image:
        'https://img.freepik.com/free-vector/barbershop-banner-template_23-2148614473.jpg',
      link: 'https://example.com/yet-another-banner',
    },
  ];

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.bannerWrapper]}
        onPress={() => Linking.openURL(item.link)}>
        <Image
          source={{uri: item?.image}}
          style={[styles.bannerImage, {width: width - 40}]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
          paddingHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              source={images.location}
              style={{height: 18, width: 18}}
              tintColor={COLOR.primary}
            />
          </View>
          <Typography
            size={16}
            font={Font.semibold}
            color={COLOR.primary}
            numberOfLines={1}
            style={{marginLeft: 8, width: windowWidth * 0.6}}>
            {userdata?.exact_location}
          </Typography>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification');
          }}
          style={{
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.primary,
            borderRadius: 50,
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10502/10502974.png',
            }}
            style={{height: 18, width: 18}}
            tintColor={COLOR.white}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        {/* Salon Card */}
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          style={styles.card}>
          <Image
            source={{
              uri: cleanImageUrl(userdata?.photo_verification),
            }}
            style={styles.cardIcon}
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <Typography style={styles.cardTitle}>
              {userdata?.business_name ||
                'Please provide your business Information'}
            </Typography>
            <Typography style={styles.cardSub}>
              {userdata?.name || 'Welcome'} | +91-{userdata?.phone_number}
            </Typography>
            <Typography style={styles.cardSub}>
              {userdata?.exact_location || ''}
            </Typography>
          </View>
        </TouchableOpacity>

        {/* Banner */}
        <View
          style={{
            backgroundColor: '#f5f3ff',
            marginTop: 20,
            marginHorizontal: 20,
            borderRadius: 12,
          }}>
          <FlatList
            ref={flatListRef}
            data={banners}
            scrollEnabled={false}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={e => {
              const offsetX = e.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / (width - 40));
              setCurrentIndex(index);
            }}
          />
        </View>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Grid Menu */}
        <View style={styles.grid}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Appointment')}
            style={styles.gridItem}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/747/747310.png',
              }}
              style={styles.gridIcon}
            />
            <Typography style={styles.gridText}>Appointments</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate('MyAnalytics')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828911.png',
              }}
              style={styles.gridIcon}
            />
            <Typography style={styles.gridText}>Analytics</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate('Promotion')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828961.png',
              }}
              style={styles.gridIcon}
            />
            <Typography style={styles.gridText}>Promotions</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate('ManageServices')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524659.png',
              }}
              style={styles.gridIcon}
            />
            <Typography style={styles.gridText}>Manage Services</Typography>
          </TouchableOpacity>
        </View>

        {/* Upcoming Booking Section */}
          <View style={styles.bookingContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Typography style={styles.sectionTitle}>
                Upcoming Booking
              </Typography>
             { Appointment.length > 0 && <Typography
                style={styles.sectionTitle}
                disabled={false}
                onPress={() => navigation.navigate('Appointment')}>
                View More
              </Typography>}
            </View>
            <FlatList
              data={Appointment.slice(0, 3)}
              renderItem={({item}) => {
                const scheduleEntries = item?.schedule_time
                  ? Object.entries(item.schedule_time)
                  : [];
                return (
                  <AppointmentCard
                    tab={'Upcoming'}
                    item={item}
                    onSuccess={() => GetServices()}
                  />
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <EmptyView title='No Appointment Yet' />
                )
              }}
            />
          </View>
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
    backgroundColor: COLOR.background,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  cardIcon: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Font.semibold,
    color: COLOR.black,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: COLOR.grey,
    marginTop: 3,
    fontFamily: Font.medium,
  },
  bookingContainer: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Font.semibold,
    color: COLOR.black,
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: COLOR.background,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
    margin: 1,
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
    fontFamily: Font.semibold,
    color: COLOR.black,
  },
  bookingDetail: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
    fontFamily: Font.medium,
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.primary,
    fontFamily: Font.semibold,
    marginTop: 4,
  },
  viewButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
    backgroundColor: COLOR.primary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  viewButtonText: {
    color: COLOR.white,
    fontSize: 13,
    fontFamily: Font.semibold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  gridItem: {
    width: '48%',
    backgroundColor: COLOR.background,
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  gridIcon: {
    width: 28,
    height: 28,
    tintColor: COLOR.primary,
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontFamily: Font.semibold,
    color: COLOR.black,
  },
  bannerWrapper: {
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  bannerImage: {
    height: 150,
    borderRadius: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingVertical: 6,
    alignSelf: 'center',
    borderRadius: 12,
    top: -40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLOR.primary,
    width: 10,
    height: 10,
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});
