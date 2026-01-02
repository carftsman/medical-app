import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding2 from '../screens/Onboarding2';
import Onboarding3 from '../screens/Onboarding3';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RequestOTPScreen from '../screens/RequestOTPScreen';
import EnterOTPScreen from '../screens/EnterOTPScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import EnterMobileNumberScreen from '../screens/EnterMobileNumberScreen';
import EnterOTPScreenLogin from '../screens/EnterOTPScreenLogin';
import Onboarding1 from '../screens/Onboarding1';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PhoneInput" component={EnterMobileNumberScreen} />
      <Stack.Screen name="EnterOTP" component={EnterOTPScreen} />
      <Stack.Screen name="RequestOTP" component={RequestOTPScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="OTP" component={EnterOTPScreenLogin} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
