import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import {View} from 'react-native';
import Cms from '../Components/Cms';
import AddService from '../Screens/Private/Home/AddService';
import EditProfile from '../Screens/Private/Account/EditProfile';
import BankDetails from '../Screens/Private/Account/BankDetails';
import AddBank from '../Screens/Private/Account/AddBank';
import Promotion from '../Screens/Private/Home/Promotion';
import AddPromotion from '../Screens/Private/Home/AddPromotion';
import MainHome from '../Screens/Private/Home/MainHome';
import Faq from '../Screens/Private/Account/Faq';
import ForgotPassword from '../Screens/Private/Account/ForgotPassword';
import Wallet from '../Screens/Private/Account/Wallet';
import VendorAppointments from '../Screens/Private/AppointmentSection/Appointment';
import Support from '../Screens/Private/Account/Support';
import Invite from '../Screens/Private/Account/Invite';
import MyAnalytics from '../Screens/Private/Home/Analytics';
import ProviderDetails from '../Screens/Private/Home/ServiceDetailPage';
import SearchServices from '../Screens/Private/Home/SearchServices';
import BookingScreen from '../Screens/Private/Home/BookingScreen';
import Checkout from '../Screens/Private/Home/Checkout';
import ManageServices from '../Screens/Private/Home/ManageServices';
import BoostProfile from '../Screens/Private/Home/BoostProfile';
import AvailabilityManagement from '../Screens/Private/Home/AvailabilityManagement';
import BookingConfirmation from '../Screens/Private/Home/BookingConfirmation';
import AddAmount from '../Screens/Private/Account/AddAmount';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="BottomNavigation"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="Cms" component={Cms} />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="BankDetails" component={BankDetails} />
        <Stack.Screen name="AddBank" component={AddBank} />
        <Stack.Screen name="Promotion" component={Promotion} />
        <Stack.Screen name="AddPromotion" component={AddPromotion} />
        <Stack.Screen name="MainHome" component={MainHome} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Appointment" component={VendorAppointments} />
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
        <Stack.Screen name="AddAmount" component={AddAmount} />
      </Stack.Navigator>
      {/* <View style={{marginBottom: 50}}></View> */}
    </>
  );
};

export default RootNavigation;
