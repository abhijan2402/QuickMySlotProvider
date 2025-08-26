import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {COLOR} from '../../../Constants/Colors'; // adjust path
import {windowWidth} from '../../../Constants/Dimensions'; // adjust path
import HomeHeader from '../../../Components/HomeHeader';

const BankDetails = ({navigation}) => {
  const [selectedBankId, setSelectedBankId] = useState(null);

  const bankList = [
    {
      id: '1',
      name: 'HDFC Bank',
      accountNumber: 'XXXX-XXXX-1234',
      ifsc: 'HDFC0001234',
      type: 'Savings',
    },
    {
      id: '2',
      name: 'SBI Bank',
      accountNumber: 'XXXX-XXXX-5678',
      ifsc: 'SBIN0004567',
      type: 'Current',
    },
  ];

  const toggleSelect = id => {
    setSelectedBankId(selectedBankId === id ? null : id);
  };

  const renderBankCard = ({item}) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.name}</Text>
        <TouchableOpacity
          style={[
            styles.checkbox,
            selectedBankId === item.id && styles.checkboxSelected,
          ]}
          onPress={() => toggleSelect(item.id)}>
          {selectedBankId === item.id && (
            <Text style={styles.checkmark}>✔</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Account No:</Text>
        <Text style={styles.value}>{item.accountNumber}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>IFSC Code:</Text>
        <Text style={styles.value}>{item.ifsc}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Account Type:</Text>
        <Text style={styles.value}>{item.type}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('AddBank')}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.btnText}>Delete</Text>
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
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddBank')}>
        <Text style={styles.addBtnText}>+ Add Bank</Text>
      </TouchableOpacity>
      <FlatList
        data={bankList}
        keyExtractor={item => item.id}
        renderItem={renderBankCard}
        contentContainerStyle={{paddingBottom: 20, marginTop: 20}}
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.primary || '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  value: {
    fontSize: 15,
    color: '#666',
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
  btnText: {
    color: '#fff',
    fontWeight: '600',
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
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: COLOR.primary || '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginHorizontal:8,
    alignItems:"center",
    marginTop:5
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
