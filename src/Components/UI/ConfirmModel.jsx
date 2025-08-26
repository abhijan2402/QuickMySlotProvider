import {
  StyleSheet,
  View,
  Modal,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { images } from './images';
import { Typography } from './Typography';
import Button from './Button';

const ConfirmModal = ({
  visible = false,
  close = () => {},
  title,
  description,
  onPressYes = () => {},
  onPressNo = () => {},
  yesTitle = 'Yes',
  noTitle = 'No',
  loading,
}) => {

  return (
    <Modal
      statusBarTranslucent
      onRequestClose={() => close()}
      animationType="fade"
      transparent={true}
      visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          {/* Cross Icon */}
          <TouchableOpacity style={styles.crossBtn} onPress={close}>
            <Image source={images.cross} style={{height: 18, width: 18}} />
          </TouchableOpacity>

          {/* Icon */}
          <Image
            source={images.tick}
            style={{height: 42, width: 42, alignSelf: 'center'}}
          />

          {/* Title */}
          <Typography
            size={22}
            lineHeight={27}
            textAlign="center"
            style={{marginTop: 20}}>
            {title}
          </Typography>

          {/* Description */}
          {description && (
            <Typography
              style={{marginTop: 10}}
              textAlign="center"
              size={16}
              lineHeight={20}
              color="rgba(0, 0, 0, 0.69)">
              {description}
            </Typography>
          )}

          {/* Buttons Row */}
          <View style={styles.btnRow}>
            <Button
              title={noTitle}
              onPress={onPressNo || close}
              containerStyle={[styles.btn, {backgroundColor: ''}]}
              textStyle={{color:''}}
            />
            <Button
              loading={loading}
              title={yesTitle}
              onPress={onPressYes}
              containerStyle={[styles.btn, {marginLeft: 10}]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = () =>
  StyleSheet.create({
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',   // ✅ This centers the modal horizontally
      paddingHorizontal: 22,
    },
    modalView: {
      width: '90%',            // ✅ Prevents modal from shrinking too much
      backgroundColor: 'white',
      borderRadius: 7,
      padding: 24,
      paddingTop: 30,
      shadowColor: 'rgba(0, 0, 0, 0.15)',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.2,
      shadowRadius: 4,
      elevation: Platform.OS === 'ios' ? 0 : 5,
    },
    crossBtn: {
      position: 'absolute',
      top: 12,
      right: 12,
      padding: 6,
    },
    btnRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 26,
    },
    btn: {
      flex: 1,
      borderRadius: 5,
    },
  });
