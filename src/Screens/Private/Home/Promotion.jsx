import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import HomeHeader from '../../../Components/HomeHeader';
import {COLOR} from '../../../Constants/Colors';
import Button from '../../../Components/UI/Button';
import {images} from '../../../Components/UI/images';
import EmptyView from '../../../Components/UI/EmptyView';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmModal from '../../../Components/UI/ConfirmModel';
import {Typography} from '../../../Components/UI/Typography';
import {useIsFocused} from '@react-navigation/native';
import {GET_WITH_TOKEN, POST_WITH_TOKEN} from '../../../Backend/Api';
import {ADD_PROMOTION, DELETE_PROMOTION} from '../../../Constants/ApiRoute';

const Promotion = ({navigation}) => {
  const [deletes, setDelete] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [PromoId, setPromoId] = useState();

  useEffect(() => {
    if (isFocus) {
      getPromotions();
    }
  }, [isFocus]);

  const getPromotions = () => {
    setLoading(true);
    GET_WITH_TOKEN(
      ADD_PROMOTION,
      success => {
        console.log(success, 'successsuccesssuccess-->>>');
        setLoading(false);
        setPromotions(success?.data);
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
  };

  const handleDelete = () => {
    setLoading(true);
    POST_WITH_TOKEN(
      DELETE_PROMOTION + PromoId,
      success => {
        console.log(success, 'successsuccesssuccess-->>>');
        setLoading(false);
        getPromotions();
      },
      error => {
        console.log(error, 'errorerrorerror>>');
        setLoading(false);
        setDelete(false);
        getPromotions();
      },
      fail => {
        console.log(fail, 'errorerrorerror>>');

        setLoading(false);
      },
    );
  };

  const renderOffer = ({item}) => (
    <View style={styles.card}>
      {/* Left Strip */}
      <LinearGradient
        colors={['#fbc2eb', '#a6c1ee']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.strip}>
        <Typography style={styles.stripText}>{item.promo_code}</Typography>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Typography style={styles.title}>{item.amount}</Typography>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.addButton, {marginRight: 10}]}
              onPress={() => {
                navigation.navigate('AddPromotion', {
                  data: item,
                  isEditing: true,
                });
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
                setPromoId(item?.id);
              }}>
              <Image
                source={images.delete}
                style={{height: 20, width: 20, tintColor: COLOR.red}}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <Typography style={styles.offerText}>
          {item.discount} Discount + {item.cashback} Cashback
        </Typography> */}
        {/* <Typography style={styles.validity}>{item.validity}</Typography> */}
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
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={{marginTop: 20}}
          />
        ) : (
          <FlatList
            data={promotions}
            renderItem={renderOffer}
            style={{flex: 1}}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyView title="No promotions available." />}
          />
        )}

        <View
          style={{
            marginTop: 10,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 10,
          }}>
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
          loading={loading}
          onPressYes={() => handleDelete()}
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
    marginHorizontal:1
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
