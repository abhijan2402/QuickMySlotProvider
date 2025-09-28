import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
} from 'react-native';
import HomeHeader from '../../Components/HomeHeader';
import {COLOR} from '../../Constants/Colors';
import ImageModal from '../../Components/UI/ImageModal';
import {windowWidth} from '../../Constants/Dimensions';
import {images} from '../../Components/UI/images';
import ImageUpload from '../../Components/UI/ImageUpload';
import Input from '../../Components/Input';
import {ErrorBox} from '../../Components/UI/ErrorBox';
import Button from '../../Components/UI/Button';
import {Typography} from '../../Components/UI/Typography';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useKeyboard, {Google_Key} from '../../Constants/Utility';
import {useDispatch, useSelector} from 'react-redux';
import {BUSINESS_PROFILE, CATEGORY} from '../../Constants/ApiRoute';
import {GET_WITH_TOKEN, POST_FORM_DATA} from '../../Backend/Api';
import {ToastMsg} from '../../Backend/Utility';
import {userDetails} from '../../Redux/action';
import {useIsFocused} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {Font} from '../../Constants/Font';
import GoogleAutoLocaton from '../../Components/UI/GoogleAutoLocaton';
import MapView, {Marker} from 'react-native-maps';

const CompleteProfile = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  // Upload states
  const [image, setImages] = useState({
    PhotoVerifi: null,
    businessProof: null,
    aadhaarFront: null,
    pan: null,
  });

  // Text field states
  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [gst, setGst] = useState('');
  const {isKeyboardVisible} = useKeyboard();
  const userdata = useSelector(store => store.userDetails);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState();
  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [markerCoords, setMarkerCoords] = useState(null);

  // Error state
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isFocus) {
      GET_WITH_TOKEN(
        CATEGORY,
        success => {
          setLoading(false);
          console.log(success);
          const formattedData = success?.data?.map(item => ({
            label: item.name,
            value: item.id,
          }));

          setCategoryList(formattedData || []);
        },
        error => {
          console.log(error);

          setLoading(false);
          console.log(error);

          ToastMsg(error?.message);
        },
        fail => {
          setLoading(false);
        },
      );
    }
  }, [isFocus]);

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

  const handleSelect = response => {
    if (currentField) {
      let selected = response[0] || response; // in case it's an array

      const fileObj = {
        uri: selected.path || selected.uri,
        type: selected.mime || 'image/jpeg', // fallback
        name:
          selected.fileName ||
          `${currentField}.${(selected.mime || 'image/jpeg').split('/')[1]}`,
      };
      console.log(fileObj);

      setImages(prev => ({
        ...prev,
        [currentField]: fileObj,
      }));
    }
    setShowModal(false);
  };

  const openUpload = field => {
    setCurrentField(field);
    setShowModal(true);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!image.PhotoVerifi)
      newErrors.PhotoVerifi = 'Photo verification is required';
    if (!image.businessProof)
      newErrors.businessProof = 'Business proof is required';
    if (!image.aadhaarFront)
      newErrors.aadhaarFront = 'Aadhaar card is required';
    if (!image.pan) newErrors.pan = 'PAN card is required';
    if (!about.trim())
      newErrors.about = 'Please enter details about your business';
    if (!experience.trim()) newErrors.experience = 'Experience is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!gst.trim()) newErrors.gst = 'GST Number is required';
    if (!category) newErrors.category = 'Service Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setLoading(true);
      const formData = new FormData();
      formData.append('user_id', userdata?.id);
      formData.append('business_description', about);
      formData.append('exact_location', location);
      formData.append('years_of_experience', Number(experience));
      formData.append('gstin_number', gst);
      formData.append('business_website', website);
      formData.append('service_category', category);

      if (image?.PhotoVerifi) {
        formData.append('photo_verification', {
          uri: image?.PhotoVerifi.path || image?.PhotoVerifi.uri,
          type: image?.PhotoVerifi.mime || 'image/jpeg',
          name: image?.PhotoVerifi.fileName || 'image/jpeg',
        });
      }
      if (image?.businessProof) {
        formData.append('business_proof', {
          uri: image?.businessProof.path || image?.businessProof.uri,
          type: image?.businessProof.mime || 'image/jpeg',
          name: image?.businessProof.fileName || 'image/jpeg',
        });
      }
      if (image?.aadhaarFront) {
        formData.append('adhaar_card_verification', {
          uri: image?.aadhaarFront.path || image?.aadhaarFront.uri,
          type: image?.aadhaarFront.mime || 'image/jpeg',
          name: image?.aadhaarFront.fileName || 'image/jpeg',
        });
      }
      if (image?.pan) {
        formData.append('pan_card', {
          uri: image?.pan.path || image?.pan.uri,
          type: image?.pan.mime || 'image/jpeg',
          name: image?.pan.fileName || 'image/jpeg',
        });
      }
      console.log(formData);

      POST_FORM_DATA(
        BUSINESS_PROFILE,
        formData,
        success => {
          setLoading(false);
          dispatch(userDetails(success?.data));
          navigation.navigate('Availability');
        },
        error => {
          console.log(error);

          setLoading(false);
          if (error?.data?.errors) {
            const errorKeyMap = {
              years_of_experience: 'experience',
              business_website: 'website',
            };
            const apiErrors = {};
            Object.keys(error.data.errors).forEach(key => {
              const mappedKey = errorKeyMap[key] || key;
              apiErrors[mappedKey] = error.data.errors[key]; // keep full array
            });
            setErrors(apiErrors);
          } else {
          }
        },
        fail => {
          setLoading(false);
        },
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : isKeyboardVisible
          ? 'height'
          : undefined
      }
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}>
      <HomeHeader
        title="Complete Your Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
        onLeftPress={() => navigation.pop(2)}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: 20}}
        style={{flex: 1, paddingHorizontal: 5}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 15,
            backgroundColor: COLOR.lightYellow,
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 10,
            borderLeftWidth: 4,
            borderLeftColor: '#f5a623',
            elevation: 3,
          }}>
          <Image
            style={{width: 22, height: 22, marginRight: 10, marginTop: 2}}
            source={images.warning}
            resizeMode="contain"
          />
          <Typography
            font={Font.regular}
            size={14}
            color="#444"
            lineHeight={20}
            style={{paddingRight: 10, width: windowWidth * 0.75}}>
            Please make sure to provide accurate and complete business details,
            including valid proof documents. This helps us verify your profile
            and improves customer trust.
          </Typography>
        </View>

        <Typography
          size={16}
          font={Font.semibold}
          color={COLOR.black}
          style={{marginBottom: 10}}>
          Business Information
        </Typography>

        <Text style={[styles.label, {marginTop: 18}]}>Service Category</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={categoryList}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder="Select Service Category Type"
          value={category}
          onChange={item => setCategory(item.value)}
        />
        {errors.category && (
          <ErrorBox error={errors.category} style={{marginBottom: 20}} />
        )}

        {/* Photo Verification */}
        <Typography
          size={14}
          font={Font.semibold}
          // font={Font.semibold}
          color={COLOR.black}
          style={{marginTop: 20, marginBottom: 6}}>
          Photo Verification
        </Typography>
        <ImageUpload
          file={image.PhotoVerifi}
          setFile={file => setImages(prev => ({...prev, PhotoVerifi: file}))}
          document={false}
        />
        {errors.PhotoVerifi && <ErrorBox error={errors.PhotoVerifi} />}

        {/* Business Proof */}
        <Typography
          size={14}
          font={Font.semibold}
          color={COLOR.black}
          style={{marginTop: 20, marginBottom: 6}}>
          Business Proof
        </Typography>

        <ImageUpload
          file={image.businessProof}
          setFile={file => setImages(prev => ({...prev, businessProof: file}))}
        />

        {errors.businessProof && <ErrorBox error={errors.businessProof} />}

        {/* Aadhaar Front */}
        <Typography
          size={14}
          font={Font.semibold}
          color={COLOR.black}
          style={{marginTop: 20, marginBottom: 6}}>
          Aadhaar Card Verification
        </Typography>

        <ImageUpload
          file={image.aadhaarFront}
          setFile={file => setImages(prev => ({...prev, aadhaarFront: file}))}
        />

        {errors.aadhaarFront && <ErrorBox error={errors.aadhaarFront} />}

        {/* PAN */}
        <Typography
          size={14}
          font={Font.semibold}
          color={COLOR.black}
          style={{marginTop: 20, marginBottom: 6}}>
          PAN Card
        </Typography>

        <ImageUpload
          file={image.pan}
          setFile={file => setImages(prev => ({...prev, pan: file}))}
        />

        {errors.pan && <ErrorBox error={errors.pan} />}

        {/* About Business */}
        <Input
          label="About Your Business"
          placeholder="Tell customers about your services.."
          style={{
            borderColor: COLOR.primary,
            height: 90,
            fontFamily: Font.medium,
          }}
          multiline
          value={about}
          onChangeText={setAbout}
          error={errors.about}
        />

        {/* Experience */}
        <Input
          label="Years of Experience"
          placeholder="Enter Your Experience"
          style={{borderColor: COLOR.primary, fontFamily: Font.medium}}
          value={experience}
          keyboardType="decimal-pad"
          onChangeText={setExperience}
          error={errors.experience}
        />

        {/* Location */}

        <GoogleAutoLocaton
          label="Exact Location"
          value={location}
          placeholder="Enter your Exact Location"
          onPress={(data, details) => {
            const loc =
              data?.description || details?.formatted_address || details?.name;
            setLocation(loc);

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
            if (location) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setLocation('');
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

        {location && (
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
                  setLocation(address);
                }
              }}>
              {markerCoords && <Marker coordinate={markerCoords} />}
            </MapView>
          </View>
        )}

        {/* Website */}
        <Input
          label="Business Website (optional)"
          placeholder="https://yourbusiness.com"
          style={{borderColor: COLOR.primary, fontFamily: Font.medium}}
          value={website}
          onChangeText={setWebsite}
          error={errors.website}
        />

        {/* GST */}
        <Input
          label="GSTIN No."
          placeholder="Enter GST Number"
          style={{borderColor: COLOR.primary, fontFamily: Font.medium}}
          value={gst}
          onChangeText={setGst}
          error={errors.gst}
        />
      </KeyboardAwareScrollView>

      <Button loading={loading} title="Next" onPress={handleNext} />

      <ImageModal
        showModal={showModal}
        close={() => setShowModal(false)}
        selected={handleSelect}
        mediaType="photo"
        document={true}
        documents={true}
      />
    </KeyboardAvoidingView>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 15},
  scrollContainer: {paddingHorizontal: 5, paddingTop: 10, paddingBottom: 50},
  imgWrapper: {
    position: 'relative',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  previewImg: {
    width: windowWidth * 0.88,
    height: 180,
    borderRadius: 8,
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 6,
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
    fontFamily: Font.medium,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLOR.black,
  },
});
