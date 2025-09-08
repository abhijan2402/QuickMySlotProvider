import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import OtpScreen from '../Screens/Auth/OtpScreen';
import MainHome from '../Screens/Private/Home/MainHome';
import BottomNavigation from './BottomNavigation';
import Faq from '../Screens/Private/Account/Faq';
import Wallet from '../Screens/Private/Account/Wallet';
import Appointment from '../Screens/Private/AppointmentSection/Appointment';
import Cms from '../Components/Cms';
import Support from '../Screens/Private/Account/Support';
import Invite from '../Screens/Private/Account/Invite';
import MyAnalytics from '../Screens/Private/Home/Analytics';
import SearchServices from '../Screens/Private/Home/SearchServices';
import ProviderDetails from '../Screens/Private/Home/ServiceDetailPage';
import Checkout from '../Screens/Private/Home/Checkout';
import BookingConfirmation from '../Screens/Private/Home/BookingConfirmation';
import ForgotPassword from '../Screens/Private/Account/ForgotPassword';
import BookingScreen from '../Screens/Private/Home/BookingScreen';
import SignUp from '../Screens/Auth/SignUp';
import CompleteProfile from '../Screens/Auth/CompleteProfile';
import Availability from '../Screens/Auth/Availability';
import BoostProfile from '../Screens/Private/Home/BoostProfile';
import ManageServices from '../Screens/Private/Home/ManageServices';
import AddService from '../Screens/Private/Home/AddService';
import AvailabilityManagement from '../Screens/Private/Home/AvailabilityManagement';
import EditProfile from '../Screens/Private/Account/EditProfile';
import BankDetails from '../Screens/Private/Account/BankDetails';
import AddBank from '../Screens/Private/Account/AddBank';
import Promotion from '../Screens/Private/Home/Promotion';
import AddPromotion from '../Screens/Private/Home/AddPromotion';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="Availability" component={Availability} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="MainHome" component={MainHome} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="Cms" component={Cms} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="MyAnalytics" component={MyAnalytics} />
      <Stack.Screen name="SearchServices" component={SearchServices} />
      <Stack.Screen name="ProviderDetails" component={ProviderDetails} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ManageServices" component={ManageServices} />
      <Stack.Screen name="BoostProfile" component={BoostProfile} />
      <Stack.Screen
        name="AvailabilityManagement"
        component={AvailabilityManagement}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
      />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="AddBank" component={AddBank} />
      <Stack.Screen name="Promotion" component={Promotion} />
      <Stack.Screen name="AddPromotion" component={AddPromotion} />
      {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
