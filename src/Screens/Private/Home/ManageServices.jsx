import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { COLOR } from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import { Typography } from '../../../Components/UI/Typography';
import ConfirmModal from '../../../Components/UI/ConfirmModel';
import { windowWidth } from '../../../Constants/Dimensions';
import { useIsFocused } from '@react-navigation/native';
import { GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../Backend/Api';
import {
  ADD_SUB_SERVICES,
  DELETE_SERVICE,
  DELETE_SUB_SERVICE,
  SERVICE,
} from '../../../Constants/ApiRoute';
import EmptyView from '../../../Components/UI/EmptyView';
import { Font } from '../../../Constants/Font';

const ManageServices = ({ navigation }) => {
  const [deleteService, setDeleteService] = useState(false);
  const [tab, setTab] = useState('subServices');
  const [subServices, setSubServices] = useState([]);
  console.log(subServices);
  const [services, setServices] = useState([]);
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [deleteSubService, setDeleteSubService] = useState(false);
  const [deleteServiceID, setDeleteServiceID] = useState();
  const [deleteSubServiceID, setDeleteSubServiceID] = useState();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isFocus || tab) {
      if (tab === 'services') {
        GetServices();
      } else {
        GetSubServices();
      }
    }
  }, [isFocus, tab]);

  const GetServices = () => {
    setServices([]);
    setLoading(true);
    GET_WITH_TOKEN(
      SERVICE,
      success => {
        console.log(success, 'successsuccesssuccess-->>>');
        setLoading(false);
        setServices(success?.data);
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
  const GetSubServices = () => {
    setLoading(true);
    GET_WITH_TOKEN(
      ADD_SUB_SERVICES,
      success => {
        console.log(success, 'successsuccesssuccess-->>>');
        setLoading(false);
        setSubServices(success?.data);
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

  const handleDelete = () => {
    setLoading(true);
    if (tab === 'services') {
      POST_WITH_TOKEN(
        DELETE_SERVICE + deleteServiceID,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
        },
        error => {
          console.log(error, 'errorerrorerror>>');
          setLoading(false);
          setDeleteService(false);
          GetServices();
        },
        fail => {
          console.log(fail, 'errorerrorerror>>');
          setLoading(false);
        },
      );
    } else {
      POST_WITH_TOKEN(
        DELETE_SUB_SERVICE + deleteSubServiceID,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
        },
        error => {
          console.log(error, 'errorerrorerror>>');
          setLoading(false);
          setDeleteSubService(false);
          GetSubServices();
        },
        fail => {
          console.log(fail, 'errorerrorerror>>');
          setLoading(false);
        },
      );
    }
  };
  const [showAllDates, setShowAllDates] = useState(false);

  const Services = ({ item }) => {
    return (
      <View style={styles.serviceCard}>
        {/* Main Content Row */}
        <View style={{ flexDirection: 'row' }}>

          {/* Right: Details */}
          <View
            style={{ flex: 1, justifyContent: 'space-between' }}>
            {/* Title and Actions */}
            <View style={styles.rowBetween}>
              <Typography size={16} font={Font.bold} color={COLOR.black}>
                {item.name}
              </Typography>
              <View style={styles.actionsRow}>
                {/* Edit Button */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddService', {
                      data: item,
                      isEditing: true,
                    })
                  }
                  style={styles.actionBtn}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/1159/1159633.png',
                    }}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => {
                    setDeleteService(true);
                    setDeleteServiceID(item?.id);
                  }}
                  style={styles.actionBtn}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/6861/6861362.png',
                    }}
                    style={[styles.actionIcon, { tintColor: 'red' }]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <Typography
              size={12}
              numberOfLines={2}
              color={COLOR.darkGrey}
              style={{
                marginTop: 6,
                marginBottom: 10,
                lineHeight: 18,
              }}>
              {item.description}
            </Typography>

            {/* Meta Info Section */}
            <View
              style={[
                styles.metaInfo,
                {
                  paddingVertical: 4,
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderColor: COLOR.lightGrey,
                  // marginBottom: 8,
                },
              ]}>
              {/* Category:{' '} */}
              <Typography font={Font.medium} size={12}>
                {item.category?.name}
              </Typography>

              <Typography
                font={Font.medium}
                size={12}
                style={{ textTransform: 'capitalize' }}>
                {item.gender}
              </Typography>
            </View>

            {/* Price & Duration */}
            <View style={[styles.metaInfo, { marginTop: 4 }]}>
              <Typography font={Font.medium} color="#004aad">
                ₹{Number(item.price).toFixed(2)}
              </Typography>
              <Typography
                font={Font.medium}
                color="#004aad"
                style={styles.pill}>
                {item.duration} mins
              </Typography>
            </View>
          </View>
        </View>

        {/* Peak Hours Section */}
        {item.peak_hours && Object.keys(item.peak_hours).length > 0 && (
          <View
            style={{
              marginTop: 12,
              backgroundColor: '#f9f9f9',
              padding: 8,
              borderRadius: 8,
            }}>
            <Typography
              size={13}
              font={Font.semibold}
              color={COLOR.black}
              style={{ marginBottom: 6 }}>
              Peak Hours
            </Typography>
            {Object.entries(item.peak_hours).map(([time, price], idx) => (
              <View
                key={idx}
                style={{
                  ...styles.metaInfo,
                  paddingVertical: 2,
                }}>
                <Typography font={Font.medium} size={12} color={COLOR.darkGrey}>
                  {time}
                </Typography>
                <Typography font={Font.semibold} size={12} color="#004aad">
                  ₹{price}
                </Typography>
              </View>
            ))}
          </View>
        )}

        {/* Addons Section */}
        {item.addons && Object.keys(item.addons).length > 0 && (
          <View
            style={{
              marginTop: 12,
              backgroundColor: '#f9f9f9',
              padding: 8,
              borderRadius: 8,
            }}>
            <Typography
              size={13}
              font={Font.semibold}
              color={COLOR.black}
              style={{ marginBottom: 6 }}>
              Addons
            </Typography>
            {Object.entries(item.addons).map(([addon, price], idx) => (
              <View
                key={idx}
                style={{
                  ...styles.metaInfo,
                  paddingVertical: 2,
                }}>
                <Typography size={12} color={COLOR.darkGrey} font={Font.medium}>
                  {addon}
                </Typography>
                <Typography font={Font.semibold} size={12} color="#004aad">
                  ₹{price}
                </Typography>
              </View>
            ))}
          </View>
        )}

        {/* Availability Section */}
        {item.available_schedule &&
          Object.keys(item.available_schedule).length > 0 && (
            <View
              style={{
                marginTop: 12,
                backgroundColor: '#f9f9f9',
                padding: 8,
                borderRadius: 8,
              }}>
              <Typography
                size={13}
                font={Font.semibold}
                color={COLOR.black}
                style={{ marginBottom: 6 }}>
                Availability
              </Typography>

              {/* Group times by date */}
              {(() => {
                const grouped = Object.entries(
                  Object.entries(item.available_schedule).reduce(
                    (acc, [time, date]) => {
                      if (!acc[date]) acc[date] = [];
                      acc[date].push(time);
                      return acc;
                    },
                    {},
                  ),
                );

                const visibleDates = showAllDates
                  ? grouped
                  : grouped.slice(0, 2);
                const hasMoreDates = grouped.length > 2;

                return (
                  <>
                    {visibleDates.map(([date, times], idx) => (
                      <View
                        key={idx}
                        style={{
                          marginBottom: 6,
                          borderBottomWidth: 0.5,
                          borderColor: COLOR.lightGrey,
                          paddingBottom: 4,
                        }}>
                        <Typography
                          size={12}
                          font={Font.semibold}
                          color={COLOR.darkGrey}
                          style={{ marginBottom: 3 }}>
                          {date}
                        </Typography>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                          {times.map((time, i) => (
                            <Typography
                              key={i}
                              size={12}
                              color="#004aad"
                              style={{
                                marginRight: 10,
                                backgroundColor: '#e6f0ff',
                                paddingHorizontal: 6,
                                marginTop: 5,
                                borderRadius: 4,
                                marginBottom: 4,
                              }}>
                              {time}
                            </Typography>
                          ))}
                        </View>
                      </View>
                    ))}

                    {hasMoreDates && (
                      <TouchableOpacity
                        onPress={() => setShowAllDates(!showAllDates)}>
                        <Typography
                          size={12}
                          color="#004aad"
                          style={{ marginTop: 4 }}>
                          {showAllDates ? 'Show less' : 'Show more'}
                        </Typography>
                      </TouchableOpacity>
                    )}
                  </>
                );
              })()}
            </View>
          )}
      </View>
    );
  };

  const SubServices = ({
    item,
    // navigation,
    // setDeleteSubService,
    // setDeleteSubServiceID,
  }) => {
    return (
      <View key={item.id} style={styles.card}>
        {/* Left Icon */}
        <Image
          source={{ uri: item?.image_url }}
          style={styles.serviceIcon}
          resizeMode="contain"
        />

        {/* Content */}
        <View style={styles.detailsWrapper}>
          {/* Title + Actions */}
          <View style={styles.rowBetween}>
            <Typography size={14} font={Font.semibold} color={COLOR.black}>
              {item?.name}
            </Typography>

            <View style={styles.actionsRow}>
              {/* Edit */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddSubServices', {
                    data: item,
                    isEditing: true,
                  })
                }
                style={styles.actionBtn}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/1159/1159633.png',
                  }}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>

              {/* Delete */}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => {
                  setDeleteSubService(true);
                  setDeleteSubServiceID(item?.id);
                }}>
                <Image
                  tintColor={'red'}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/6861/6861362.png',
                  }}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Manage Services"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />
      <View style={styles.tab}>
        <TouchableOpacity
          style={[
            styles.services,
            { backgroundColor: tab === 'services' ? COLOR.primary : null },
          ]}
          onPress={() => setTab('services')}>
          <Typography
            size={13}
            font={Font.medium}
            textAlign={'center'}
            color={tab === 'services' ? COLOR.white : COLOR.primary}>
            Services
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subServices,
            { backgroundColor: tab === 'subServices' ? COLOR.primary : null },
          ]}
          onPress={() => setTab('subServices')}>
          <Typography
            size={13}
            font={Font.medium}
            textAlign={'center'}
            color={tab === 'subServices' ? COLOR.white : COLOR.primary}>
            Sub Services
          </Typography>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {services.length > 0 && (
            <Typography
              size={15}
              font={Font.semibold}
              color={COLOR.black}
              style={{ marginBottom: 10 }}>
              Your Current Services
            </Typography>
          )}

          <FlatList
            data={tab === 'services' ? services : subServices}
            renderItem={({ item }) => {
              return tab === 'services' ? (
                <Services item={item} />
              ) : (
                <SubServices item={item} />
              );
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <EmptyView
                  title={
                    tab === 'services'
                      ? 'No Services Found'
                      : 'No Sub Services Found'
                  }
                />
              );
            }}
          />
          <View style={{ height: 70 }}></View>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          tab === 'services'
            ? navigation.navigate('AddService')
            : navigation.navigate('AddSubServices');
        }}
        style={styles.addServiceBtn}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/992/992651.png',
          }}
          style={styles.addIcon}
        />
        <Typography size={14} color={COLOR.white} font={Font.semibold}>
          {tab === 'services' ? 'Add New Services' : 'Add New Sub Services'}
        </Typography>
      </TouchableOpacity>
      <ConfirmModal
        visible={deleteService}
        close={() => setDeleteService(false)}
        title="Delete Services"
        description="Are you sure you want to delete this services?"
        yesTitle="Yes"
        noTitle="No"
        loading={loading}
        onPressYes={() => handleDelete()}
        onPressNo={() => setDeleteService(false)}
      />
      <ConfirmModal
        visible={deleteSubService}
        close={() => setDeleteSubService(false)}
        title="Delete Sub Services"
        description="Are you sure you want to delete this Sub Services?"
        yesTitle="Yes"
        noTitle="No"
        loading={loading}
        onPressYes={() => handleDelete()}
        onPressNo={() => setDeleteSubService(false)}
      />
    </View>
  );
};

export default ManageServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
  },
  addServiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    borderRadius: 13,
    paddingVertical: 18,
    justifyContent: 'center',
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 10,
  },
  addIcon: {
    width: 18,
    height: 18,
    tintColor: COLOR.white,
    marginRight: 8,
  },

  actionBtn: {
    padding: 3,
  },
  actionIcon: {
    width: 15,
    height: 15,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    marginBottom: 15,
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
  },
  services: {
    paddingVertical: 15,
    borderRadius: 10,
    width: windowWidth * 0.45,
  },
  subServices: {
    paddingVertical: 15,
    borderRadius: 15,
    width: windowWidth * 0.43,
  },
  serviceImage: {
    height: 100,
    width: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },

  pill: {
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  serviceCard: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginHorizontal: 10,
    paddingHorizontal: 5
  },
  serviceImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  pill: {
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  serviceIcon: {
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    padding: 5,
  },
  detailsWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  actionBtn: {
    padding: 6,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  actionIcon: {
    height: 20,
    width: 20,
  },
});
