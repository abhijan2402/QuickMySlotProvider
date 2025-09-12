import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import {windowWidth} from '../../../Constants/Dimensions';
import HomeHeader from '../../../Components/HomeHeader';
import ConfirmModal from '../../../Components/UI/ConfirmModel';
import {Typography} from '../../../Components/UI/Typography'; // ✅ Import Typography
import {GET_WITH_TOKEN} from '../../../Backend/Api';
import { ADD_BANK } from '../../../Constants/ApiRoute';
import { useIsFocused } from '@react-navigation/native';

const BankDetails = ({navigation}) => {
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [deletes, setDelete] = useState(false);
  const [bankList, setBankList] = useState([]);
  const isFocus = useIsFocused()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(isFocus){
      GET_WITH_TOKEN(
      'bank-accounts',
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

  const toggleSelect = id => {
    setSelectedBankId(selectedBankId === id ? null : id);
  };

  const renderBankCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => toggleSelect(item.id)}>
      <View style={styles.headerRow}>
        <Typography size={18} fontWeight="700" color={COLOR.primary || '#333'}>
          {item.name}
        </Typography>
        <TouchableOpacity
          style={[
            styles.checkbox,
            selectedBankId === item.id && styles.checkboxSelected,
          ]}
          onPress={() => toggleSelect(item.id)}>
          {selectedBankId === item.id && (
            <Typography size={16} fontWeight="bold" color="#fff">
              ✔
            </Typography>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.detailRow}>
        <Typography size={15} fontWeight="600" color="#444">
          Account No:
        </Typography>
        <Typography size={15} color="#666">
          {item.accountNumber}
        </Typography>
      </View>

      <View style={styles.detailRow}>
        <Typography size={15} fontWeight="600" color="#444">
          IFSC Code:
        </Typography>
        <Typography size={15} color="#666">
          {item.ifsc}
        </Typography>
      </View>

      <View style={styles.detailRow}>
        <Typography size={15} fontWeight="600" color="#444">
          Account Type:
        </Typography>
        <Typography size={15} color="#666">
          {item.type}
        </Typography>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('AddBank')}>
          <Typography size={14} fontWeight="600" color="#fff">
            Edit
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => setDelete(true)}>
          <Typography size={14} fontWeight="600" color="#fff">
            Delete
          </Typography>
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

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddBank')}>
        <Typography size={14} fontWeight="700" color="#fff">
          + Add Bank
        </Typography>
      </TouchableOpacity>

      <FlatList
        data={bankList}
        keyExtractor={item => item.id}
        renderItem={renderBankCard}
        contentContainerStyle={{paddingBottom: 20, marginTop: 20}}
      />

      <ConfirmModal
        visible={deletes}
        close={() => setDelete(false)}
        title="Delete Bank"
        description="Are you sure you want to delete this Bank?"
        yesTitle="Yes"
        noTitle="No"
        onPressYes={() => {}}
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
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editBtn: {
    backgroundColor: COLOR.primary || '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLOR.primary || '#4CAF50',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLOR.primary || '#4CAF50',
  },
  addBtn: {
    backgroundColor: COLOR.primary || '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    marginTop: 15,
  },
});
