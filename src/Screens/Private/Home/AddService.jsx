import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../../Components/HomeHeader';
import {COLOR} from '../../../Constants/Colors';

const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [discount, setDiscount] = useState(false);
  const [peak, setPeak] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <HomeHeader
        title="Add New service"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      {/* Wrap everything below header in content */}
      <View style={styles.content}>
        {/* Service Name */}
        <Text style={styles.label}>Service Name</Text>
        <TextInput
          style={styles.input}
          placeholder="eg., Haircut & Styling"
          value={serviceName}
          onChangeText={setServiceName}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, {height: 80}]}
          placeholder="Briefly describe the service..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Category */}
        <Text style={styles.label}>Service Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Select a Service"
          value={category}
          onChangeText={setCategory}
        />

        {/* Price */}
        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="eg., 45.00"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Duration */}
        <Text style={styles.label}>Estimated Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          placeholder="eg., 45"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />

        {/* Upload Image */}
        <Text style={styles.label}>Service Image (Optional)</Text>
        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={{color: '#fff', fontWeight: '600'}}>Upload Image</Text>
        </TouchableOpacity>
        <Text style={styles.note}>Max file size: 2MB. JPG, PNG allowed.</Text>

        {/* Checkboxes */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setDiscount(!discount)}>
          <View style={[styles.checkbox, discount && styles.checkboxChecked]} />
          <Text style={styles.checkboxText}>
            Offer as Discounted Service (5% App Margin)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setPeak(!peak)}>
          <View style={[styles.checkbox, peak && styles.checkboxChecked]} />
          <Text style={styles.checkboxText}>
            Can be offered as Peak Service (25% App Margin)
          </Text>
        </TouchableOpacity>
        <Text style={styles.subNote}>
          Allows this service to be booked during peak times with extra charges.
        </Text>

        {/* Add Button */}
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddService;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {
    paddingHorizontal: 20, // 👈 added horizontal padding for all inner content
    paddingBottom: 55,
  },
  label: {fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#333'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 15,
  },
  uploadBtn: {
    backgroundColor: COLOR.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
  },
  note: {fontSize: 12, color: '#777', marginBottom: 15},
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
  checkboxText: {fontSize: 14, color: '#333', flexShrink: 1},
  subNote: {fontSize: 12, color: '#777', marginTop: 5, marginBottom: 20},
  addBtn: {
    backgroundColor: COLOR.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addBtnText: {color: '#fff', fontWeight: '700', fontSize: 16},
});
