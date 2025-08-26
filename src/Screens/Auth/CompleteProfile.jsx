

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import HomeHeader from '../../Components/HomeHeader';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import ImageModal from '../../Components/UI/ImageModal';
import {windowWidth} from '../../Constants/Dimensions';
import {images} from '../../Components/UI/images';
import ImageUpload from '../../Components/UI/ImageUpload';
import Input from '../../Components/Input';
import {ErrorBox} from '../../Components/UI/ErrorBox';

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

  const handleSelect = (response) => {
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

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    if (!image.PhotoVerifi) newErrors.PhotoVerifi = 'Photo Verification is required';
    if (!image.businessProof) newErrors.businessProof = 'Business Proof is required';
    if (!image.aadhaarFront) newErrors.aadhaarFront = 'Aadhaar Front is required';
    if (!image.pan) newErrors.pan = 'PAN Card is required';

    if (!about.trim()) newErrors.about = 'Please enter details about your business';
    if (!experience.trim()) newErrors.experience = 'Experience is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!gst.trim()) newErrors.gst = 'GST Number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // if (validateForm()) {
      navigation.navigate('Availability');
    // }
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
              marginBottom: 15,
              backgroundColor: COLOR.lightYellow,
              padding: 10,
              borderRadius: 6,
            }}>
            <Image
              style={{width: 20, height: 20, marginBottom: 5, marginRight: 6}}
              source={images.warning}
            />
            <Text
              style={{
                fontSize: 13,
                color: '#555',
                marginEnd: 20,
                marginBottom: 10,
              }}>
              Please make sure to provide accurate and complete business
              details, including valid proof documents. This helps us verify
              your profile and improves customer trust.{' '}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Business Information</Text>

          {/* Photo Verification */}
          <Text style={styles.label}>Photo Verification</Text>
          {image.PhotoVerifi ? (
            <View style={styles.imgWrapper}>
              <Image source={{uri: image.PhotoVerifi}} style={styles.previewImg} />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => setImages(prev => ({...prev, PhotoVerifi: null}))}>
                <Image source={images.cross} style={{height: 12, width: 12}} tintColor={'white'} />
              </TouchableOpacity>
            </View>
          ) : (
            <ImageUpload onPress={() => openUpload('PhotoVerifi')} />
          )}
          {errors.PhotoVerifi && <ErrorBox error={errors.PhotoVerifi} />}

          {/* Business Proof */}
          <Text style={styles.label}>Business Proof</Text>
          {image.businessProof ? (
            <View style={styles.imgWrapper}>
              <Image source={{uri: image.businessProof}} style={styles.previewImg} />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => setImages(prev => ({...prev, businessProof: null}))}>
                <Image source={images.cross} style={{height: 12, width: 12}} tintColor={'white'} />
              </TouchableOpacity>
            </View>
          ) : (
            <ImageUpload onPress={() => openUpload('businessProof')} />
          )}
          {errors.businessProof &&<ErrorBox error={errors.businessProof} />}

          {/* Aadhaar Front */}
          <Text style={styles.label}>Aadhaar Card Verification</Text>
          {image.aadhaarFront ? (
            <View style={styles.imgWrapper}>
              <Image source={{uri: image.aadhaarFront}} style={styles.previewImg} />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => setImages(prev => ({...prev, aadhaarFront: null}))}>
                <Image source={images.cross} style={{height: 12, width: 12}} tintColor={'white'} />
              </TouchableOpacity>
            </View>
          ) : (
            <ImageUpload onPress={() => openUpload('aadhaarFront')} />
          )}
          {errors.aadhaarFront &&<ErrorBox error={errors.aadhaarFront} />}

          {/* PAN */}
          <Text style={styles.label}>PAN Card</Text>
          {image.pan ? (
            <View style={styles.imgWrapper}>
              <Image source={{uri: image.pan}} style={styles.previewImg} />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => setImages(prev => ({...prev, pan: null}))}>
                <Image source={images.cross} style={{height: 12, width: 12}} tintColor={'white'} />
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
            style={{borderColor: COLOR.primary, height: 90, textAlignVertical: 'top'}}
            value={about}
            onChangeText={setAbout}
          />
          {errors.about && <ErrorBox error={errors.about} />}

          {/* Experience */}
          <Input
            label="Years of Experience"
            placeholder="Enter Your Experience"
            style={{borderColor: COLOR.primary}}
            value={experience}
            onChangeText={setExperience}
          />
          {errors.experience &&<ErrorBox error={errors.experience} />}

          {/* Location */}
          <Input
            label="Exact Location"
            placeholder="Street, City, State, ZIP"
            style={{borderColor: COLOR.primary}}
            value={location}
            onChangeText={setLocation}
          />
          { errors.location &&<ErrorBox error={errors.location} />}

          {/* Website (optional, no error) */}
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
          />
          { errors.gst && <ErrorBox error={errors.gst} />}
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomButton title="Next" style={{width: '90%'}} onPress={handleNext} />

      {/* Image Modal */}
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
  container: {flex: 1, backgroundColor: COLOR.white},
  scrollContainer: {padding: 20, paddingBottom: 50},
  infoText: {
    fontSize: 14,
    color: COLOR.yellow,
    fontWeight: '700',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.black,
    marginTop: 20,
    marginBottom: 6,
  },
  uploadBtn: {
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadBtnText: {color: COLOR.white, fontSize: 15, fontWeight: '600'},
  input: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLOR.black,
    marginBottom: 12,
  },
  imgWrapper: {
    position: 'relative',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  previewImg: {
    width: windowWidth * 0.9,
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
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
