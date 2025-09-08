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
      </Stack.Navigator>
      <View style={{marginBottom: 50}}></View>
    </>
  );
};

export default RootNavigation;
