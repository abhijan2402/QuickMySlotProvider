import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import HomeHeader from '../../../Components/HomeHeader';
import {COLOR} from '../../../Constants/Colors';
import CustomButton from '../../../Components/CustomButton';
import {Typography} from '../../../Components/UI/Typography';
import Button from '../../../Components/UI/Button';
import Input from '../../../Components/Input';
import {windowWidth} from '../../../Constants/Dimensions';
import { validators } from '../../../Backend/Validator';
import { isValidForm } from '../../../Backend/Utility';

const Support = () => {
  const [tickets, setTickets] = useState([
    {
      id: '1',
      title: 'Login Issue',
      description: 'Unable to log into my account since yesterday.',
      date: '2025-08-10',
      time: '10:45 AM',
      status: 'Open',
    },
    {
      id: '2',
      title: 'Payment Failed',
      description: 'Transaction failed but amount was deducted.',
      date: '2025-08-09',
      time: '4:30 PM',
      status: 'Resolved',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [error, setError] = useState('');

  const handleAddTicket = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    const newTicket = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Open',
    };
    setTickets([newTicket, ...tickets]);
    setNewTitle('');
    setNewDesc('');
    setModalVisible(false);
  };

  const renderTicket = ({item}) => (
    <View style={styles.ticketCard}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Typography style={styles.ticketTitle}>{item.title}</Typography>
        <Typography
          style={[
            styles.status,
            item.status === 'Resolved'
              ? styles.statusResolved
              : styles.statusOpen,
          ]}>
          {item.status}
        </Typography>
      </View>
      <Typography style={styles.ticketDesc}>{item.description}</Typography>
      <Typography style={styles.ticketDate}>
        {item.date} • {item.time}
      </Typography>
    </View>
  );

  const handleUpdate = () => {
    let validationErrors = {
      title: validators.checkRequire('Title', firstName),
      description: validators.checkEmail('Description', email),
    };
    setError(validationErrors);
    if (isValidForm(validationErrors)) {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', firstName);
      formData.append('description', email);
      // if (profileImage) {
      //   formData.append('image', profileImage);
      // }
      console.log('FormData ====>', formData);
      POST_WITH_TOKEN(
        UPDATE_PROFILE,
        formData,
        success => {
          setLoading(false);
          console.log(success, 'dsdsdsdeeeeeeeeeeeeweewew-->>>');
          dispatch(userDetails(success?.data));
          navigation.pop();
          setIsEditing(false);
          fetchUserProfile();
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
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        title={'Support'}
        leftIcon="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
        leftTint={COLOR.black}
      />

      <FlatList
        data={tickets}
        renderItem={renderTicket}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 10}}
      />

      <Button title="Raise Ticket" onPress={() => setModalVisible(true)} />

      {/* Raise Ticket Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Typography style={styles.modalTitle}>
                Raise a Support Ticket
              </Typography>
              {/* <Text
                style={styles.input}
                placeholder="Enter Ticket Title"
                value={newTitle}
                placeholderTextColor={'gray'}
                onChangeText={setNewTitle}
              /> */}
              <Input
                label="Title"
                placeholder=""
                value={newTitle}
                style={{borderColor: COLOR.primary}}
                onChangeText={setNewTitle}
                error={error.name}
              />

              <Input
                label="Description"
                placeholder=""
                value={newDesc}
                style={{borderColor: COLOR.primary}}
                onChangeText={setNewDesc}
                error={error.name}
                multiline={true}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <Button
                  title="Submit Ticket"
                  onPress={handleAddTicket}
                  containerStyle={{marginTop: 10, width: windowWidth * 0.4}}
                />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  titleColor={COLOR.primary}
                  containerStyle={{
                    marginTop: 10,
                    width: windowWidth * 0.4,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: COLOR.primary,
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  ticketCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
  },
  ticketDesc: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  ticketDate: {
    fontSize: 12,
    color: '#888',
  },
  status: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    overflow: 'hidden',
  },
  statusOpen: {
    backgroundColor: '#ffebcc',
    color: '#b36b00',
  },
  statusResolved: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  raiseButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  raiseButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  cancelBtn: {
    alignItems: 'center',
    marginTop: 10,
  },
});
