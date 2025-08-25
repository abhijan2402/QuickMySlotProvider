import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import HomeHeader from '../../../Components/HomeHeader';
import {COLOR} from '../../../Constants/Colors';

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
          <TouchableOpacity>
            <Text style={styles.apply}>APPLY</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.offerText}>
          {item.discount} Discount + {item.cashback} Cashback
        </Text>

        <Text style={styles.validity}>{item.validity}</Text>

        <Text style={styles.description}>{item.description}</Text>

        <Text style={styles.tc}>T&C +</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <HomeHeader
        title="Promotion"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPromotion')}>
        <Text style={styles.addButtonText}>+ Add Promotion</Text>
      </TouchableOpacity>
      <FlatList
        data={offers}
        renderItem={renderOffer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Promotion;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
    overflow: 'hidden',
    marginHorizontal: 20,
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
    backgroundColor: '#007aff',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal:12
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
