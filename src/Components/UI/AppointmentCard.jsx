import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ConfirmModal from './ConfirmModel';
import {POST_WITH_TOKEN} from '../../Backend/Api';
import {
  ACCEPT_APPOINTMENTS,
  COMPLETED_APPOINTMENTS,
  REJECT_APPOINTMENTS,
} from '../../Constants/ApiRoute';
import {COLOR} from '../../Constants/Colors';
import {Typography} from './Typography';

const AppointmentCard = ({item, tab, onSuccess}) => {
  const [accept, setAccept] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');
  const [reject, setReject] = useState(false);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const scheduleEntries = item?.schedule_time
    ? Object.entries(item.schedule_time)
    : [];
  const [success, setSuccess] = useState(false);

  const HandleAccept = () => {
    setLoading(true);
    POST_WITH_TOKEN(
      ACCEPT_APPOINTMENTS + appointmentId,
      success => {
        setLoading(false);
      },
      error => {
        console.log(error, 'errorerrorerror>>');
        setLoading(false);
        setAccept(false);
        onSuccess();
      },
      fail => {
        console.log(fail, 'failfailfail>>');
        setLoading(false);
      },
    );
  };
  const HandleReject = () => {
    setLoading(true);
    POST_WITH_TOKEN(
      REJECT_APPOINTMENTS + appointmentId,
      success => {
        setLoading(false);
      },
      error => {
        console.log(error, 'errorerrorerror>>');
        setLoading(false);
        setReject(false);
        onSuccess();
      },
      fail => {
        console.log(fail, 'failfailfail>>');
        setLoading(false);
      },
    );
  };
  const HandleComplete = () => {
    setLoading(true);
    POST_WITH_TOKEN(
      COMPLETED_APPOINTMENTS + appointmentId,
      success => {
        setLoading(false);
      },
      error => {
        console.log(error, 'errorerrorerror>>');
        setLoading(false);
        setComplete(false);
        onSuccess();
      },
      fail => {
        console.log(fail, 'failfailfail>>');
        setLoading(false);
      },
    );
  };
  return (
    <View style={styles.card}>
      <Typography style={styles.infoText}>
        Order Id: {item?.order_id}
      </Typography>
      {/* Customer Info */}
      <Typography style={styles.sectionTitle}>👤 Customer Details</Typography>
      <Typography style={styles.infoText}>
        Name: {item?.customer?.name}
      </Typography>
      <Typography
        style={styles.linkText}
        onPress={() => Linking.openURL(`tel:${item.customer?.phone_number}`)}
        disabled={false}>
        📞 {item.customer?.phone_number}
      </Typography>
      <Typography style={styles.infoText}>
        📍 {item.customer?.exact_location}
      </Typography>

      <View style={styles.divider} />

      {/* Services */}
      <Typography style={styles.sectionTitle}>💇 Services Booked</Typography>
      <Typography style={styles.infoText}>
        • {item?.service?.name} - {item?.service?.price}
      </Typography>
      <Typography style={styles.totalPrice}>
        Total: ₹{item?.service?.price}
      </Typography>

      <View style={styles.divider} />

      {/* Booking Details */}
      <Typography style={styles.sectionTitle}>🗓 Booking Details</Typography>
      {scheduleEntries.length > 0 ? (
        scheduleEntries.map(([time, date], index) => (
          <Typography key={index} style={styles.infoText}>
            Date & Time: {time} {new Date(date).toLocaleDateString()}
          </Typography>
        ))
      ) : (
        <Typography style={styles.infoText}>Date & Time: N/A</Typography>
      )}

      <Typography style={styles.infoText}>
        Duration: {item.service?.duration}
      </Typography>

      {/* Actions */}
      {tab !== 'Completed' && tab !== 'Rejected' && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => {
              if (tab === 'Accepted') {
                setComplete(true);
              } else {
                setAccept(true);
              }
              setAppointmentId(item?.id);
            }}>
            <Typography style={styles.actionText}>
              {tab === 'Upcoming' ? 'Accept' : 'Mark as complete'}
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={() => {
              setReject(true);
              setAppointmentId(item?.id);
            }}>
            <Typography style={styles.actionText}>Reject</Typography>
          </TouchableOpacity>
        </View>
      )}
      {tab === 'Completed' && (
        <TouchableOpacity style={styles.feedbackBtn}>
          <Typography style={styles.feedbackText}>✍️ Give Feedback</Typography>
        </TouchableOpacity>
      )}
      <ConfirmModal
        visible={accept}
        close={() => setAccept(false)}
        title="Accept Appointment"
        description="Are you sure you want to Accept this Appointment?"
        yesTitle="Yes"
        noTitle="No"
        loading={loading}
        onPressYes={() => HandleAccept()}
        onPressNo={() => setAccept(false)}
      />
      <ConfirmModal
        visible={reject}
        close={() => setReject(false)}
        title="Reject Appointment"
        description="Are you sure you want to Reject this Appointment?"
        yesTitle="Yes"
        noTitle="No"
        loading={loading}
        onPressYes={() => HandleReject()}
        onPressNo={() => setReject(false)}
      />
      <ConfirmModal
        visible={complete}
        close={() => setComplete(false)}
        title="Complete Appointment"
        description="Are you sure you want to Complete this Appointment?"
        yesTitle="Yes"
        loading={loading}
        noTitle="No"
        onPressYes={() => HandleComplete()}
        onPressNo={() => setComplete(false)}
      />
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLOR.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 5,
  },
  sectionTitle: {fontSize: 14, fontWeight: '700', marginBottom: 8},
  infoText: {fontSize: 13, color: '#333', marginBottom: 5},
  linkText: {
    fontSize: 13,
    color: COLOR.primary,
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
    color: '#222',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    marginRight: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: '#C62828',
    paddingVertical: 10,
    marginLeft: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {color: COLOR.white, fontWeight: '600'},
  feedbackBtn: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.primary,
    alignItems: 'center',
  },
  feedbackText: {color: COLOR.primary, fontWeight: '600'},
});
