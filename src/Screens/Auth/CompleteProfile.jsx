import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import HomeHeader from '../../Components/HomeHeader';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const CompleteProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Complete Your Profile"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
        onLeftPress={() => navigation.goBack()}
      />

      {/* Keyboard handling */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Info Text */}
          <Text style={styles.infoText}>
            Please provide accurate and complete information.
          </Text>

          {/* Section Title */}
          <Text style={styles.sectionTitle}>Business Information</Text>

          {/* Photo Verification */}
          {/* <Text style={styles.label}>Photo Verification</Text>
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={styles.uploadBtnText}>📷 Live Photo Verification</Text>
          </TouchableOpacity> */}

          {/* Business Proof */}
          <Text style={styles.label}>Business Proof</Text>
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={styles.uploadBtnText}>
              📄Upload Business Proof Image
            </Text>
          </TouchableOpacity>

          {/* Aadhaar Verification */}
          <Text style={styles.label}>Aadhaar Card Verification</Text>
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={styles.uploadBtnText}>📄 Front Side Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={styles.uploadBtnText}>📄 Back Side Image</Text>
          </TouchableOpacity>

          {/*  PAN Card */}
          <Text style={styles.label}>PAN Card</Text>
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={styles.uploadBtnText}>📄Upload PAN Card Image</Text>
          </TouchableOpacity>

          {/* About Business */}
          <Text style={styles.label}>About Your Business</Text>
          <TextInput
            style={[styles.input, {height: 90, textAlignVertical: 'top'}]}
            placeholder="Tell customers about your services, experience and what makes you unique..."
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
          <Text style={styles.label}>GSTIN No.</Text>
          <TextInput
            style={styles.input}
            placeholder="GSTIN"
            value={''}
            placeholderTextColor={'black'}
            onChangeText={() => {}}
          />
          {/* Next Button */}
          <CustomButton
            title="Next"
            onPress={() => navigation.navigate('Availability')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
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
    marginTop: 12,
    marginBottom: 6,
  },
  uploadBtn: {
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadBtnText: {
    color: COLOR.white,
    fontSize: 15,
    fontWeight: '600',
  },
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
});
