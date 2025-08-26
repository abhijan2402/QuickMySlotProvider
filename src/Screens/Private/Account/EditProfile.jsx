import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import Input from '../../../Components/Input';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import ImageModal from '../../../Components/UI/ImageModal';

const EditProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [profileImage, setProfileImage] = useState(
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  );

  // Modal state
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = () => {
    console.log('Updated Profile:', {firstName, email, phone, profileImage});
    setIsEditing(false);
  };

  const handleImageSelected = (response, from) => {
    // for single image case
    if (response?.path) {
      setProfileImage(response.path);
    }
  };

  return (
    <View style={{flex: 1}}>
      <HomeHeader
        title="Edit Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      {/* Profile Image */}
      <View style={styles.profileSection}>
        <Image source={{uri: profileImage}} style={styles.profileImage} />

        {isEditing && (
          <TouchableOpacity
            style={styles.editIconWrapper}
            onPress={() => setShowModal(true)}>
            <Image
              source={require('../../../assets/Images/edit.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* 🚀 Promo Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🚀 Promote Your Business</Text>
          <View style={styles.promoBox}>
            <Text style={styles.promoTitle}>Boost Your Profile</Text>
            <Text style={styles.promoText}>
              Increase visibility and attract more customers by appearing{'\n'}
              higher in search results.
            </Text>
            <TouchableOpacity
              style={styles.boostBtn}
              onPress={() => navigation.navigate('BoostProfile')}>
              <Text style={styles.boostText}>View Plans</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Inputs */}
        <Input
          label="Name"
          placeholder="Enter Your name"
          value={firstName}
          labelStyle={{marginLeft: 30, marginTop: -10}}
          style={{borderColor: COLOR.primary}}
          onChangeText={setFirstName}
          editable={isEditing}
        />

        <Input
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          labelStyle={{marginLeft: 30}}
          style={{borderColor: COLOR.primary}}
          keyboardType="email-address"
          editable={isEditing}
        />

        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          labelStyle={{marginLeft: 30}}
          style={{borderColor: COLOR.primary}}
          keyboardType="phone-pad"
          editable={isEditing}
        />

        {/* Edit / Update Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (isEditing) handleUpdate();
            setIsEditing(prev => !prev);
          }}>
          <Text style={styles.buttonText}>{isEditing ? 'Update' : 'Edit'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Image Modal */}
      <ImageModal
        showModal={showModal}
        close={() => setShowModal(false)}
        selected={handleImageSelected}
        mediaType="photo"
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 20,
    alignSelf: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    backgroundColor: COLOR.white,
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: COLOR.primary,
  },
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: COLOR.bgColor,
  },
  button: {
    marginTop: 20,
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  promoBox: {
    backgroundColor: '#F2F7FF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0057FF',
    marginBottom: 6,
  },
  promoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 14,
  },
  boostBtn: {
    backgroundColor: '#2E86DE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  boostText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
