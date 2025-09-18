import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import {windowWidth} from '../../../Constants/Dimensions';
import HomeHeader from '../../../Components/HomeHeader';
import ConfirmModal from '../../../Components/UI/ConfirmModel';
import {Typography} from '../../../Components/UI/Typography';
import {useIsFocused} from '@react-navigation/native';
import {GET_WITH_TOKEN, POST_WITH_TOKEN} from '../../../Backend/Api';
import {ADD_BANK, DELETE_BANK} from '../../../Constants/ApiRoute';
import {Font} from '../../../Constants/Font';

const BankDetails = ({navigation}) => {
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [deletes, setDelete] = useState(false);
  const [bankList, setBankList] = useState([]);
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    if (isFocus) {
      getBankList();
    }
  }, [isFocus]);

  const getBankList = () => {
    setLoading(true);
    GET_WITH_TOKEN(
      ADD_BANK,
      success => {
        setLoading(false);
        setDelete(false);
        setBankList(success?.data);
      },
      error => {
        setLoading(false);
      },
      fail => {
        setLoading(false);
      },
    );
  };

  const toggleSelect = id => {
    setSelectedBankId(selectedBankId === id ? null : id);
  };

  const handleDelete = () => {
    setLoading(true);
    POST_WITH_TOKEN(
      DELETE_BANK + deleteId,
      success => {
        setLoading(false);
        getBankList();
      },
      error => {
        setLoading(false);
        setLoading(false);
        getBankList();
      },
      fail => {
        setLoading(false);
      },
    );
  };

  const renderBankCard = ({item}) => (
    <TouchableOpacity
      style={[styles.card, selectedBankId === item.id && styles.cardSelected]}
      activeOpacity={0.9}
      onPress={() => toggleSelect(item.id)}>
      {/* Bank Name + Checkbox */}
      <View style={styles.headerRow}>
        <Typography
          size={14} // 🔹 Smaller font
          font={Font.bold}
          color={COLOR.primary || '#333'}>
          {item.bank_name}
        </Typography>
        <TouchableOpacity
          style={[
            styles.checkbox,
            selectedBankId === item.id && styles.checkboxSelected,
          ]}
          onPress={() => toggleSelect(item.id)}>
          {selectedBankId === item.id && (
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
              }}
              style={{width: 12, height: 12, tintColor: '#fff'}}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Account Number */}
      <View style={styles.detailRow}>
        <Typography size={12} font={Font.medium} color="#444">
          Account No:
        </Typography>
        <Typography
          size={12}
          font={Font.regular}
          color="#666"
          textAlign={'right'}
          style={{width: windowWidth * 0.55}}>
          {item.account_number}
        </Typography>
      </View>

      {/* IFSC Code */}
      <View style={styles.detailRow}>
        <Typography size={12} font={Font.medium} color="#444">
          IFSC Code:
        </Typography>
        <Typography
          size={12}
          font={Font.regular}
          color="#666"
          textAlign={'right'}
          style={{width: windowWidth * 0.55}}>
          {item.ifsc_code}
        </Typography>
      </View>

      {/* Account Type */}
      <View style={styles.detailRow}>
        <Typography size={12} font={Font.medium} color="#444">
          Account Type:
        </Typography>
        <Typography size={12} font={Font.regular} color="#666">
          {item.bank_type}
        </Typography>
      </View>

      {/* Actions */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate('AddBank', {
              data: item,
              isEditing: true,
            })
          }>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1159/1159633.png',
            }}
            style={styles.actionIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, {backgroundColor: '#F44336'}]}
          onPress={() => {
            setDelete(true);
            setDeleteId(item?.id);
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/484/484662.png',
            }}
            style={[styles.actionIcon, {tintColor: '#fff'}]}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Bank Details"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLOR.primary}
          style={{marginTop: 20}}
        />
      ) : (
        <FlatList
          data={bankList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderBankCard}
          contentContainerStyle={{paddingBottom: 20, marginTop: 20}}
          ListEmptyComponent={() => (
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Typography size={14} font={Font.semibold} color={COLOR.black}>
                No Bank Added Yet
              </Typography>
            </View>
          )}
        />
      )}

      {/* Add Bank Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddBank')}>
        <Typography size={14} font={Font.semibold} color="#fff">
          + Add Bank
        </Typography>
      </TouchableOpacity>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        visible={deletes}
        close={() => setDelete(false)}
        title="Delete Bank"
        description="Are you sure you want to delete this Bank?"
        yesTitle="Yes"
        noTitle="No"
        loading={loading}
        onPressYes={handleDelete}
        onPressNo={() => setDelete(false)}
      />
    </View>
  );
};

export default BankDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLOR.white,
  },
  card: {
    width: windowWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardSelected: {
    borderColor: COLOR.primary,
    backgroundColor: '#F8FAFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: COLOR.primary,
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: COLOR.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLOR.primary,
  },
  addBtn: {
    backgroundColor: COLOR.primary,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 15,
  },
});
