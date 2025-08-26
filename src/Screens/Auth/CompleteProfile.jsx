import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
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
import DatePickerModal from '../../Components/UI/DatePicker';


const CompleteProfile = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [image, setImages] = useState({
    PhotoVerifi: null,
    businessProof: null,
    aadhaarFront: null,
    aadhaarBack: null,
    pan: null,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [openStartPicker, setOpenStartPicker] = useState(false);

  const handleSelect = (response, source) => {
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Info Text */}
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

          {/* Business Proof */}
          <Text style={styles.label}>Business Proof</Text>
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

          {/* Aadhaar Front */}
          <Text style={styles.label}>Aadhaar Card Verification</Text>
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

          {/* Aadhaar Back */}
          {/* {image.aadhaarBack ? (
            <View style={styles.imgWrapper}>
              <Image
                source={{uri: image.aadhaarBack}}
                style={styles.previewImg}
              />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  setImages(prev => ({...prev, aadhaarBack: null}))
                }>
                <Image
                  source={images.cross}
                  style={{height: 12, width: 12}}
                  tintColor={'white'}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => openUpload('aadhaarBack')}>
              <Text style={styles.uploadBtnText}>📄 Back Side Image</Text>
            </TouchableOpacity>
          )} */}

          {/* PAN Card */}
          <Text style={styles.label}>PAN Card</Text>
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

          {/* About Business */}
          <Text style={styles.label}>About Your Business</Text>
          <TextInput
            style={[styles.input, {height: 90, textAlignVertical: 'top'}]}
            placeholder="Tell customers about your services..."
            multiline
          />

          {/* Years of Experience */}
          <Text style={styles.label}>Years of Experience</Text>
          <TextInput
            style={styles.input}
            placeholder="ex., 5"
            keyboardType="numeric"
          />

          {/* Location */}
          <Text style={styles.label}>
            Exact Location (Street, City, State, Zip/Postal Code)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="ex., 123 Main Street, Anytown, CA 90210"
          />

          {/* Website */}
          <Text style={styles.label}>Business Website (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="ex., https://yourbusiness.com"
          />

          {/* GST */}
          <Text style={styles.label}>GSTIN No.</Text>
          <TextInput
            style={styles.input}
            placeholder="GSTIN"
            value={''}
            placeholderTextColor={'black'}
            onChangeText={() => {}}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomButton
        title="Next"
        style={{width: '90%'}}
        onPress={() => navigation.navigate('Availability')}
      />

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
    marginTop: 8,
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
