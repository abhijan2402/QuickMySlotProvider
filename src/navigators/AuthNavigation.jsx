import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import OtpScreen from '../Screens/Auth/OtpScreen';
import SignUp from '../Screens/Auth/SignUp';
import CompleteProfile from '../Screens/Auth/CompleteProfile';
import Availability from '../Screens/Auth/Availability';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const userdata = useSelector(store => store.userDetails);
  console.log(userdata);

  return (
    <Stack.Navigator
      initialRouteName={
        userdata?.steps == 1
          ? 'CompleteProfile'
          : userdata?.steps == 2
          ? 'Availability'
          : 'Login'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="Availability" component={Availability} />
    </Stack.Navigator>
  );
};

export default AuthStack;
