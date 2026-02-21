import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, removeFromCart } from '../redux/labsCartSlice';

import { COLORS } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';

import { labApi } from '../services/labApi';
import useAuth from '../../../hooks/useAuth';

import CartHeader from '../components/CartHeader';
import CartPatientCard from '../components/CartPatientCard';
import CartCouponBanner from '../components/CartCouponBanner';
import CartFooter from '../components/CartFooter';
import AddPatientModal from '../components/AddPatientModal';
import useLabDetails from '../hooks/useLabDetails';

const LabsCartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user: authUser } = useAuth();
  const USER_ID = authUser?.id;

  useEffect(() => {
    if (authUser === null || authUser === undefined) return;
    setLoading(false);
  }, [authUser]);

  useEffect(() => {
    if (!USER_ID) {
      dispatch(setCartItems([]));
    }
  }, [USER_ID]);

  const [user, setUser] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const discountAmount = 60;
  const cartItems = useSelector(state => state.labsCart.items);

  const [showAddPatient, setShowAddPatient] = useState(false);
  const [selectedCartItemId, setSelectedCartItemId] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [billSummary, setBillSummary] = useState(null);
  const [updatingCart, setUpdatingCart] = useState(false);

  const [labId, setLabId] = useState(null);

  const { data } = useLabDetails(labId);

  useFocusEffect(
    useCallback(() => {
      if (USER_ID) fetchCart();
    }, [USER_ID]),
  );

  const fetchCart = useCallback(async () => {
    if (!USER_ID) return;

    try {
      setUpdatingCart(true);

      const res = await labApi.getLabCart(USER_ID);
      const data = res.data;
      console.log('cart items', data);

      dispatch(setCartItems(data.items || []));
      setTotalAmount(data.billSummary?.totalAmount || 0);
      setUser(data.user);

      setBillSummary(data.billSummary);
      setLabId(data.lab.id);
    } catch (error) {
      console.log('Cart error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
      setUpdatingCart(false);
    }
  }, [USER_ID]);

  const handleRemove = async (cartItemId, packageId) => {
    try {
      await labApi.deleteCartItem(cartItemId);

      dispatch(removeFromCart(packageId));

      fetchCart();
    } catch (error) {
      console.log('Delete error:', error.response?.data || error.message);
    }
  };

  const handlePatientSubmit = async patient => {
    try {
      const payload = {
        // userId: USER_ID,
        fullName: patient.name,
        age: Number(patient.age),
        gender: patient.gender,
        phone: patient.mobile,
        // consultationType: 'LAB_VISIT',
      };

      console.log('payload', patient);

      const res = await labApi.addPatientToCart(selectedCartItemId, payload);
      console.log('patient added successfully', res.data);
      setShowAddPatient(false);
      fetchCart();
    } catch (error) {
      console.log(error);
      console.log('Add patient error:', error.response?.data || error.message);
    }
  };

  const handleApplyCoupon = () => {
    setCouponApplied(true);
  };

  if (loading && !updatingCart) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color={COLORS.blue} />
      </SafeAreaView>
    );
  }

  if (!loading && !updatingCart && cartItems.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  console.log('labId', labId);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <CartHeader labName={data?.name} />
        <View
          style={{ marginHorizontal: scale(15), flex: 1, paddingVertical: 10 }}
        >
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: verticalScale(120) }}
            // ListHeaderComponent={<CartHeader />}
            renderItem={({ item }) => (
              <CartPatientCard
                patientName={item?.patient?.fullName || 'Myself'}
                age={item?.patient?.age || ''}
                gender={item?.patient?.gender || ''}
                packageName={item.name}
                tests={item.tests || []}
                price={`₹${item.price}`}
                onDeletePress={() => handleRemove(item.id, item.packageId)}
                onAddPatient={() => {
                  setSelectedCartItemId(item.id);
                  setShowAddPatient(true);
                }}
              />
            )}
            ListFooterComponent={
              <CartCouponBanner
                discountAmount={discountAmount}
                isApplied={couponApplied}
                onApply={handleApplyCoupon}
              />
            }
          />
        </View>

        <CartFooter
          totalAmount={totalAmount}
          billSummary={billSummary}
          onSelectSlots={() => navigation.navigate('AddAddress', { labId })}
        />
      </View>

      <AddPatientModal
        visible={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        onSubmit={handlePatientSubmit}
      />
    </>
  );
};

export default LabsCartScreen;
