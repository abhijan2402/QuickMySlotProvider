import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
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

const ManageServices = ({navigation}) => {
  const [deleteService, setDeleteService] = useState(false);
  const [tab, setTab] = useState('services');
  const [subServices, setSubServices] = useState([]);
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
          setDeleteService(false)
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
          setDeleteSubService(false)
          GetSubServices();
        },
        fail => {
          console.log(fail, 'errorerrorerror>>');
          setLoading(false);
        },
      );
    }
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

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 15}}>
        <Typography
          size={15}
          fontWeight="600"
          color={COLOR.black}
          style={{marginBottom: 10}}>
          Your Current Services
        </Typography>
        {tab === 'services'
          ? services.map(item => (
              <View key={item.id} style={styles.serviceCard}>
                {/* Category Icon */}
                {/* <View style={[styles.categoryBox, {backgroundColor: item.color}]}>
              <Typography size={12} fontWeight="600" color={COLOR.white}>
                {item.category}
              </Typography>
            </View> */}
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
                      {item.name}
                    </Typography>

                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('AddService', {
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
                          setDeleteService(true);
                          setDeleteServiceID(item?.id);
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

                  {/* Description */}
                  <Typography
                    size={12}
                    color={COLOR.darkGrey}
                    style={{marginVertical: 2}}>
                    {item.description}
                  </Typography>
                  <Typography size={12} fontWeight="600" style={{marginTop: 4}}>
                    Category: {item.category.name}
                  </Typography>
                  <Typography size={12} fontWeight="600" style={{marginTop: 4}}>
                    Gender: {item.gender}
                  </Typography>

                  {/* Price + Time */}
                  <Typography
                    size={13}
                    fontWeight="600"
                    color={COLOR.black}
                    style={{marginTop: 4}}>
                    Price: ${Number(item.price).toFixed(2)}
                  </Typography>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}>
                    <Typography
                      size={12}
                      fontWeight="600"
                      style={{
                        paddingRight: 8,
                        paddingVertical: 2,
                        borderRadius: 6,
                        overflow: 'hidden',
                        alignSelf: 'flex-start',
                      }}>
                      Duration:
                    </Typography>
                    <Typography
                      size={12}
                      fontWeight="600"
                      color="#004aad"
                      style={{
                        backgroundColor: '#e6f0ff',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 6,
                        overflow: 'hidden',
                        alignSelf: 'flex-start',
                      }}>
                      {item.duration}
                    </Typography>
                  </View>
                  <View style={styles.rowBetween}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 4,
                      }}>
                      <Typography
                        size={13}
                        fontWeight="600"
                        color={COLOR.black}>
                        {'Peak Hours:'}{' '}
                      </Typography>
                      {Object.entries(item.peak_hours).map(
                        ([timeRange, price], idx) => (
                          <Typography
                            key={idx}
                            size={12}
                            fontWeight="600"
                            style={{
                              overflow: 'hidden',
                            }}>
                            {`${timeRange}`}
                          </Typography>
                        ),
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}>
                    <Typography
                      size={12}
                      fontWeight="600"
                      style={{
                        paddingRight: 8,
                        paddingVertical: 2,
                        borderRadius: 6,
                        overflow: 'hidden',
                        alignSelf: 'flex-start',
                      }}>
                      Peak Hours Price:
                    </Typography>
                    {Object.entries(item.peak_hours).map(
                      ([timeRange, price], idx) => (
                        <Typography
                          key={idx}
                          size={12}
                          fontWeight="600"
                          color="#004aad"
                          style={{
                            backgroundColor: '#e6f0ff',
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 6,
                            overflow: 'hidden',
                          }}>
                          {`$${price}`}
                        </Typography>
                      ),
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}>
                    {Object.entries(item.addons).map(
                      ([timeRange, price], idx) => (
                        <Typography
                          key={idx}
                          size={12}
                          fontWeight="600"
                          style={{
                            overflow: 'hidden',
                          }}>
                          {`${timeRange}`}
                        </Typography>
                      ),
                    )}
                    {Object.entries(item.addons).map(
                      ([timeRange, price], idx) => (
                        <Typography
                          key={idx}
                          size={12}
                          fontWeight="600"
                          color="#004aad"
                          style={{
                            backgroundColor: '#e6f0ff',
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 6,
                            overflow: 'hidden',
                          }}>
                          {`$${price}`}
                        </Typography>
                      ),
                    )}
                  </View>

                  {/* Labels */}
                  {/* <View style={styles.labelsRow}>
                    <Typography size={11} style={styles.labelOrange}>
                      Peak Eligible
                    </Typography>
                    <Typography size={11} style={styles.labelGreen}>
                      Discount Eligible
                    </Typography>
                  </View> */}
                </View>
              </View>
            ))
          : subServices.map(item => (
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
                      {item.category.name}
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
            ))}
      </ScrollView>
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
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 10,
  },
  addIcon: {
    width: 18,
    height: 18,
    tintColor: COLOR.white,
    marginRight: 8,
  },
  serviceCard: {
    flexDirection: 'row',
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
});
