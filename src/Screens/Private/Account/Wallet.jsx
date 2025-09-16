import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {COLOR} from '../../../Constants/Colors';
import HomeHeader from '../../../Components/HomeHeader';
import CustomButton from '../../../Components/CustomButton';
import {Typography} from '../../../Components/UI/Typography'; // ✅ Import Typography
import {useIsFocused} from '@react-navigation/native';
import {GET_WITH_TOKEN} from '../../../Backend/Api';
import {ADD_WALLET} from '../../../Constants/ApiRoute';
import {windowWidth} from '../../../Constants/Dimensions';
import {Font} from '../../../Constants/Font';

const Wallet = ({navigation}) => {
  const [balance, setBalance] = useState();
  const [transaction, setTransaction] = useState([]);
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocus) {
      setLoading(true);
      GET_WITH_TOKEN(
        ADD_WALLET,
        success => {
          console.log(success, 'successsuccesssuccess-->>>');
          setLoading(false);
          setTransaction(success?.data?.transactions);
          setBalance(success?.data?.total_amount);
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
  const formatDate = dateString => {
    const dateObj = new Date(dateString);
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const datePart = dateObj.toLocaleDateString('en-GB', options);
    const timePart = dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${datePart}, ${timePart}`;
  };

  const renderTransaction = ({item}) => (
    <View style={styles.transactionItem}>
      <View>
        <Typography
          size={14}
          color={COLOR.black}
          font={Font.medium}
          style={{width: windowWidth * 0.6}}>
          Txn ID: {item.transaction_id}
        </Typography>
        <Typography
          size={12}
          color="#999"
          style={{marginTop: 5}}
          font={Font.medium}>
          {formatDate(item.created_at)}
        </Typography>
      </View>
      <Typography
        size={16}
        font={Font.semibold}
        color={item.type === 'credit' ? 'green' : 'red'}>
        {item.type === 'credit' ? '+ ' : '- '}₹{item.amount}
      </Typography>
    </View>
  );

  return (
    <View style={styles.container}>
      <HomeHeader
        title="Wallet"
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={{paddingHorizontal: 10}}>
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Typography size={14} color="#555" font={Font.medium}>
              Current Balance
            </Typography>
            <Typography
              size={28}
              font={Font.semibold}
              color={COLOR.black}
              style={{marginTop: 5}}>
              ₹{Number(balance).toFixed(2)}
            </Typography>
          </View>

          {/* Add Amount Button */}
          <CustomButton
            title="Add Amount"
            onPress={() => navigation.navigate('AddAmount')}
            style={{marginVertical: 15}}
          />

          {/* Transaction History */}
          <Typography
            size={16}
            font={Font.medium}
            color={COLOR.black}
            style={{marginTop: 10, marginBottom: 8}}>
            Transaction History
          </Typography>
          <FlatList
            data={transaction}
            keyExtractor={item => item.id}
            renderItem={renderTransaction}
            contentContainerStyle={{paddingBottom: 20}}
          />
        </View>
      )}
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
  },
  balanceCard: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
});
