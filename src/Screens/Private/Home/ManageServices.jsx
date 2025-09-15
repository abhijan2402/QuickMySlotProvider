import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import {Typography} from '../../../Components/UI/Typography';
import ConfirmModal from '../../../Components/UI/ConfirmModel';
import {windowWidth} from '../../../Constants/Dimensions';
import {useIsFocused} from '@react-navigation/native';
import {GET_WITH_TOKEN, POST_WITH_TOKEN} from '../../../Backend/Api';
import {
  ADD_SUB_SERVICES,
  DELETE_SERVICE,
  DELETE_SUB_SERVICE,
  SERVICE,
} from '../../../Constants/ApiRoute';
import EmptyView from '../../../Components/UI/EmptyView';

const ManageServices = ({navigation}) => {
  const [deleteService, setDeleteService] = useState(false);
  const [tab, setTab] = useState('services');
  const [subServices, setSubServices] = useState([]);
  console.log(subServices);
  const [services, setServices] = useState([]);
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [deleteSubService, setDeleteSubService] = useState(false);
  const [deleteServiceID, setDeleteServiceID] = useState();
  const [deleteSubServiceID, setDeleteSubServiceID] = useState();

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
  const Services = ({item}) => {
    console.log(item, 'itemitemitemitemitem');
    return (
      <View style={styles.serviceCard}>
        <View key={item.id} style={{flexDirection: 'row', marginBottom: 10}}>
          {/* Left Icon / Image */}
          <Image
            source={{uri: item?.image}}
            style={styles.serviceImage}
            resizeMode="cover"
          />

          {/* Right Content */}
          <View style={{flex: 1, marginLeft: 12}}>
            {/* Title + Actions */}
            <View style={styles.rowBetween}>
              <Typography size={16} fontWeight="700" color={COLOR.black}>
                {item.name}
              </Typography>

              <View style={styles.actionsRow}>
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
                    style={[styles.actionIcon, {tintColor: 'red'}]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <Typography
              size={12}
              color={COLOR.darkGrey}
              style={{marginVertical: 6}}>
              {item.description}
            </Typography>

            {/* Meta Info */}
            <View style={styles.metaInfo}>
              <Typography size={12} fontWeight="600">
                Category:{' '}
                <Typography size={12}>{item.category?.name}</Typography>
              </Typography>

              <Typography size={12} fontWeight="600">
                Gender: <Typography size={12}>{item.gender}</Typography>
              </Typography>
            </View>

            {/* Price & Duration */}
            <View style={[styles.metaInfo, {marginTop: 4}]}>
              <Typography size={12} fontWeight="600">
                Price:{' '}
                <Typography color="#004aad">
                  ${Number(item.price).toFixed(2)}
                </Typography>
              </Typography>

              <Typography size={12} fontWeight="600">
                Duration:{' '}
                <Typography color="#004aad" style={styles.pill}>
                  {item.duration}
                </Typography>
              </Typography>
            </View>
          </View>
        </View>

        {/* Peak Hours */}
        {item.peak_hours && Object.keys(item.peak_hours).length > 0 && (
          <View style={{marginTop: 8}}>
            <Typography
              size={13}
              fontWeight="700"
              color={COLOR.black}
              style={{marginBottom: 4}}>
              Peak Hours
            </Typography>
            {Object.entries(item.peak_hours).map(([time, price], idx) => (
              <View key={idx} style={styles.metaInfo}>
                <Typography size={12}>{time}</Typography>
                <Typography size={12} color="#004aad">
                  ${price}
                </Typography>
              </View>
            ))}
          </View>
        )}

        {/* Addons */}
        {item.addons && Object.keys(item.addons).length > 0 && (
          <View style={{marginTop: 8}}>
            <Typography
              size={13}
              fontWeight="700"
              color={COLOR.black}
              style={{marginBottom: 4}}>
              Addons
            </Typography>
            {Object.entries(item.addons).map(([addon, price], idx) => (
              <View key={idx} style={styles.metaInfo}>
                <Typography size={12}>{addon}</Typography>
                <Typography size={12} color="#004aad">
                  ${price}
                </Typography>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const SubServices = ({item}) => {
    return (
      <View key={item.id} style={styles.serviceCard}>
        <Image
          source={{uri: item?.image_url}}
          style={{height: 30, width: 30}}
          resizeMode="contain"
        />

        {/* Service Details */}
        <View style={{flex: 1, marginLeft: 10}}>
          {/* Title + Actions */}
          <View style={styles.rowBetween}>
            <Typography size={14} fontWeight="600" color={COLOR.black}>
              {item?.name}
            </Typography>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddSubServices', {
                    data: item,
                    isEditing: true,
                  });
                }}
                style={styles.actionBtn}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/1159/1159633.png',
                  }}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
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
            {backgroundColor: tab === 'services' ? COLOR.primary : null},
          ]}
          onPress={() => setTab('services')}>
          <Typography
            size={16}
            fontWeight={'700'}
            textAlign={'center'}
            color={tab === 'services' ? COLOR.white : COLOR.primary}>
            Services
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subServices,
            {backgroundColor: tab === 'subServices' ? COLOR.primary : null},
          ]}
          onPress={() => setTab('subServices')}>
          <Typography
            size={16}
            fontWeight={'700'}
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
          style={{marginTop: 20}}
        />
      ) : (
        <View style={{flex: 1}}>
          {services.length > 0 && (
            <Typography
              size={15}
              fontWeight="600"
              color={COLOR.black}
              style={{marginBottom: 10}}>
              Your Current Services
            </Typography>
          )}

          <FlatList
            data={tab === 'services' ? services : subServices}
            renderItem={({item}) => {
              return tab === 'services' ? (
                <Services item={item} />
              ) : (
                <SubServices item={item} />
              );
            }}
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
          <View style={{height: 70}}></View>
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
        <Typography size={14} color={COLOR.white} fontWeight="600">
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
    backgroundColor: '#8f7de8',
    borderRadius: 10,
    paddingVertical: 15,
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
  serviceCard: {
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: COLOR.white,
  },
  categoryBox: {
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelsRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 6,
  },
  labelOrange: {
    backgroundColor: COLOR.lightYellow,
    color: '#9a5c00',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  labelGreen: {
    backgroundColor: COLOR.lightGreen,
    color: '#056b26',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
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
    marginBottom: 15,
    marginTop: 20,
    padding: 5,
    borderRadius: 50,
  },
  services: {
    paddingVertical: 15,
    borderRadius: 50,
    width: windowWidth * 0.45,
  },
  subServices: {
    paddingVertical: 15,
    borderRadius: 50,
    width: windowWidth * 0.45,
  },
  serviceImage: {
    height: 100,
    width: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },

  metaInfo: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
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
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  serviceImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginLeft: 8,
    padding: 4,
  },
  actionIcon: {
    width: 20,
    height: 20,
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
});
