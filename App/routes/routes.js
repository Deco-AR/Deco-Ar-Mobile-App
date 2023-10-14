import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyCode from '../screens/VerifyCode';
import Home from '../screens/Home';
import Successfull from '../screens/Successfull';

export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="Verify Code" component={VerifyCode} />
        <Stack.Screen name="Successfull" component={Successfull} />
        <Stack.Screen name="Home" component={HomeNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
