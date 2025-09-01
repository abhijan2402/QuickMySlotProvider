import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../../Components/HomeHeader';
import {COLOR} from '../../../Constants/Colors';
import {Typography} from '../../../Components/UI/Typography';
import ImageModal from '../../../Components/UI/ImageModal';
import ImageUpload from '../../../Components/UI/ImageUpload';
import {images} from '../../../Components/UI/images';
import {windowWidth} from '../../../Constants/Dimensions';
import Input from '../../../Components/Input';
import Button from '../../../Components/UI/Button';
import {ErrorBox} from '../../../Components/UI/ErrorBox';
import {validators} from '../../../Backend/Validator';
import useKeyboard from '../../../Constants/Utility';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [discount, setDiscount] = useState(false);
  const [peak, setPeak] = useState(false);
    const {isKeyboardVisible} = useKeyboard();
  

  // image upload states
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // validation error state
  const [errors, setErrors] = useState({});

  const handleImageSelected = (response, type) => {
    if (Array.isArray(response)) {
      setImage(response[0].path);
    } else {
      setImage(response.path);
    }
    setShowModal(false);
  };

  const validateForm = () => {
    let validationErrors = {
      serviceName: validators.checkRequire('Service Name', serviceName),
      description: validators.checkRequire('Description', description),
      category: validators.checkRequire('Category', category),
      price: validators.checkRequire('Price', price),
      duration: validators.checkRequire('Duration', duration),
      image: validators.checkRequire('Service Image', image),
    };

    setErrors(validationErrors);

    return Object.values(validationErrors).every(error => error === '');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('✅ Form is valid. Proceed with API call or submission...');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : isKeyboardVisible ? 'height' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
      style={styles.container}>
      <HomeHeader
        title="Add New service"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <KeyboardAwareScrollView style={styles.content}>
        {/* Service Name */}
        <Input
          label="Service Name"
          placeholder="eg., Haircut & Styling"
          value={serviceName}
          onChangeText={setServiceName}
          showStar
          error={errors.serviceName}
        />

        {/* Description */}
        <Input
          label="Description"
          placeholder="Briefly describe the service..."
          value={description}
          onChangeText={setDescription}
          multiline
          error={errors.description}
        />

        {/* Category */}
        <Input
          label="Service Category"
          placeholder="Select a Service"
          value={category}
          onChangeText={setCategory}
          error={errors.category}
        />

        {/* Price */}
        <Input
          label="Price ($)"
          placeholder="eg., 45.00"
          value={price}
          onChangeText={setPrice}
          error={errors.price}
        />

        {/* Duration */}
        <Input
          label="Estimated Duration (minutes)"
          placeholder="eg., 45"
          value={duration}
          onChangeText={setDuration}
          error={errors.duration}
        />

        {/* Upload Image */}
        <Typography
          size={14}
          fontWeight="600"
          color="#333"
          style={[styles.label, {marginTop: 20}]}>
          Service Image (Optional)
        </Typography>

        {image ? (
          <View style={styles.imgWrapper}>
            <Image source={{uri: image}} style={styles.previewImg} />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => setImage(null)}>
              <Image
                source={images.cross}
                style={{height: 12, width: 12}}
                tintColor={'white'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <ImageUpload onPress={() => setShowModal(true)} />
        )}
        <Typography
          size={12}
          color="#777"
          style={[styles.note, {marginBottom: 0}]}>
          Max file size: 2MB. JPG, PNG allowed.
        </Typography>
        {/* show error below image */}
        {errors.image && <ErrorBox error={errors.image} />}

        {/* Checkboxes */}
        <TouchableOpacity
          style={[styles.checkboxContainer, {marginTop: 20}]}
          onPress={() => setDiscount(!discount)}>
          <View style={[styles.checkbox, discount && styles.checkboxChecked]} />
          <Typography size={14} color="#333" style={styles.checkboxText}>
            Offer as Discounted Service (5% App Margin)
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setPeak(!peak)}>
          <View style={[styles.checkbox, peak && styles.checkboxChecked]} />
          <Typography size={14} color="#333" style={styles.checkboxText}>
            Can be offered as Peak Service (25% App Margin)
          </Typography>
        </TouchableOpacity>

        <Typography size={12} color="#777" style={styles.subNote}>
          Allows this service to be booked during peak times with extra charges.
        </Typography>
      </KeyboardAwareScrollView>

      {/* Add Button */}
      <Button title={'Add'} onPress={handleSubmit} />

      {/* Image Modal */}
      <ImageModal
        showModal={showModal}
        close={() => setShowModal(false)}
        selected={handleImageSelected}
      />
    </KeyboardAvoidingView>
  );
};

export default AddService;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 15},
  content: {paddingHorizontal: 5, paddingBottom: 55, marginTop: 0},
  label: {marginBottom: 5},
  note: {marginBottom: 15, marginTop: 5},
  imgWrapper: {
    position: 'relative',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 10,
    borderRadius: 4,
  },
  checkboxChecked: {backgroundColor: COLOR.primary},
  checkboxText: {flexShrink: 1},
  subNote: {marginTop: 5, marginBottom: 20},
});
