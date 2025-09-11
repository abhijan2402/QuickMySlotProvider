import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {ErrorBox} from './ErrorBox';
import {COLOR} from '../../Constants/Colors';

const DatePickerModal = ({
  value,
  onChange,
  label,
  mode,
  error,
  containerStyle,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={[{marginBottom: 12, containerStyle, height: 52}]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}>
        <Text style={[styles.timeText, !value && {color: COLOR.grey}]}>
          {value ? moment(value).format('hh:mm A') : 'Select Time'}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        placeholder={placeholder}
        open={open}
        date={value || new Date()}
        mode={mode || 'date'}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => setOpen(false)}
      />
      {error && <ErrorBox error={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 14,
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 14,
    color: COLOR.black,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: COLOR.black,
  },
});

export default DatePickerModal;
