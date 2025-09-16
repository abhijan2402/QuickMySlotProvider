import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import {validators} from '../../Backend/Validator';
import {isValidForm, ToastMsg} from '../../Backend/Utility';
import {ErrorBox} from '../../Components/UI/ErrorBox';
import Button from '../../Components/UI/Button';
import GoogleAuthButton from '../../Components/UI/GoogleAuthButton';
import {POST, useApi} from '../../Backend/Api';
import {SIGN_UP} from '../../Constants/ApiRoute';
import {isAuth, Token, userDetails} from '../../Redux/action';
import {ScrollView} from 'react-native';
import Input from '../../Components/Input';
import {Typography} from '../../Components/UI/Typography';
import {Font} from '../../Constants/Font';

const Login = ({navigation}) => {
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const onSubmit = () => {
    let error = {
      mobile: validators.checkNumber('Mobile Number', number),
    };
    setError(error);
    if (isValidForm(error)) {
      handleSignup();
    }
  };
  const handleSignup = async () => {
    setLoading(true);
    const body = {
      phone_number: number,
    };
    POST(
      SIGN_UP,
      body,
      success => {
        setLoading(false);
        navigation.navigate('OtpScreen', {
          id: success?.user_id,
          phoneNumber: number,
        });
      },
      error => {
        setLoading(false);
      },
      fail => {
        setLoading(false);
      },
    );
  };

  const handleLoginSuccess = user => {};
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLOR.white}}>
      <ScrollView style={{flex: 1}}>
        <LinearGradient
          colors={[COLOR.white, COLOR.white]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.container}>
          {/* Logo */}
          <Image
            source={require('../../assets/Images/logo.png')}
            style={styles.logo}
          />

          {/* Tagline */}
          <Typography
            size={18}
            color="#242524"
            textAlign="center"
            font={Font.medium}
            lineHeight={28}
            style={{width: windowWidth / 1.2, marginTop: 10}}>
            Get Bookings, Expand Business with QuickSlot
          </Typography>

          {/* Mobile Number Input */}
          <Input
            keyboardType="numeric"
            placeholder="Enter Mobile Number"
            value={number}
            onChangeText={text => setNumber(text)}
            error={error.mobile}
            text={'+ 91'}
            leftIcon={true}
            style={{marginLeft: 5, fontFamily: Font.semibold}}
          />

          {/* Continue Button */}
          <Button
            loading={loading}
            containerStyle={{marginTop: 30, width: '100%'}}
            title={'Continue'}
            onPress={onSubmit}
          />

          {/* Divider with text */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Typography size={14} color="#888" font={Font.medium}>
              Or
            </Typography>
            <View style={styles.divider} />
          </View>

          {/* Google Login Button */}
          <GoogleAuthButton onLoginSuccess={handleLoginSuccess} />

          {/* Register Section (if needed) */}
          {/* 
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don’t have an account? </Text>
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('SignUp')}>
            Register
          </Typography>
        </View> 
        */}
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 290,
    height: 200,
    marginTop: windowHeight * 0.1,
  },
  text: {
    fontSize: 18,
    color: '#242524FF',
    fontWeight: '600',
    width: windowWidth / 1.5,
    textAlign: 'center',
    lineHeight: 28,
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2196F3FF',
    backgroundColor: COLOR.white,
    borderRadius: 6,
    width: windowWidth - 40,
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  countryCode: {
    color: COLOR.black,
  },
  input: {
    flex: 1,
    color: COLOR.black,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth - 40,
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 14,
  },
  googleLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth - 40,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  googleText: {
    color: COLOR.black,
    fontSize: 16,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
  },
  registerText: {
    color: '#555',
    fontSize: 14,
  },
  registerLink: {
    color: COLOR.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
