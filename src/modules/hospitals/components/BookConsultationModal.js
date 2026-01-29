import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale } from '../../../utils/styling';
import { useDispatch, useSelector } from 'react-redux';
import { setConsultationType, resetConsultationType } from '../redux/slices/BookingSlice';

const BookConsultationModal = ({ visible, onClose, bookAppointmentForSelf }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectedType = useSelector(
        state => state.hospital.consultation.consultationType
    );

    const handleProceed =  async() => {
        if (!selectedType) return;
        onClose();
        if (selectedType === 'SELF') {
            await bookAppointmentForSelf();
            navigation.navigate('BookingDetails');
        } else {
            navigation.navigate('AppointmentBooking');
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>Book Consultation</Text>
                        <TouchableOpacity onPress={() => {
                            dispatch(resetConsultationType());
                            onClose();
                        }}>
                            <Text style={styles.close}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subTitle}>Consultation for</Text>

                    <View style={styles.cards}>
                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedType === 'SELF' && styles.selectedCard,
                            ]}
                            onPress={() => dispatch(setConsultationType('SELF'))}
                        >
                            <Icon name="account-outline" size={scale(24)} color={selectedType === 'SELF' ? '#155DFC' : '#000'} />
                            <Text style={[styles.cardTitle,
                            selectedType === 'SELF' && styles.selectedCardTitle
                            ]}>Myself</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedType === 'OTHER' && styles.selectedCard,
                            ]}
                            onPress={() => dispatch(setConsultationType('OTHER'))}
                        >
                            <Icon name="account-multiple-outline" size={scale(24)} color={selectedType === 'SELF' ? '#000' : '#155DFC'} />
                            <Text style={[styles.cardTitle,
                            selectedType === 'OTHER' && styles.selectedCardTitle
                            ]}>Someone Else</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.proceedBtn,
                            !selectedType && styles.disabledBtn,
                        ]}
                        disabled={!selectedType}
                        onPress={handleProceed}
                    >
                        <Text style={styles.proceedText}>Proceed</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default BookConsultationModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: scale(20),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(16),
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: verticalScale(12),
    },
    headerText: {
        fontSize: scale(18),
        fontWeight: '700',
        color: '#0A0A0A',
    },
    close: {
        fontSize: scale(18),
        fontWeight: '400',
        color: '#0A0A0A',
        paddingHorizontal: scale(6),
    },
    subTitle: {
        marginTop: verticalScale(20),
        marginBottom: verticalScale(14),
        fontSize: scale(16),
        fontWeight: '500',
        color: '#101828',
    },
    cards: {
        flexDirection: 'row',
        gap: scale(10),
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    card: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: scale(30),
        paddingVertical: verticalScale(30),
        marginBottom: verticalScale(12),
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: scale(16),
        fontWeight: '400',
    },
    selectedCardTitle: {
        color: '#155DFC',
    },
    proceedBtn: {
        marginTop: verticalScale(16),
        backgroundColor: '#155DFC',
        paddingVertical: verticalScale(14),
        borderRadius: 30,
        alignItems: 'center',
    },
    proceedText: {
        color: '#FFFFFF',
        fontSize: scale(16),
        fontWeight: '400',
    },
    selectedCard: {
        borderColor: '#155DFC',
        backgroundColor: '#E3F2FD',
    },
    disabledBtn: {
        backgroundColor: '#BDBDBD',
    },
});
