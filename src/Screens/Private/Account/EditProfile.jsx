import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import Input from '../../../Components/Input';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import ImageModal from '../../../Components/UI/ImageModal';
import useKeyboard, {Google_Key} from '../../../Constants/Utility';
import {cleanImageUrl, isValidForm, ToastMsg} from '../../../Backend/Utility';
import {validators} from '../../../Backend/Validator';
import Button from '../../../Components/UI/Button';
import {Typography} from '../../../Components/UI/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  GET,
  GET_WITH_TOKEN,
  POST_FORM_DATA,
  POST_WITH_TOKEN,
} from '../../../Backend/Api';
import {
  CATEGORY,
  GET_CATEGORY,
  UPDATE_PROFILE,
} from '../../../Constants/ApiRoute';
import {userDetails} from '../../../Redux/action';
import {Dropdown} from 'react-native-element-dropdown';
import {ErrorBox} from '../../../Components/UI/ErrorBox';
import {Font} from '../../../Constants/Font';
import moment from 'moment';
import {images} from '../../../Components/UI/images';
import DatePickerModal from '../../../Components/UI/DatePicker';
import GoogleAutoLocaton from '../../../Components/UI/GoogleAutoLocaton';
import MapView, {Marker} from 'react-native-maps';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const EditProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  console.log(address);
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [buisness, setBuisness] = useState('');
  const [served, setServed] = useState('');
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [pinCode, setPinCode] = useState();
  const [category, setCategory] = useState();
  const [isEditing, setIsEditing] = useState(true);
  const {isKeyboardVisible} = useKeyboard();
  const userdata = useSelector(store => store.userDetails);
  console.log(userdata, 'lllllll');

  const [profileImage, setProfileImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState({});
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [experience, setExperience] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [markerCoords, setMarkerCoords] = useState(null);

  const toggleDay = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  useEffect(() => {
    if (isFocus) {
      getCategory();
      setPhone(userdata?.phone_number);
      setWebsite(userdata?.website || userdata?.business_website);
      setProfileImage({path: userdata?.image});
      setFirstName(userdata?.name || '');
      setEmail(userdata?.email || '');
      setAddress(userdata?.exact_location || '');
      setBuisness(userdata?.business_name || '');
      setServed(userdata?.location_area_served || '');
      setCompany(userdata?.company_name || '');
      setExperience(
        userdata?.years_of_experience
          ? userdata.years_of_experience.toString()
          : '',
      );
      setStartTime(
        userdata?.daily_start_time
          ? moment(userdata.daily_start_time, 'HH:mm').toDate()
          : '',
      );
      setEndTime(
        userdata?.daily_end_time
          ? moment(userdata.daily_end_time, 'HH:mm').toDate()
          : '',
      );
      if (userdata?.working_days?.length) {
        const formattedDays = userdata.working_days.map(
          d => d.charAt(0).toUpperCase() + d.slice(1),
        );
        setSelectedDays(formattedDays);
      }
      if (userdata?.exact_location) {
        const parts = userdata.exact_location.split(',').map(p => p.trim());
        const len = parts.length;

        if (len >= 1) setCountry(parts[len - 1]);
        if (len >= 2) setState(parts[len - 2]);
        if (len >= 3) setCity(parts[len - 3]);
        setPinCode('');
      }
    }
  }, [isFocus]);

  const handleImageSelected = response => {
    console.log(response);
    if (response) {
      setProfileImage(response);
    }
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${Google_Key}`,
      );
      const data = await response.json();
      if (data.status === 'OK') {
        return data.results[0]?.formatted_address || '';
      }
      return '';
    } catch (err) {
      console.log('Reverse Geocode Error:', err);
      return '';
    }
  };

  const getCategory = () => {
    GET(
      GET_CATEGORY,
      success => {
        console.log(success, 'GET_CATEGORY-->>>');
        const d = success?.data.map(v => {
          return {
            label: v?.name,
            value: v?.id,
          };
        });
        setCategoryList(d);
        if (userdata?.service_category) {
          const selected = d.find(v => v?.value == userdata?.service_category);
          setCategory(selected);
        }
      },
      error => {
        console.log(error, 'GET_CATEGORY>>');
      },
      fail => {
        console.log(fail, 'GET_CATEGORYfail>>');
      },
    );
  };

  const handleUpdate = () => {
    let validationErrors = {
      name: validators.checkRequire('Name', firstName),
      email: validators.checkEmail('Email', email),
      phone: validators.checkNumber('Phone Number', phone),
      exact_location: validators.checkRequire('exact_location', address),
      city: validators.checkRequire('City', city),
      country: validators.checkRequire('Country', country),
      state: validators.checkRequire('State', state),
      pinCode: validators.checkRequire('Pin Code', pinCode),
      buisness: validators.checkRequire('Buisness Name', buisness),
      location_served: validators.checkRequire('Location Area Served', served),
      category: validators.checkRequire('Service Category', category),
      experience: validators.checkRequire('Experience', experience),
      start: validators.checkRequire('Start Time', startTime),
      end: validators.checkRequire('End Time', endTime),
      days:
        selectedDays.length === 0
          ? 'Please select at least one working day.'
          : '',
    };
    setError(validationErrors);
    if (isValidForm(validationErrors)) {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', firstName);
      formData.append('email', email);
      formData.append('exact_location', address);
      formData.append('phone', phone);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('country', country);
      formData.append('zip_code', pinCode);
      formData.append('company_name', company);
      formData.append('category_id', userdata?.service_category);
      formData.append('website', '');
      formData.append('business_name', buisness);
      formData.append('years_of_experience', Number(experience));
      formData.append('location_area_served', served);
      formData.append('daily_end_time', moment(endTime).format('HH:mm'));
      formData.append('daily_start_time', moment(startTime).format('HH:mm'));
      selectedDays.map((item, index) => {
        formData.append(`working_days[${index}]`, item.toLowerCase());
      });
      if (profileImage && profileImage?.mime) {
        formData.append('profile_picture', {
          uri: profileImage?.path,
          type: profileImage?.mime || 'image/jpeg',
          name: profileImage?.filename || 'profileImage?.path',
        });
      }
      console.log('FormData ====>', formData);
      POST_FORM_DATA(
        UPDATE_PROFILE,
        formData,
        success => {
          setLoading(false);
          ToastMsg(success?.message);
          console.log(success, 'dsdsdsdeeeeeeeeeeeeweewew-->>>');
          dispatch(userDetails(success?.data));
          navigation.pop();
          setIsEditing(false);
          fetchUserProfile();
        },
        error => {
          console.log(error, 'errorerrorerror>>');
          setError(error?.data?.errors);
          setLoading(false);
        },
        fail => {
          console.log(fail, 'errorerrorerror>>');
          setLoading(false);
        },
      );
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 15}}>
      <HomeHeader
        title="Edit Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      {/* Profile Image */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: cleanImageUrl(profileImage?.path),
          }}
          style={styles.profileImage}
        />

        {isEditing && (
          <TouchableOpacity
            style={styles.editIconWrapper}
            onPress={() => setShowModal(true)}>
            <Image
              source={require('../../../assets/Images/edit.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 0 : isKeyboardVisible ? 0 : -40
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{flex: 1, paddingHorizontal: 5}}
          contentContainerStyle={styles.container}>
          {/* 🚀 Promo Card */}
          {/* <View style={styles.card}>
            <Typography
              size={18}
              fontWeight="700"
              color="#333"
              style={styles.sectionTitle}>
              🚀 Promote Your Business
            </Typography>
            <View style={styles.promoBox}>
              <Typography
                size={16}
                fontWeight="600"
                color="#0057FF"
                style={styles.promoTitle}>
                Boost Your Profile
              </Typography>
              <Typography
                size={14}
                color="#555"
                textAlign="center"
                style={styles.promoText}>
                Increase visibility and attract more customers by appearing
                {'\n'}
                higher in search results.
              </Typography>
              <TouchableOpacity
                style={styles.boostBtn}
                onPress={() => navigation.navigate('BoostProfile')}>
                <Typography size={15} fontWeight="600" color="#fff">
                  View Plans
                </Typography>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* Inputs with Error */}
          <Input
            label="Name"
            placeholder="Enter Your name"
            value={firstName}
            style={{borderColor: COLOR.primary}}
            onChangeText={setFirstName}
            editable={isEditing}
            error={error.name}
          />
          <Input
            label="Email"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={{borderColor: COLOR.primary}}
            keyboardType="email-address"
            editable={isEditing}
            error={error.email}
          />
          <Input
            label="Phone Number"
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            style={{borderColor: COLOR.primary}}
            keyboardType="phone-pad"
            editable={false}
            error={error.phone}
          />
          <GoogleAutoLocaton
            label="exact_location"
            value={address}
            placeholder="Enter your exact_location"
            onPress={(data, details) => {
              console.log('DATA==>', data);
              console.log('DETAILS==>', details);
              const loc =
                data?.description ||
                details?.formatted_address ||
                details?.name;
              setAddress(loc);

              if (details?.address_components?.length) {
                let city = '';
                let state = '';
                let country = '';
                let zip = '';

                details.address_components.forEach(component => {
                  if (component.types.includes('locality')) {
                    city = component.long_name;
                  }
                  if (component.types.includes('administrative_area_level_1')) {
                    state = component.long_name;
                  }
                  if (component.types.includes('country')) {
                    country = component.long_name;
                  }
                  if (
                    component.types.includes('postal_code') ||
                    component.types.includes('postal_code_suffix')
                  ) {
                    zip = component.long_name;
                  }
                });

                if (city) setCity(city);
                if (state) setState(state);
                if (country) setCountry(country);
                if (zip) setPinCode(zip);
              }
            }}
          />
          {error.exact_location && (
            <ErrorBox style={{marginTop: 0}} error={error.exact_location} />
          )}
          <Input
            label="City"
            placeholder="Enter Your City"
            value={city}
            style={{borderColor: COLOR.primary}}
            onChangeText={setCity}
            editable={isEditing}
            error={error.city}
          />
          <Input
            label="State"
            placeholder="Enter Your State"
            value={state}
            style={{borderColor: COLOR.primary}}
            onChangeText={setState}
            editable={isEditing}
            error={error.state}
          />
          <Input
            label="Country"
            placeholder="Enter Your Country"
            value={country}
            style={{borderColor: COLOR.primary}}
            onChangeText={setCountry}
            editable={isEditing}
            error={error.country}
          />
          <Typography size={14} font={Font.semibold} style={[{marginTop: 18}]}>
            Service Category
          </Typography>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={categoryList}
            disable={!isEditing}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder="Select Service Category Type"
            value={category}
            onChange={item => setCategory(item.value)}
          />
          {error.category && (
            <ErrorBox error={error.category} style={{marginBottom: 20}} />
          )}
          <Input
            label="Pin Code"
            placeholder="Enter Your Pin Code"
            value={pinCode}
            style={{borderColor: COLOR.primary}}
            onChangeText={setPinCode}
            editable={isEditing}
            error={error.pinCode}
          />
          <Input
            label="Years of Experience"
            placeholder="Enter Your Experience"
            style={{borderColor: COLOR.primary, fontFamily: Font.medium}}
            value={experience}
            keyboardType="decimal-pad"
            onChangeText={setExperience}
            error={error.experience}
          />
          <Typography size={14} font={Font.semibold} style={[{marginTop: 18}]}>
            Working Days
          </Typography>
          <View style={styles.daysContainer}>
            {days.map(day => (
              <TouchableOpacity
                key={day}
                style={styles.dayRow}
                onPress={() => toggleDay(day)}>
                <View
                  style={[
                    styles.checkbox,
                    selectedDays.includes(day) && styles.checkboxSelected,
                  ]}>
                  {selectedDays.includes(day) && (
                    <Image
                      source={images.check}
                      style={{
                        width: 14,
                        height: 14,
                        tintColor: COLOR.white,
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </View>
                <Typography font={Font.semibold} size={14} color={COLOR.black}>
                  {day}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
          {error.days && (
            <ErrorBox style={{marginTop: -6}} error={error.days} />
          )}

          <View style={{marginTop: error.days ? 10 : 5}}>
            <DatePickerModal
              label="Daily Start Time (e.g., 9:00 AM)"
              value={startTime}
              mode="time"
              error={error.start}
              onChange={v => setStartTime(v)}
            />
          </View>

          {/* End Time */}
          <DatePickerModal
            containerStyle={{
              marginTop: error.start ? 50 : 30,
              marginBottom: error.end ? 40 : 20,
            }}
            label="Daily End Time (e.g., 5:00 PM)"
            value={endTime}
            mode="time"
            error={error.end}
            onChange={v => setEndTime(v)}
          />
          <Input
            label="company name"
            placeholder="Enter Your company name"
            value={company}
            style={{borderColor: COLOR.primary}}
            onChangeText={setCompany}
            editable={isEditing}
            error={error.company_name}
          />
          <Input
            label="website"
            placeholder="Enter Your website"
            value={website}
            style={{borderColor: COLOR.primary}}
            onChangeText={setWebsite}
            editable={isEditing}
            error={error.website}
          />
          <Input
            label="business name"
            placeholder="Enter Your business name"
            value={buisness}
            style={{borderColor: COLOR.primary}}
            onChangeText={setBuisness}
            editable={isEditing}
            error={error.buisness}
          />
          <GoogleAutoLocaton
            label="location area served"
            value={served}
            placeholder="Enter your location area served"
            onPress={(data, details) => {
              console.log('DATA==>', data);
              console.log('DETAILS==>', details);
              const loc =
                data?.description ||
                details?.formatted_address ||
                details?.name;
              setServed(loc);
              if (details?.geometry?.location) {
                const {lat, lng} = details.geometry.location;
                const newRegion = {
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                };
                setRegion(newRegion);
                setMarkerCoords({latitude: lat, longitude: lng});
              }
            }}
            renderRightButton={() => {
              if (served) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setServed('');
                      setMarkerCoords(null);
                    }}
                    style={{marginTop: 15}}>
                    <Image
                      source={images.cross}
                      style={{height: 14, width: 14, tintColor: 'red'}}
                    />
                  </TouchableOpacity>
                );
              }
              return null;
            }}
          />
          {error.location_served && (
            <ErrorBox style={{marginTop: 0}} error={error.location_served} />
          )}
          {served && (
            <View
              style={{
                width: '100%',
                height: 200,
                overflow: 'hidden',
                marginTop: 20,
                borderRadius: 10,
              }}>
              <MapView
                style={{flex: 1}}
                region={region}
                onRegionChangeComplete={async newRegion => {
                  setRegion(newRegion);
                  setMarkerCoords({
                    latitude: newRegion.latitude,
                    longitude: newRegion.longitude,
                  });
                  const address = await getAddressFromCoords(
                    newRegion.latitude,
                    newRegion.longitude,
                  );
                  if (address) {
                    setServed(address);
                  }
                }}>
                {markerCoords && <Marker coordinate={markerCoords} />}
              </MapView>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Edit / Update Button */}
      <Button
        containerStyle={{marginTop: 10}}
        loading={loading}
        title={isEditing ? 'Update' : 'Edit'}
        onPress={() => {
          if (isEditing) {
            handleUpdate();
          } else {
            setIsEditing(true);
          }
        }}
      />

      {/* Image Modal */}
      <ImageModal
        showModal={showModal}
        close={() => setShowModal(false)}
        selected={handleImageSelected}
        mediaType="photo"
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    backgroundColor: COLOR.white,
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: COLOR.primary,
  },
  container: {
    paddingVertical: 10,
    backgroundColor: COLOR.bgColor,
  },
  card: {
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  promoBox: {
    backgroundColor: '#F2F7FF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  promoTitle: {
    marginBottom: 6,
  },
  promoText: {
    marginBottom: 14,
  },
  boostBtn: {
    backgroundColor: '#2E86DE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdown: {
    height: 50,
    borderColor: COLOR.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLOR.black,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%', // 2-column layout
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLOR.primary,
  },
});
