import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ToastMsg} from '../../../Backend/Utility';
import {POST_FORM_DATA} from '../../../Backend/Api';
import DropdownCommon from '../../../Components/UI/DropdownCommon';
import {Font} from '../../../Constants/Font';
import DatePickerModal from '../../../Components/UI/DatePicker';

const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [discount, setDiscount] = useState(false);
  const [peak, setPeak] = useState(false);
  const [addons, setAddons] = useState([
    {
      id: 1,
      name: '',
      price: '',
    },
  ]);
  const [peakHours, setPeakHours] = useState([
    {
      id: 1,
      startTime: '',
      endTime: '',
      price: '',
    },
  ]);
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const {isKeyboardVisible} = useKeyboard();

  // image upload states
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // validation error state
  const [errors, setErrors] = useState({});

  const handleImageSelected = (response, type) => {
    if (Array.isArray(response)) {
      setImage(response[0]);
    } else {
      setImage(response);
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

    // Validate addons
    addons.forEach((addon, index) => {
      if (addon.name && !addon.price) {
        validationErrors[`addonPrice_${index}`] = 'Addon price is required';
      }
      if (!addon.name && addon.price) {
        validationErrors[`addonName_${index}`] = 'Addon name is required';
      }
    });

    // Validate peak hours
    peakHours.forEach((peakHour, index) => {
      if ((peakHour.startTime || peakHour.endTime) && !peakHour.price) {
        validationErrors[`peakPrice_${index}`] = 'Peak hour price is required';
      }
      if (peakHour.startTime && !peakHour.endTime) {
        validationErrors[`peakEndTime_${index}`] = 'End time is required';
      }
      if (!peakHour.startTime && peakHour.endTime) {
        validationErrors[`peakStartTime_${index}`] = 'Start time is required';
      }
    });

    setErrors(validationErrors);
    return Object.values(validationErrors).every(error => error === '');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      submit();
    }
  };

  const submit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('description', description);
    formData.append('category_id', category);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('gender', gender);

    if (image) {
      formData.append('image', {
        uri: image.path || image.uri,
        type: image.mime || 'image/jpeg',
        name: image.filename || 'service.jpg',
      });
    }

    // Add addons to formData
    addons.forEach((addon, index) => {
      if (addon.name && addon.price) {
        formData.append(`addons[${index}][name]`, addon.name);
        formData.append(`addons[${index}][price]`, addon.price);
      }
    });

    // Add peak hours to formData
    peakHours.forEach((peakHour, index) => {
      if (peakHour.startTime && peakHour.endTime && peakHour.price) {
        formData.append(
          `peak_hours[${index}][time_range]`,
          `${peakHour.startTime}-${peakHour.endTime}`,
        );
        formData.append(`peak_hours[${index}][price]`, peakHour.price);
      }
    });

    // Replace 'SERVICE' with your actual API endpoint
    POST_FORM_DATA(
      'SERVICE', // Your API endpoint
      formData,
      success => {
        setLoading(false);
        ToastMsg(success?.message);
        // Reset form on success if needed
      },
      error => {
        setLoading(false);
        ToastMsg(error?.message);
      },
      fail => {
        setLoading(false);
      },
    );
  };

  const addAddon = () => {
    setAddons([...addons, {id: Date.now(), name: '', price: ''}]);
  };

  const removeAddon = id => {
    if (addons.length > 1) {
      setAddons(addons.filter(addon => addon.id !== id));
    }
  };

  const updateAddon = (id, field, value) => {
    setAddons(
      addons.map(addon =>
        addon.id === id ? {...addon, [field]: value} : addon,
      ),
    );
  };

  const addPeakHour = () => {
    setPeakHours([
      ...peakHours,
      {id: Date.now(), startTime: '', endTime: '', price: ''},
    ]);
  };

  const removePeakHour = id => {
    if (peakHours.length > 1) {
      setPeakHours(peakHours.filter(peakHour => peakHour.id !== id));
    }
  };

  const updatePeakHour = (id, field, value) => {
    setPeakHours(
      peakHours.map(peakHour =>
        peakHour.id === id ? {...peakHour, [field]: value} : peakHour,
      ),
    );
  };

  const handleTimeChange = (id, type, time) => {
    updatePeakHour(id, type === 'start' ? 'startTime' : 'endTime', time);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      style={styles.container}>
      <HomeHeader
        title="Add New service"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        {/* Service Name */}
        <Input
          label="Service Name"
          placeholder="eg., Haircut & Styling"
          value={serviceName}
          onChangeText={setServiceName}
          error={errors.serviceName}
        />

        {/* Description */}
        <Input
          label="Description"
          placeholder="Briefly describe the service..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
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
          keyboardType="decimal-pad"
          error={errors.price}
        />

        {/* Gender Dropdown */}
        <DropdownCommon
          label="Gender"
          data={[
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'},
            {value: 'other', label: 'Other'},
          ]}
          value={gender}
          onChange={v => setGender(v)}
          placeholder="Select Gender"
          error={errors.gender}
        />

        {/* Duration */}
        <Input
          label="Estimated Duration (minutes)"
          placeholder="eg., 45"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          error={errors.duration}
        />

        {/* Upload Image */}
        <Typography
          size={14}
          fontWeight="600"
          color="#333"
          style={[styles.label, {marginTop: 20}]}>
          Service Image
        </Typography>
        {image ? (
          <View style={styles.imgWrapper}>
            <Image
              source={{uri: image.path || image.uri}}
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
          style={[styles.note, {marginBottom: 0}]}>
          Max file size: 2MB. JPG, PNG allowed.
        </Typography>
        {/* show error below image */}
        {errors.image && <ErrorBox error={errors.image} />}

        {/* Addons Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography style={styles.sectionTitle}>Addons</Typography>
            <TouchableOpacity onPress={addAddon} style={styles.addButton}>
              <Image source={images.add} style={styles.addIcon} />
            </TouchableOpacity>
          </View>

          {addons.map((addon, index) => (
            <View key={addon.id} style={styles.addonRow}>
              <Input
                placeholder="Addon name"
                value={addon.name}
                onChangeText={text => updateAddon(addon.id, 'name', text)}
                mainStyle={{width: '40%'}}
                error={errors[`addonName_${index}`]}
              />
              <Input
                placeholder="Price ($)"
                value={addon.price}
                onChangeText={text => updateAddon(addon.id, 'price', text)}
                keyboardType="decimal-pad"
                mainStyle={{width: '40%'}}
                error={errors[`addonPrice_${index}`]}
              />
              <TouchableOpacity
                disabled={index == 0}
                onPress={() => removeAddon(addon.id)}
                style={[styles.removeButton, {marginTop: 15}]}>
                {index != 0 && (
                  <Image source={images.close} style={styles.removeIcon} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Peak Hours Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography style={styles.sectionTitle}>Peak Hours</Typography>
            <TouchableOpacity onPress={addPeakHour} style={styles.addButton}>
              <Image source={images.add} style={styles.addIcon} />
            </TouchableOpacity>
          </View>

          {peakHours.map((peakHour, index) => (
            <View
              key={peakHour.id}
              style={[
                styles.peakHourRow,
                {
                  justifyContent: 'space-between',
                  // flexDirection: 'column',
                },
              ]}>
              <DatePickerModal
                mode={'time'}
                value={peakHour.startTime}
                onChange={time => handleTimeChange(peakHour.id, 'start', time)}
                placeholder="Start time"
              />
              <Typography style={styles.timeSeparator}>to</Typography>
              <DatePickerModal
                mode={'time'}
                value={peakHour.endTime}
                onChange={time => handleTimeChange(peakHour.id, 'end', time)}
                placeholder="End time"
              />
              <Input
                placeholder="Price ($)"
                value={peakHour.price}
                onChangeText={text =>
                  updatePeakHour(peakHour.id, 'price', text)
                }
                keyboardType="decimal-pad"
                mainStyle={{width: '30%', marginTop: -15, marginStart: 10}}
                error={errors[`peakPrice_${index}`]}
                style={{height: 48}}
              />
              <TouchableOpacity
                disabled={index == 0}
                onPress={() => removePeakHour(peakHour.id)}
                style={[
                  styles.removeButton,
                  {
                    marginTop: -15,
                  },
                ]}>
                {index != 0 && (
                  <Image source={images.close} style={styles.removeIcon} />
                )}
              </TouchableOpacity>
            </View>
          ))}
          <Typography size={12} color="#777" style={styles.subNote}>
            Allows this service to be booked during peak times with extra
            charges.
          </Typography>
        </View>
      </KeyboardAwareScrollView>

      {/* Add Button */}
      <Button
        title={loading ? 'Adding...' : 'Add Service'}
        onPress={handleSubmit}
        disabled={loading}
        containerStyle={{
          width: '90%',
          paddingTop: 15,
        }}
      />

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
  container: {flex: 1, backgroundColor: '#fff'},
  content: {flex: 1},
  scrollContent: {paddingHorizontal: 15, paddingBottom: 20},
  label: {
    marginBottom: 5,
    fontFamily: Font.medium,
    fontSize: 14,
    color: COLOR.black,
  },
  note: {marginBottom: 15, marginTop: 5},
  imgWrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: 10,
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
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
  },
  addButton: {
    padding: 6,
  },
  addIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  removeIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  addonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  peakHourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timePickers: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '55%',
    justifyContent: 'space-between',
  },
  timeSeparator: {
    marginHorizontal: 5,
  },
  subNote: {
    marginTop: 5,
  },
});
