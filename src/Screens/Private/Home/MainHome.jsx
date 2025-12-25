import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLOR } from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import { FlatList } from 'react-native';
import { Typography } from '../../../Components/UI/Typography';
import { useIsFocused } from '@react-navigation/native';
import { GET, GET_WITH_TOKEN, POST_FORM_DATA } from '../../../Backend/Api';
import { ADD_UPDATE_BID, BID_LIST, GET_APPOINTMENTS, GET_PROFILE, VENDOR_BANNER } from '../../../Constants/ApiRoute';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../../../Redux/action';
import { Font } from '../../../Constants/Font';
import { windowWidth } from '../../../Constants/Dimensions';
import { cleanImageUrl } from '../../../Backend/Utility';
import { images } from '../../../Components/UI/images';
import AppointmentCard from '../../../Components/UI/AppointmentCard';
import EmptyView from '../../../Components/UI/EmptyView';
import moment from 'moment';
import Button from '../../../Components/UI/Button';
import Chatbot from '../Dashboard/Chatbot';

const MainHome = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const AUTO_SCROLL_INTERVAL = 3000;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFocus = useIsFocused();
  const userdata = useSelector(store => store.userDetails);
  const [loading, setLoading] = useState();
  const [Appointment, setAppointments] = useState([]);
  const [bidList, setBidList] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bidValue, setBidValue] = useState('');

  const [banner, setBanner] = useState([])

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setBidValue(item?.won_entry?.amount ? String(item.won_entry.amount) : '');
    setIsModalVisible(true);
  };


  const handleUpdateBid = () => {
    const bid = parseFloat(bidValue);
    const wallet = parseFloat(userdata?.wallet || 0);

    if (!bid || isNaN(bid)) {
      Alert.alert('Invalid Bid', 'Please enter a valid bid amount.');
      return;
    }

    if (bid > wallet) {
      Alert.alert(
        'Insufficient Balance',
        `Your bid amount ₹${bid} exceeds your wallet balance of ₹${wallet}.`
      );
      return;
    }


    const formData = new FormData();
    formData.append('bid_id', selectedItem?.id);
    formData.append('amount', bid);

    setButtonLoading(true);
    POST_FORM_DATA(
      ADD_UPDATE_BID,
      formData,
      success => {
        setButtonLoading(false);
        Alert.alert(
          'Success',
          selectedItem?.won_entry ? 'Bid updated successfully!' : 'Bid placed successfully!'
        );
        fetchBidList();
      },
      error => {
        setButtonLoading(false);
        console.log(error, 'errorerrorerror>>');
        Alert.alert('Error', 'Failed to place/update bid. Please try again.');
        fetchBidList();
      },
      fail => {
        setButtonLoading(false);
        console.log(fail, 'failfailfail>>');
        Alert.alert('Error', 'Failed to place/update bid. Please try again.');
        fetchBidList();
      },
    );


    setIsModalVisible(false);
    setSelectedItem(null);
    setBidValue('');
  };



  useEffect(() => {
    if (isFocus) {
      fetchUserProfile();
      GetServices();
      GetBanner()
      fetchBidList();

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



  const GetBanner = () => {
    setLoading(true);
    GET(
      VENDOR_BANNER,
      success => {
        setLoading(false);
        // console.log(success?.data?.banners, "SUCCESSSSS___BANNNWE");
        if (success?.data?.banners?.length > 0) {
          const VendorBanners = success?.data?.banners?.filter((i) => i?.type == "vendor")
          console.log(VendorBanners, "VEND__KOOOOO");
          setBanner(VendorBanners)
        }

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
      },
      error => {
        console.log(error, 'errorerrorerror>>');
      },
      fail => { },
    );
  };

  const fetchBidList = () => {
    GET_WITH_TOKEN(
      BID_LIST,
      success => {
        setLoading(false);
        const response = success?.data?.data;
        const filteredBids = response?.filter((e) => e?.category?.id == userdata?.service_category);
        setBidList(filteredBids || [])
      },
      error => {
        console.log(error, 'errorerrorerror>>');
        setLoading(false);
      },
      fail => {
        setLoading(false);
      },
    );
  };
  useEffect(() => {
    if (!banner || banner.length === 0) return; // wait until banners load

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % banner.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [banner]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.bannerWrapper]}
      // onPress={() => Linking.openURL(item.link)}
      >
        <Image
          source={{ uri: item?.image }}
          style={[styles.bannerImage, { width: width - 40 }]}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  };

  const renderBidItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.99}
          disabled
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          style={[styles.card, { alignItems: 'flex-start' }]}>
          <Image
            source={{
              uri: cleanImageUrl(item?.category?.image),
            }}
            style={styles.cardIcon}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Typography style={[styles.cardTitle, { color: COLOR.primary, marginBottom: 0 }]}>
              {item.title}
            </Typography>
            <Typography style={[styles.cardSub, { paddingVertical: 2, color: COLOR.black }]}>
              Category : {item?.category?.name || ''}
            </Typography>
            <Typography style={[styles.cardSub, { paddingVertical: 2, color: COLOR.black }]}>
              Starts : {moment(item?.bid_date).format('DD MMM YYYY')} at {item?.start_time || ''}
            </Typography>

            <Typography style={[styles.cardSub, { paddingVertical: 2, color: COLOR.black }]}>
              Ends : {moment(item?.bid_end_date).format('DD MMM YYYY')} at {item?.end_time || ''}
            </Typography>

            <Typography style={[styles.cardSub, { paddingVertical: 2, color: COLOR.black }]}>
              Top Bidder : {item?.current_bid_amount ? `₹ ${item?.current_bid_amount}` : 'No Bids Yet'}
            </Typography>

            <Typography style={[styles.cardSub, { paddingVertical: 2, color: COLOR.black }]}>
              Your Bid : {item?.won_entry?.amount ? `₹ ${item?.won_entry?.amount}` : 'No Bids Yet'}
            </Typography>

            <Button
              title={item?.won_entry == null ? "Place Bid" : "Update Bid"}
              onPress={() => handleOpenModal(item)}
              containerStyle={{ alignSelf: 'flex-start', marginTop: 10, height: 40, width: 120 }}
              titleSize={12}
            />


          </View>
        </TouchableOpacity>

        {item?.is_won && <View style={{ backgroundColor: COLOR.primary, width: '90%', alignSelf: 'center', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, marginTop: -10 }}>
          <Typography style={[styles.cardSub, { paddingVertical: 8, color: COLOR.white, alignSelf: 'center', fontFamily: Font.semibold }]}>
            You Have Won The BID!
          </Typography>
        </View>}
      </>
    )

  }

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image
              source={images.location}
              style={{ height: 18, width: 18 }}
              tintColor={COLOR.primary}
            />
          </View>
          <Typography
            size={16}
            font={Font.semibold}
            color={COLOR.primary}
            numberOfLines={1}
            style={{ marginLeft: 8, width: windowWidth * 0.6 }}>
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
            style={{ height: 18, width: 18 }}
            tintColor={COLOR.white}
          />
        </TouchableOpacity>
      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}>

        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          style={styles.card}>
          <Image
            source={{
              uri: cleanImageUrl(userdata?.image),
            }}
            style={styles.cardIcon}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
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
            data={banner}
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
          {banner.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <View style={{ marginBottom: 40 }}>
          <FlatList
            data={bidList}
            renderItem={renderBidItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}

          />
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
            {Appointment.length > 0 && <Typography
              style={styles.sectionTitle}
              disabled={false}
              onPress={() => navigation.navigate('Appointment')}>
              View More
            </Typography>}
          </View>
          <FlatList
            data={Appointment.slice(0, 3)}
            renderItem={({ item }) => {
              const scheduleEntries = item?.schedule_time
                ? Object.entries(item.schedule_time)
                : [];
              return (
                <AppointmentCard
                  tab={'Upcoming'}
                  item={item}
                  onSuccess={() => GetServices()}
                  onPress={() =>
                    navigation.navigate('AppointmentDetail', { appointment: item })
                  }
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
      <Chatbot />

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Typography style={{ fontSize: 16, fontFamily: Font.bold, marginBottom: 10 }}>
              {selectedItem?.won_entry ? 'Update Your Bid' : 'Place a New Bid'}
            </Typography>
            <Typography style={{ marginBottom: 6 }}>
              Item: {selectedItem?.title}
            </Typography>

            <Typography style={{ marginBottom: 6 }}>
              Wallet Balance: ₹ {userdata?.wallet || 0}
            </Typography>
            <Typography style={{ marginBottom: 6 }}>
              Current Top Bid: ₹ {selectedItem?.current_bid_amount || 0}
            </Typography>

            <TextInput
              placeholder="Enter your bid"
              keyboardType="numeric"
              value={bidValue}
              onChangeText={setBidValue}
              style={styles.input}
            />

            <Button
              title={selectedItem?.won_entry ? 'Update Bid' : 'Submit Bid'}
              onPress={handleUpdateBid}
              containerStyle={{ marginTop: 15, height: 45, width: '100%' }}
              loading={buttonLoading}
            />

            <Button
              title="Cancel"
              onPress={() => setIsModalVisible(false)}
              containerStyle={{
                marginTop: 10,
                height: 40,
                width: '100%',
                backgroundColor: COLOR.grey,
              }}
              titleStyle={{ color: COLOR.black }}
            />
          </View>
        </View>
      </Modal>
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
    shadowOffset: { width: 0, height: 2 },
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
    paddingHorizontal: 20
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
    // marginTop: 10,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
});
