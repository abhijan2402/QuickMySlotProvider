import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import HomeHeader from '../../../Components/HomeHeader';
import { COLOR } from '../../../Constants/Colors';
import ConfirmModal from '../../../Components/UI/ConfirmModel';
import { Typography } from '../../../Components/UI/Typography';
import { useIsFocused } from '@react-navigation/native';
import { GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../Backend/Api';
import {
  ACCEPT_APPOINTMENTS,
  COMPLETED_APPOINTMENTS,
  GET_APPOINTMENTS,
  REJECT_APPOINTMENTS,
} from '../../../Constants/ApiRoute';
import EmptyView from '../../../Components/UI/EmptyView';
import AppointmentCard from '../../../Components/UI/AppointmentCard';

const VendorAppointments = ({ navigation }) => {
  const [tab, setTab] = useState('Upcoming');

  const tabs = [
    { id: 1, title: 'Upcoming', status: 'pending' },
    { id: 2, title: 'Accepted', status: 'accepted' },
    { id: 3, title: 'Rejected', status: 'rejected' },
    { id: 1, title: 'Completed', status: 'completed' },
  ];
  const [loading, setLoading] = useState(false);
  const isFocus = useIsFocused();
  const [appointments, setAppointments] = useState([]);
  console.log(appointments);

  useEffect(() => {
    GetServices();
  }, [isFocus, tab]);

  const GetServices = () => {
    setLoading(true);
    GET_WITH_TOKEN(
      GET_APPOINTMENTS,
      success => {
        setLoading(false);
        const allAppointments = success?.data || [];
        // console.log(allAppointments, "ALLLLL__APPP");

        let filteredAppointments = [];
        switch (tab) {
          case 'Upcoming':
            filteredAppointments = allAppointments.filter(
              a => a.status === 'pending',
            );
            break;
          case 'Accepted':
            filteredAppointments = allAppointments.filter(
              a => a.status === 'accepted',
            );
            break;
          case 'Rejected':
            filteredAppointments = allAppointments.filter(
              a => a.status === 'rejected',
            );
            break;
          case 'Completed':
            filteredAppointments = allAppointments.filter(
              a => a.status === 'completed',
            );
            break;
          default:
            filteredAppointments = allAppointments;
        }

        setAppointments(filteredAppointments);
      },
      error => {
        console.log(error, 'errorerrorerror>>');
        setLoading(false);
      },
      fail => {
        console.log(fail, 'failfailfail>>');
        setLoading(false);
      },
    );
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Appointments"
        leftTint={COLOR.black}
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
      />
      {/* Tabs */}
      <View style={styles.tabRow}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={tabs}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.tabButton,
                  tab === item.title && { backgroundColor: COLOR.primary },
                ]}
                onPress={() => setTab(item.title)}>
                <Typography
                  style={[
                    styles.tabText,
                    { color: tab === item.title ? COLOR.white : COLOR.black },
                  ]}>
                  {item.title}
                </Typography>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator size={'large'} color={COLOR.primary} />
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <AppointmentCard
                onPress={() =>
                  navigation.navigate('AppointmentDetail', { appointment: item })
                }
                onSuccess={() => {
                  GetServices()
                }} item={item} tab={tab} />
            )
          }}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={() => {
            return <EmptyView title="No Data Found" />;
          }}
        />
      )}
    </View>
  );
};

export default VendorAppointments;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 15 },
  tabRow: { flexDirection: 'row', marginVertical: 15, justifyContent: 'center' },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
  },
  tabText: { fontSize: 14, fontWeight: '600' },
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 5,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#333', marginBottom: 5 },
  linkText: {
    fontSize: 13,
    color: COLOR.primary,
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
    color: '#222',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    marginRight: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: '#C62828',
    paddingVertical: 10,
    marginLeft: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: { color: COLOR.white, fontWeight: '600' },
  feedbackBtn: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.primary,
    alignItems: 'center',
  },
  feedbackText: { color: COLOR.primary, fontWeight: '600' },
});
