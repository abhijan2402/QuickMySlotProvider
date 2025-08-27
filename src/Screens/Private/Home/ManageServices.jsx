import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import {Typography} from '../../../Components/UI/Typography';
import ConfirmModal from '../../../Components/UI/ConfirmModel';

const ManageServices = ({navigation}) => {
  const [deletes, setDelete] = useState(false);

  const services = [
    {
      id: 1,
      name: 'Haircut & Styling',
      desc: 'Includes wash, cut, and blow-dry.',
      price: 45,
      time: '45 mins',
      category: 'Hair',
      color: '#f4a226',
    },
    {
      id: 2,
      name: 'Facial & Cleanup',
      desc: 'Basic cleanup with herbal products.',
      price: 30,
      time: '30 mins',
      category: 'Skin',
      color: '#2e7dad',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <HomeHeader
        title="Manage Services"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 15}}>
        {/* Add New Service */}
        <TouchableOpacity
          onPress={() => navigation.navigate('AddService')}
          style={styles.addServiceBtn}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/992/992651.png',
            }}
            style={styles.addIcon}
          />
          <Typography size={14} color={COLOR.white} fontWeight="600">
            Add New Service
          </Typography>
        </TouchableOpacity>

        {/* Current Services */}
        <Typography
          size={15}
          fontWeight="600"
          color={COLOR.black}
          style={{marginBottom: 10}}>
          Your Current Services
        </Typography>

        {services.map(item => (
          <View key={item.id} style={styles.serviceCard}>
            {/* Category Icon */}
            <View style={[styles.categoryBox, {backgroundColor: item.color}]}>
              <Typography size={12} fontWeight="600" color={COLOR.white}>
                {item.category}
              </Typography>
            </View>

            {/* Service Details */}
            <View style={{flex: 1, marginLeft: 10}}>
              {/* Title + Actions */}
              <View style={styles.rowBetween}>
                <Typography size={14} fontWeight="600" color={COLOR.black}>
                  {item.name}
                </Typography>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AvailabilityManagement');
                    }}
                    style={styles.actionBtn}>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1159/1159633.png',
                      }}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => setDelete(true)}>
                    <Image
                      tintColor={'red'}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/6861/6861362.png',
                      }}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Description */}
              <Typography
                size={12}
                color={COLOR.darkGrey}
                style={{marginVertical: 2}}>
                {item.desc}
              </Typography>

              {/* Price + Time */}
              <View style={styles.rowBetween}>
                <Typography size={13} fontWeight="600" color={COLOR.black}>
                  ${item.price.toFixed(2)}
                </Typography>
                <Typography
                  size={12}
                  fontWeight="600"
                  color="#004aad"
                  style={{
                    backgroundColor: '#e6f0ff',
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 6,
                    overflow: 'hidden',
                  }}>
                  {item.time}
                </Typography>
              </View>

              {/* Labels */}
              <View style={styles.labelsRow}>
                <Typography size={11} style={styles.labelOrange}>
                  Peak Eligible
                </Typography>
                <Typography size={11} style={styles.labelGreen}>
                  Discount Eligible
                </Typography>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <ConfirmModal
        visible={deletes}
        close={() => setDelete(false)}
        title="Delete services"
        description="Are you sure you want to delete this services?"
        yesTitle="Yes"
        noTitle="No"
        onPressYes={() => {}}
        onPressNo={() => setDelete(false)}
      />
    </View>
  );
};

export default ManageServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
  },
  addServiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8f7de8',
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 20,
  },
  addIcon: {
    width: 18,
    height: 18,
    tintColor: COLOR.white,
    marginRight: 8,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: COLOR.white,
  },
  categoryBox: {
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelsRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 6,
  },
  labelOrange: {
    backgroundColor: COLOR.lightYellow,
    color: '#9a5c00',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  labelGreen: {
    backgroundColor: COLOR.lightGreen,
    color: '#056b26',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 3,
  },
  actionIcon: {
    width: 15,
    height: 15,
  },
});
