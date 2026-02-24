import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setTime } from '../../redux/slices/BookingSlice';


const SlotBookingWomen = ({ dates, times, timeSlotsLoading }) => {

    const dispatch = useDispatch();
    const { selectedDate, selectedTime } = useSelector(
        state => state.hospital.consultation
    );

    const getDateMonthLabel = (date) =>
        date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

    const FetchTimeSlots = () => {
        if (timeSlotsLoading) {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: scale(200),
                }}>
                    <ActivityIndicator size={'large'} color={'#F47FBB'} />
                </View>
            );
        }
        return (
            <View>
                {selectedDate && (
                    <View>
                        <View style={styles.slotsHeader} >
                            <Text style={styles.slotsHeaderText}>Available Slots</Text>
                            <Text style={styles.slotsHeaderTextCount}>
                                {times.length}
                                {times.length === 1 ? ' slot' : ' slots'}
                            </Text>
                        </View>
                        <View style={styles.timeGrid}>
                            {times.length > 0 ? (
                                times.map(slot => {
                                    const isTimeSelected = selectedTime?.slotId === slot.slotId;
                                    return (
                                        <TouchableOpacity
                                            key={slot.slotId}
                                            onPress={() =>
                                                dispatch(
                                                    setTime({
                                                        date: selectedDate,
                                                        slotId: slot.slotId,
                                                        time: slot.time,
                                                        mode: slot.mode,
                                                    })
                                                )
                                            }
                                            style={[
                                                styles.timeCard,
                                                isTimeSelected && styles.selectedTimeSlot,
                                            ]}
                                        >
                                            <Text style={[
                                                styles.timeSlotText,
                                                isTimeSelected && styles.selectedTimeSlotText]}>
                                                {slot.time}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })
                            ) : (
                                <Text style={{ color: '#999' }}>
                                    No slots available for this date
                                </Text>
                            )}
                        </View>
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* ---------- DATE SLOTS ---------- */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {dates.map((item, index) => {
                    const dateObj = new Date(item.date);
                    const isSelected = item.date === selectedDate;
                    const isDisabled = item.slotsAvailable === 0;
                    return (
                        <TouchableOpacity
                            key={item.date}
                            onPress={() => {
                                dispatch(setDate(item.date));
                            }}
                            style={[
                                styles.slotsCard,
                                selectedDate === item.date && styles.selectedCard,
                            ]}
                        >
                            <Text style={[
                                styles.dateSlots,
                                isSelected && styles.slotSelected]}>
                                {item.label}
                            </Text>
                            <Text style={[
                                styles.dateSlots,
                                isSelected && styles.slotSelected]}>
                                {getDateMonthLabel(dateObj)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* ---------- TIME SLOTS ---------- */}
            <FetchTimeSlots />

        </View>
    );
};

export default SlotBookingWomen;

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(30),
    },
    slotsCard: {
        width: scale(120),
        height: verticalScale(55),
        marginRight: scale(5),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F47FBB",
        alignItems: "center",
        justifyContent: 'center',
    },
    selectedCard: {
        backgroundColor: "#F47FBB",
        borderColor: "#F47FBB",
    },
    disabledCard: {
        backgroundColor: '#E0E0E0',
        borderColor: '#B0B0B0',
    },
    dateSlots: {
        fontSize: scale(15),
        fontWeight: '400',
    },
    slotSelected: {
        fontSize: scale(15),
        fontWeight: '500',
        color: '#FFFFFF',
    },
    slotsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: scale(30),
        paddingBottom: scale(15),
    },
    slotsHeaderText: {
        fontSize: scale(20),
        fontWeight: '600',
    },
    slotsHeaderTextCount: {
        fontSize: scale(16),
        fontWeight: '500',
        color: '#0DC955',
    },
    timeGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    timeCard: {
        width: "30%",
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(5),
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#F47FBB",
        alignItems: "center",
        marginBottom: verticalScale(10),
        marginHorizontal: scale(5),
    },
    selectedTimeSlot: {
        backgroundColor: '#F47FBB',
    },
    timeSlotText: {
        color: '#ff0084'
    },
    selectedTimeSlotText: {
        color: '#FFFFFF'
    }
})