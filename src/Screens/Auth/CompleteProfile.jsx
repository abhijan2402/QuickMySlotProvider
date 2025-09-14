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
import useKeyboard from '../../Constants/Utility';
import {useDispatch, useSelector} from 'react-redux';
import {BUSINESS_PROFILE, CATEGORY} from '../../Constants/ApiRoute';
import {GET_WITH_TOKEN, POST_FORM_DATA} from '../../Backend/Api';
import {ToastMsg} from '../../Backend/Utility';
import {userDetails} from '../../Redux/action';
import {useIsFocused} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

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
  console.log(image, 'lllllll');

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
      formData.append('years_of_experience', experience);
      formData.append('gstin_number', gst);
      formData.append('business_website', website);
      formData.append('service_category', category);

      if (image?.PhotoVerifi) {
        formData.append('photo_verification', image?.PhotoVerifi);
      }
      if (image?.businessProof) {
        formData.append('business_proof', image?.businessProof);
      }
      if (image?.aadhaarFront) {
        formData.append('adhaar_card_verification', image?.aadhaarFront);
      }
      if (image?.pan) {
        formData.append('pan_card', image?.pan);
      }
      POST_FORM_DATA(
        BUSINESS_PROFILE,
        formData,
        success => {
          setLoading(false);
          dispatch(userDetails(success?.data));
          navigation.navigate('Availability');
        },
        error => {
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
        onLeftPress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
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
          fontWeight="600"
          color={COLOR.black}
          style={{marginBottom: 10}}>
          Business Information
        </Typography>

        {/* Photo Verification */}
        <Typography
          size={14}
          fontWeight="500"
          color={COLOR.black}
          style={{marginTop: 20, marginBottom: 6}}>
          Photo Verification
        </Typography>
        {image.PhotoVerifi ? (
          <View style={styles.imgWrapper}>
            <Image
              source={{uri: image.PhotoVerifi.uri}}
              style={styles.previewImg}
            />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => setImages(prev => ({...prev, PhotoVerifi: null}))}>
              <Image
                source={images.cross}
                style={{height: 12, width: 12}}
                tintColor={'white'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <ImageUpload onPress={() => openUpload('PhotoVerifi')} />
        )}
        {errors.PhotoVerifi && <ErrorBox error={errors.PhotoVerifi} />}

        {/* Business Proof */}
        <Typography
          size={14}
          fontWeight="500"
          color={COLOR.black}
          style={{marginTop: 20, marginBottom: 6}}>
          Business Proof
        </Typography>
        {image.businessProof ? (
          <View style={styles.imgWrapper}>
            <Image
              source={{uri: image.businessProof.uri}}
              style={styles.previewImg}
            />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() =>
                setImages(prev => ({...prev, businessProof: null}))
              }>
              <Image
                source={images.cross}
                style={{height: 12, width: 12}}
                tintColor={'white'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <ImageUpload onPress={() => openUpload('businessProof')} />
        )}
        {errors.businessProof && <ErrorBox error={errors.businessProof} />}

        {/* Aadhaar Front */}
        <Typography
          size={14}
          fontWeight="500"
          color={COLOR.black}
          style={{marginTop: 20, marginBottom: 6}}>
          Aadhaar Card Verification
        </Typography>
        {image.aadhaarFront ? (
          <View style={styles.imgWrapper}>
            <Image
              source={{uri: image.aadhaarFront.uri}}
              style={styles.previewImg}
            />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() =>
                setImages(prev => ({...prev, aadhaarFront: null}))
              }>
              <Image
                source={images.cross}
                style={{height: 12, width: 12}}
                tintColor={'white'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <ImageUpload onPress={() => openUpload('aadhaarFront')} />
        )}
        {errors.aadhaarFront && <ErrorBox error={errors.aadhaarFront} />}

        {/* PAN */}
        <Typography
          size={14}
          fontWeight="500"
          color={COLOR.black}
          style={{marginTop: 20, marginBottom: 6}}>
          PAN Card
        </Typography>
        {image.pan ? (
          <View style={styles.imgWrapper}>
            <Image source={{uri: image.pan.uri}} style={styles.previewImg} />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => setImages(prev => ({...prev, pan: null}))}>
              <Image
                source={images.cross}
                style={{height: 12, width: 12}}
                tintColor={'white'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <ImageUpload onPress={() => openUpload('pan')} />
        )}
        {errors.pan && <ErrorBox error={errors.pan} />}

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

        {/* About Business */}
        <Input
          label="About Your Business"
          placeholder="Tell customers about your services.."
          style={{
            borderColor: COLOR.primary,
            height: 90,
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
          style={{borderColor: COLOR.primary}}
          value={experience}
          onChangeText={setExperience}
          error={errors.experience}
        />

        {/* Location */}
        <Input
          label="Exact Location"
          placeholder="Street, City, State, ZIP"
          style={{borderColor: COLOR.primary}}
          value={location}
          onChangeText={setLocation}
          error={errors.location}
        />

        {/* Website */}
        <Input
          label="Business Website (optional)"
          placeholder="https://yourbusiness.com"
          style={{borderColor: COLOR.primary}}
          value={website}
          onChangeText={setWebsite}
          error={errors.website}
        />

        {/* GST */}
        <Input
          label="GSTIN No."
          placeholder="Enter GST Number"
          style={{borderColor: COLOR.primary}}
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
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLOR.black,
  },
});
