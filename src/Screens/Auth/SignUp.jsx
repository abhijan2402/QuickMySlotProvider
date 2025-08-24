import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../Components/HomeHeader';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const SignUp = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Sign Up"
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
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Enter your full name" />

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            keyboardType="email-address"
          />

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          {/* Service Category */}
          <Text style={styles.label}>Service Category</Text>
          <TextInput style={styles.input} placeholder="Service Category" />

          {/* Location / Area */}
          <Text style={styles.label}>Location/Area Served</Text>
          <TextInput style={styles.input} placeholder="Location/Area" />

          {/* Business Name */}
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your business name"
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIconContainer}>
              <Image
                source={{
                  uri: showPassword
                    ? 'https://cdn-icons-png.flaticon.com/128/158/158746.png' // eye open
                    : 'https://cdn-icons-png.flaticon.com/128/709/709612.png', // eye closed
                }}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIconContainer}>
              <Image
                source={{
                  uri: showConfirmPassword
                    ? 'https://cdn-icons-png.flaticon.com/128/158/158746.png'
                    : 'https://cdn-icons-png.flaticon.com/128/709/709612.png',
                }}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <CustomButton title="Sign Up" onPress={() => {}} />

          {/* Google Sign Up */}
          <TouchableOpacity style={styles.googleLoginContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/281/281764.png',
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>SignUp Using Google</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    color: COLOR.black,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLOR.black,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 6,
    marginBottom: 10,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLOR.black,
  },
  eyeIconContainer: {
    padding: 5,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  googleLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 15,
    marginBottom: 50,
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  googleText: {
    fontSize: 15,
    color: COLOR.black,
    fontWeight: '500',
  },
});
