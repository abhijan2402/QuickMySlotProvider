import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import DropdownCommon from '../../../Components/UI/DropdownCommon';
import {Font} from '../../../Constants/Font';
import DatePickerModal from '../../../Components/UI/DatePicker';
import {
  ADD_SUB_SERVICES,
  CATEGORY,
  SERVICE,
  UPDATE_SERVICE,
} from '../../../Constants/ApiRoute';
import {GET_WITH_TOKEN, POST_FORM_DATA} from '../../../Backend/Api';
import {useIsFocused} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import moment from 'moment';
import AvailabilityManagement from './AvailabilityManagement';

const AddService = ({route, navigation}) => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState();
  console.log(category);
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [discount, setDiscount] = useState(false);
  const [service, setService] = useState('');
  const [serviceData, setServiceData] = useState([]);
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
  const data = route?.params?.data;
  console.log(data, 'dsauyiwequyi778877787');
  const isEditing = route?.params?.isEditing;
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  console.log(errors);
  const isFocus = useIsFocused();
  const [categoryList, setCategoryList] = useState([]);
  const userdata = useSelector(store => store.userDetails);

  useEffect(() => {
    if (isFocus) {
      GetSubServices();
      setServiceName(data?.name);
      setDescription(data?.description);
      setPrice(data?.price);
      setDuration(data?.duration);
      setImage(data?.image ? {path: data?.image} : null);
      setGender(data?.gender);

      // ✅ Convert `addons` object to array
      const parsedAddons = data?.addons
        ? Object.entries(data.addons).map(([name, price], index) => ({
            id: index + 1,
            name,
            price: price.toString(),
          }))
        : [{id: 1, name: '', price: ''}];
      setAddons(parsedAddons);

      // ✅ Convert `peak_hours` object to array
      const parsedPeakHours = data?.peak_hours
        ? Object.entries(data.peak_hours).map(([timeRange, price], index) => {
            const [startTime, endTime] = timeRange.split('-');
            return {
              id: index + 1,
              startTime: moment(startTime, 'HH:mm').toDate(),
              endTime: moment(endTime, 'HH:mm').toDate(),
              price: price.toString(),
            };
          })
        : [{id: 1, startTime: '', endTime: '', price: ''}];
      setPeakHours(parsedPeakHours);
    }
  }, [isFocus]);

  const GetSubServices = () => {
    setLoading(true);

    GET_WITH_TOKEN(
      ADD_SUB_SERVICES,
      success => {
        console.log(success, 'successsuccesssuccess-->>>');
        setLoading(false);

        const d =
          success?.data?.map(v => ({
            value: v?.id,
            label: v?.name,
          })) || [];

        setServiceData(d);

        const selectedService = d.find(v => data?.service_id === v.value);
        setService(selectedService || null);
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
      // category: validators.checkRequire('Category', category),
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
    return Object.values(validationErrors).every(error => !error);
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
    formData.append('category_id', userdata?.service_category);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('gender', gender?.value);
    formData.append('service_id', service?.value);
    if (image?.mime) {
      formData.append('image', {
        uri: image?.path || image?.uri,
        type: image?.mime || 'image/jpeg',
        name: image?.filename || 'service.jpg',
      });
    }
    addons.forEach((addon, index) => {
      if (addon.name && addon.price) {
        formData.append(`addons[${addon.name}]`, addon.price);
        // formData.append(`addons[${index}][price]`, addon.price);
      }
    });
    // Add peak hours to formData
    peakHours.forEach((peakHour, index) => {
      if (peakHour.startTime && peakHour.endTime && peakHour.price) {
        formData.append(
          `peak_hours[${moment(peakHour.startTime).format('HH:mm')}-${moment(
            peakHour.endTime,
          ).format('HH:mm')}]`,
          `${peakHour.price}`,
        );
        // formData.append(`peak_hours[${index}][price]`, peakHour.price);
      }
    });
    console.log(formData, 'formDataformDataformDataformData');

    if (isEditing) {
      POST_FORM_DATA(
        UPDATE_SERVICE + data?.id,
        formData,
        success => {
          setLoading(false);
          console.log(success);
          navigation.goBack();
          ToastMsg(success?.message);
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
    } else {
      POST_FORM_DATA(
        SERVICE,
        formData,
        success => {
          setLoading(false);
          console.log(success);
          navigation.goBack();
          ToastMsg(success?.message);
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
        {/* <Text style={[styles.label, {marginTop: 18}]}>Category</Text> */}
        {/* <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={categoryList}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder="Select Category Type"
          value={category} // category will hold the selected id
          onChange={item => setCategory(item.value)} // store id when selected
        />
        {errors.category && <ErrorBox error={errors.category} />} */}

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

        <DropdownCommon
          label="Service"
          data={serviceData}
          value={service}
          onChange={v => setService(v)}
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
          // fontWeight="600"
          font={Font.semibold}
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
          font={Font.semibold}
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
                mainStyle={{width: '40%', marginTop: 0}}
                error={errors[`addonName_${index}`]}
              />
              <Input
                placeholder="Price ($)"
                value={addon.price}
                onChangeText={text => updateAddon(addon.id, 'price', text)}
                keyboardType="decimal-pad"
                mainStyle={{width: '40%', marginTop: 0}}
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
          <Typography
            font={Font.semibold}
            size={12}
            color="#777"
            style={styles.subNote}>
            Allows this service to be booked during peak times with extra
            charges.
          </Typography>
        </View>

        <AvailabilityManagement />
      </KeyboardAwareScrollView>

      {/* Add Button */}
      <Button
        title={loading ? 'Adding...' : 'Add Service'}
        onPress={handleSubmit}
        disabled={loading}
        containerStyle={{
          width: '90%',
          marginTop: 10,
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
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Font.semibold,
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
});
