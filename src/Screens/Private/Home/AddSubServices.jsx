import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Input from '../../../Components/Input';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {validators} from '../../../Backend/Validator';
import {isValidForm} from '../../../Backend/Utility';
import {ErrorBox} from '../../../Components/UI/ErrorBox';
import useKeyboard from '../../../Constants/Utility';
import Button from '../../../Components/UI/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  ADD_BANK,
  ADD_SUB_SERVICES,
  UPDATE_BANK,
} from '../../../Constants/ApiRoute';
import {POST_FORM_DATA, POST_WITH_TOKEN} from '../../../Backend/Api';
import {useIsFocused} from '@react-navigation/native';
import {Typography} from '../../../Components/UI/Typography';
import {images} from '../../../Components/UI/images';
import ImageUpload from '../../../Components/UI/ImageUpload';
import ImageModal from '../../../Components/UI/ImageModal';
import {Font} from '../../../Constants/Font';

const AddSubServices = ({navigation, route}) => {
  const [subServices, setSubServices] = useState('');
  const {isKeyboardVisible} = useKeyboard();
  const [loading, setLoading] = useState(false);
  const data = route?.params?.data;
  console.log(data, 'dsadsawqewqewqefsdcbgfhyjuuy');
  const isEditing = route?.params?.isEditing;
  const [error, setError] = useState({});
  const isFocus = useIsFocused();
  const [image, setImage] = useState(null);
  console.log(image?.path, 'dasdasdkdsjasodhuyoeuqiwdjaed');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isFocus) {
      setSubServices(data?.name);
      setImage({path: data?.image_url});
    }
  }, [isFocus]);

  // validation error state

  const handleImageSelected = (response, type) => {
    if (Array.isArray(response)) {
      setImage(response[0]);
    } else {
      setImage(response);
    }
    setShowModal(false);
  };

  const handleSubmit = () => {
    let validationErrors = {
      setSubServices: validators.checkRequire('Name', subServices),
      image: validators.checkRequire('Sub Service Image', image),
    };

    setError(validationErrors);

    if (isValidForm(validationErrors)) {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', subServices);
      if (image?.mime) {
        formData.append('image', {
          uri: image.path || image.uri,
          type: image.mime || 'image/jpeg',
          name: image.filename || 'service.jpg',
        });
      }
      POST_FORM_DATA(
        isEditing ? ADD_SUB_SERVICES + '/' + data?.id : ADD_SUB_SERVICES,
        formData,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
          navigation.goBack();
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
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : isKeyboardVisible
          ? 'height'
          : undefined
      }
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}>
      <HomeHeader
        title={isEditing ? 'Edit Sub Services' : 'Add Sub Services'}
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <KeyboardAwareScrollView
        style={{paddingHorizontal: 5}}
        contentContainerStyle={styles.container}>
        <Input
          label="Sub Service Name"
          placeholder="Enter Sub Service name"
          value={subServices}
          onChangeText={setSubServices}
          style={{borderColor: COLOR.primary, fontFamily: Font.medium}}
          error={error.setSubServices}
        />
        {/* Upload Image */}
        <Typography
          size={14}
          font={Font.semibold}
          style={[styles.label, {marginTop: 20}]}>
          Sub Service Image
        </Typography>
        {image?.path ? (
          <View style={styles.imgWrapper}>
            <Image
              source={{uri: image.path || image.uri || image}}
              style={styles.previewImg}
            />
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
          font={Font.semibold}
          style={[styles.note, {marginTop: 5}]}>
          Max file size: 2MB. JPG, PNG allowed.
        </Typography>
        {/* show error below image */}
        {error.image && <ErrorBox error={error.image} />}
      </KeyboardAwareScrollView>

      <Button
        loading={loading}
        title={isEditing ? 'Edit' : 'Submit'}
        onPress={handleSubmit}
      />
      <ImageModal
        showModal={showModal}
        close={() => setShowModal(false)}
        selected={handleImageSelected}
      />
    </KeyboardAvoidingView>
  );
};

export default AddSubServices;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: COLOR.bgColor,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.black,
  },
  dropdown: {
    height: 50,
    borderColor: COLOR.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLOR.black,
  },
  button: {
    marginTop: 20,
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  previewImg: {
    height: 200,
    width: '100%',
    borderRadius: 20,
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
