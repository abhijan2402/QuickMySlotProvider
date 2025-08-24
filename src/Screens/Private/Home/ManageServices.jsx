import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';

const ManageServices = ({navigation}) => {
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

      <ScrollView contentContainerStyle={{padding: 15}}>
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
          <Text style={styles.addServiceText}>Add New Service</Text>
        </TouchableOpacity>

        {/* Current Services */}
        <Text style={styles.sectionTitle}>Your Current Services</Text>

        {services.map(item => (
          <View key={item.id} style={styles.serviceCard}>
            {/* Category Icon */}
            <View style={[styles.categoryBox, {backgroundColor: item.color}]}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>

            {/* Service Details */}
            <View style={{flex: 1, marginLeft: 10}}>
              {/* Title + Actions */}
              <View style={styles.rowBetween}>
                <Text style={styles.serviceName}>{item.name}</Text>

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
                  <TouchableOpacity style={styles.actionBtn}>
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
              <Text style={styles.serviceDesc}>{item.desc}</Text>

              {/* Price + Time */}
              <View style={styles.rowBetween}>
                <Text style={styles.servicePrice}>
                  ${item.price.toFixed(2)}
                </Text>
                <Text style={styles.serviceTime}>{item.time}</Text>
              </View>

              {/* Labels */}
              <View style={styles.labelsRow}>
                <Text style={styles.labelOrange}>Peak Eligible</Text>
                <Text style={styles.labelGreen}>Discount Eligible</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ManageServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
  addServiceText: {
    color: COLOR.white,
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
    color: COLOR.black,
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
  categoryText: {
    color: COLOR.white,
    fontWeight: '600',
    fontSize: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.black,
  },
  serviceDesc: {
    fontSize: 12,
    color: COLOR.darkGrey,
    marginVertical: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: '600',
    color: COLOR.black,
  },
  serviceTime: {
    fontSize: 12,
    backgroundColor: '#e6f0ff',
    color: '#004aad',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    fontWeight: '600',
  },
  labelsRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 6,
  },
  labelOrange: {
    fontSize: 11,
    backgroundColor: '#f5d6a4',
    color: '#9a5c00',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  labelGreen: {
    fontSize: 11,
    backgroundColor: '#b6f0c0',
    color: '#056b26',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
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
    // tintColor: COLOR.black,
  },
});
