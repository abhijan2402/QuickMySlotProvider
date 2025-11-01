import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import HomeHeader from '../../../Components/HomeHeader';
import { COLOR } from '../../../Constants/Colors';
import { Typography } from '../../../Components/UI/Typography';
import { useIsFocused } from '@react-navigation/native';
import { GET_WITH_TOKEN } from '../../../Backend/Api';
import { GET_NOTIFICATION, NOTIFICATION_READ } from '../../../Constants/ApiRoute';
import EmptyView from '../../../Components/UI/EmptyView';
import { Font } from '../../../Constants/Font';
import moment from 'moment';

const NotificationsScreen = () => {
  const [notifications, setNotification] = useState([]);
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocus) {
      setLoading(true);
      GET_WITH_TOKEN(
        GET_NOTIFICATION,
        success => {
          setNotification(success?.data)
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
        },
        error => {
          console.log(error, 'errorerrorerror>>');
          setLoading(false);
        },
        fail => {
          console.log(fail, 'errorerrorerror>>');

          setLoading(false);
        },
      );
      GET_WITH_TOKEN(
        NOTIFICATION_READ,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
        },
        error => {
          console.log(error, 'errorerrorerror>>');
          setLoading(false);
        },
        fail => {
          console.log(fail, 'errorerrorerror>>');

          setLoading(false);
        },
      );
    }
  }, [isFocus]);

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Notifications"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      {/* Notifications List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          <FlatList
            data={notifications}
            renderItem={({ item }) => {
              return (
                <View key={item.id} style={styles.card}>
                  {/* <View style={styles.cardLeft}>
                    <Image source={{ uri: item.icon }} style={styles.icon} />
                  </View> */}
                  <View style={styles.cardRight}>
                    <View style={styles.cardHeader}>
                      <Typography
                        size={14}
                        font={Font.semibold}
                        color={COLOR.black}>
                        {item.title}
                      </Typography>
                      {/* <Typography
                        size={13}
                        font={Font.medium}
                        color={item.statusColor}>
                        {item.status}
                      </Typography> */}
                    </View>
                    <Typography
                      size={12}
                      color="#555"
                      font={Font.semibold}

                      style={{ marginVertical: 4 }}>
                      {item.message}
                    </Typography>
                    <Typography size={11} font={Font.medium} color="#888">
                      {moment(item.created_at).format("DD MMM, YYYY")}
                    </Typography>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return <EmptyView title="No Notification Yet" />;
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 5
  },
  cardLeft: {
    marginRight: 10,
    backgroundColor: COLOR.iconBg,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 50,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#a29bfe',
  },
  cardRight: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
