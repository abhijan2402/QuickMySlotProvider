import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import HomeHeader from '../../../Components/HomeHeader';
import {COLOR} from '../../../Constants/Colors';
import Button from '../../../Components/UI/Button';
import {images} from '../../../Components/UI/images';
import EmptyView from '../../../Components/UI/EmptyView';

const Promotion = ({navigation}) => {
  const offers = [
    {
      code: 'FIRST40',
      title: 'Get 40% OFF via LUZO',
      discount: '20%',
      cashback: '20%',
      validity: 'Valid on All Days',
      description:
        'After availing your services, pay at the salon using LUZO app via any mode of online payment and get 20% Discount & 20% Cashback as LUZO Cash on the net payable amount.',
    },
    {
      code: 'WEEKEND10',
      title: 'Get 10% OFF via LUZO',
      discount: '5%',
      cashback: '5%',
      validity: 'Valid on Friday, Saturday, and Sunday',
      description:
        'After availing your services, pay at the salon using LUZO app via any mode of online payment and get 5% Discount & 5% Cashback as LUZO Cash on the net payable amount.',
    },
    {
      code: 'GLAMUP40',
      title: 'Get 40% OFF via LUZO',
      discount: '25%',
      cashback: '15%',
      validity: 'Valid on Tuesday',
      description:
        'After availing your services, pay at the salon using LUZO app via any mode of online payment and get 25% Discount & 15% Cashback as LUZO Cash on the net payable amount.',
    },
  ];

  const renderOffer = ({item}) => (
    <View style={styles.card}>
      {/* Left Strip */}
      <View style={styles.strip}>
        <Text style={styles.stripText}>{item.code}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.addButton, {marginRight: 10}]}
              onPress={() => {
                // Handle apply action
              }}>
              <Image
                source={images.edit}
                style={{height: 20, width: 20, tintColor: COLOR.grey}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                // Handle apply action
              }}>
              <Image
                source={images.delete}
                style={{height: 20, width: 20, tintColor: COLOR.red}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.offerText}>
          {item.discount} Discount + {item.cashback} Cashback
        </Text>

        <Text style={styles.validity}>{item.validity}</Text>

        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HomeHeader
        title="Promotion"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />
      <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 15}}>
        <FlatList
          data={offers}
          renderItem={renderOffer}
          style={{flex: 1}}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyView title="No promotions available." />}
        />
        <View style={{marginBottom: 20, marginTop: 10}}>
          <Button
            onPress={() => navigation.navigate('AddPromotion')}
            title={'+ Add Promotion'}
          />
        </View>
      </View>
    </View>
  );
};

export default Promotion;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
    overflow: 'hidden',
    margin: 5,
  },
  strip: {
    backgroundColor: '#e0f3ff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  stripText: {
    transform: [{rotate: '-90deg'}],
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007aff',
    textAlign: 'center',
    width: 120,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  content: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  apply: {
    color: '#007aff',
    fontWeight: '600',
  },
  offerText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'green',
    marginVertical: 4,
  },
  validity: {
    fontSize: 12,
    color: '#555',
    marginVertical: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  tc: {
    fontSize: 12,
    color: '#007aff',
    marginTop: 4,
  },
  addButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
