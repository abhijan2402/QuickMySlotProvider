import React, { useState } from 'react';
import {
  StyleSheet,
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
import LinearGradient from 'react-native-linear-gradient';
import ConfirmModal from '../../../Components/UI/ConfirmModel';
import {Typography} from '../../../Components/UI/Typography';

const Promotion = ({navigation}) => {
  const [deletes, setDelete] = useState(false);

  const offers = [
    {
      code: 'FIRST40',
      title: 'Get 40% OFF',
      discount: '20%',
      cashback: '20%',
      validity: 'Valid on All Days',
      description:
        'After availing your services, pay at the salon using app via any mode of online payment and get 20% Discount & 20% Cashback as Cash on the net payable amount.',
    },
    {
      code: 'WEEKEND10',
      title: 'Get 10% OFF',
      discount: '5%',
      cashback: '5%',
      validity: 'Valid on Friday, Saturday, and Sunday',
      description:
        'After availing your services, pay at the salon using app via any mode of online payment and get 5% Discount & 5% Cashback as Cash on the net payable amount.',
    },
    {
      code: 'GLAMUP40',
      title: 'Get $20 OFF',
      discount: '25%',
      cashback: '15%',
      validity: 'Valid on Tuesday',
      description:
        'After availing your services, pay at the salon using app via any mode of online payment and get 25% Discount & 15% Cashback as Cash on the net payable amount.',
    },
  ];

  const renderOffer = ({item}) => (
    <View style={styles.card}>
      {/* Left Strip */}
      <LinearGradient
        colors={['#fbc2eb', '#a6c1ee']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.strip}>
        <Typography style={styles.stripText}>{item.code}</Typography>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Typography style={styles.title}>{item.title}</Typography>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.addButton, {marginRight: 10}]}
              onPress={() => {
                // Handle edit
              }}>
              <Image
                source={images.edit}
                style={{height: 20, width: 20, tintColor: COLOR.grey}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setDelete(true);
              }}>
              <Image
                source={images.delete}
                style={{height: 20, width: 20, tintColor: COLOR.red}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Typography style={styles.offerText}>
          {item.discount} Discount + {item.cashback} Cashback
        </Typography>
        <Typography style={styles.validity}>{item.validity}</Typography>
        <Typography style={styles.description}>{item.description}</Typography>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 15}}>
      <HomeHeader
        title="Promotion"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 5}}>
        <FlatList
          data={offers}
          renderItem={renderOffer}
          style={{flex: 1}}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyView title="No promotions available." />}
        />

        <View style={{ marginTop: 10}}>
          <Button
            onPress={() => navigation.navigate('AddPromotion')}
            title={'+ Add Promotion'}
          />
        </View>

        <ConfirmModal
          visible={deletes}
          close={() => setDelete(false)}
          title="Delete Promotion"
          description="Are you sure you want to delete this Promotion?"
          yesTitle="Yes"
          noTitle="No"
          onPressYes={() => {}}
          onPressNo={() => setDelete(false)}
        />
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
    marginVertical: 10,
    elevation: 3,
    overflow: 'hidden',
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
  addButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
});
