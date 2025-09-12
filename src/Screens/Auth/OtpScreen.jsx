import React, {useContext, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import {windowHeight} from '../../Constants/Dimensions';
import HomeHeader from '../../Components/HomeHeader';
import {AuthContext} from '../../Backend/AuthContent';
import {Typography} from '../../Components/UI/Typography'; // ✅ import Typography
import {POST} from '../../Backend/Api';
import {VERIFY_OTP} from '../../Constants/ApiRoute';
import {useDispatch} from 'react-redux';
import {Token, userDetails} from '../../Redux/action';
import {isValidForm, ToastMsg} from '../../Backend/Utility';
import {validators} from '../../Backend/Validator';

const OtpScreen = ({navigation, route}) => {
  const {setUser, setToken} = useContext(AuthContext);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  console.log(otp);

  const inputs = useRef([]);
  const id = route.params.id;
  console.log(id);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  console.log(error);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);

    // Move to next input automatically
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    // Close keyboard if last digit entered
    if (index === 5 && text) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = ({nativeEvent}, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const onSubmit = () => {
    const otpCode = otp.join('');
    if (!otpCode || otpCode.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setError('');
    if (isValidForm(error)) {
      verifyOtp();
    }
  };

  const verifyOtp = () => {
    const otpCode = otp.join('');
    console.log('Entered OTP:', otpCode);

    const body = {
      user_id: id,
      otp: otpCode,
    };
    POST(
      VERIFY_OTP,
      body,
      success => {
        console.log(success, 'successsuccesssuccess-->>>');
        setLoading(false);
        navigation.navigate('CompleteProfile');
        dispatch(Token(success?.token));
        dispatch(userDetails(success?.user));
      },
      error => {
        console.log(error, 'errorerrorerror>>');
        setLoading(false);
      },
      fail => {
        setLoading(false);
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        title="OTP Verification"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/9042/9042592.png',
        }}
        style={styles.image}
      />

      <View style={{padding: 20, alignItems: 'center'}}>
        <Typography
          size={18}
          fontWeight="800"
          color={COLOR.black}
          lineHeight={20}>
          OTP Verification
        </Typography>

        <Typography
          size={14}
          color={COLOR.black}
          textAlign="center"
          lineHeight={20}
          style={{marginTop: 10}}>
          We have sent a 6-digit verification code to your registered mobile
          number ending in **** 1234. Please enter it below.
        </Typography>
      </View>

      {/* OTP Input Fields */}
      <View style={[styles.otpContainer,{marginBottom:error? 0:  windowHeight * 0.06}]}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        ))}
      </View>
      {error ? (
        <Typography
          size={13}
          color="red"
          textAlign=""
          style={{marginBottom: windowHeight * 0.06,marginTop:10,marginHorizontal:20}}>
          {error}
        </Typography>
      ) : null}

      <CustomButton
        loading={loading}
        title={'Verify'}
        onPress={() => {
          onSubmit();
        }}
      />

      <View
        style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
        <Typography size={14} color={COLOR.black}>
          Didn't receive the code?{' '}
        </Typography>
        <Typography
          size={14}
          color={COLOR.primary}
          fontWeight="600"
          onPress={() => console.log('Resend OTP pressed')}>
          Resend OTP
        </Typography>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  image: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
    marginTop: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 45,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: '#f9f9f9',
  },
});
