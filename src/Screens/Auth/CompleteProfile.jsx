import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
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

  // Error state
  const [errors, setErrors] = useState({});

  const handleSelect = response => {
    if (currentField) {
      setImages(prev => ({
        ...prev,
        [currentField]: response.path || response[0]?.path,
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
      newErrors.PhotoVerifi = 'Photo Verification is required';
    if (!image.businessProof)
      newErrors.businessProof = 'Business Proof is required';
    if (!image.aadhaarFront)
      newErrors.aadhaarFront = 'Aadhaar Front is required';
    if (!image.pan) newErrors.pan = 'PAN Card is required';

    if (!about.trim())
      newErrors.about = 'Please enter details about your business';
    if (!experience.trim()) newErrors.experience = 'Experience is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!gst.trim()) newErrors.gst = 'GST Number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate('Availability');
    }
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Complete Your Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
        onLeftPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
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
              Please make sure to provide accurate and complete business
              details, including valid proof documents. This helps us verify
              your profile and improves customer trust.
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
          <Typography size={14} fontWeight="500" color={COLOR.black} style={{marginTop: 20, marginBottom: 6}}>
            Photo Verification
          </Typography>
          {image.PhotoVerifi ? (
            <View style={styles.imgWrapper}>
              <Image
                source={{uri: image.PhotoVerifi}}
                style={styles.previewImg}
              />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  setImages(prev => ({...prev, PhotoVerifi: null}))
                }>
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
          <Typography size={14} fontWeight="500" color={COLOR.black} style={{marginTop: 20, marginBottom: 6}}>
            Business Proof
          </Typography>
          {image.businessProof ? (
            <View style={styles.imgWrapper}>
              <Image
                source={{uri: image.businessProof}}
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
          <Typography size={14} fontWeight="500" color={COLOR.black} style={{marginTop: 20, marginBottom: 6}}>
            Aadhaar Card Verification
          </Typography>
          {image.aadhaarFront ? (
            <View style={styles.imgWrapper}>
              <Image
                source={{uri: image.aadhaarFront}}
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
          <Typography size={14} fontWeight="500" color={COLOR.black} style={{marginTop: 20, marginBottom: 6}}>
            PAN Card
          </Typography>
          {image.pan ? (
            <View style={styles.imgWrapper}>
              <Image source={{uri: image.pan}} style={styles.previewImg} />
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

          {/* About Business */}
          <Input
            label="About Your Business"
            placeholder="Tell customers about your services.."
            style={{
              borderColor: COLOR.primary,
              height: 90,
              textAlignVertical: 'top',
            }}
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
        </ScrollView>
      </KeyboardAvoidingView>

      <Button title="Next" onPress={handleNext} />

      <ImageModal
        showModal={showModal}
        close={() => setShowModal(false)}
        selected={handleSelect}
        mediaType="photo"
      />
    </View>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 15},
  scrollContainer: {paddingHorizontal: 10, paddingTop: 10, paddingBottom: 50},
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
});
