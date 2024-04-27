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
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import Category from '../screens/Category';
import {CartIcon, CategoryIcon, HomeIcon, ProfileIcon} from '../assets/images';
import {SvgXml} from 'react-native-svg';
import ProfileDetail from '../screens/ProfileDetail';
import ProductDetails from '../screens/ProductDetails';
import ARSetup from '../screens/ARSetup';
import Pay from '../screens/Pay';
import MyOrders from '../screens/MyOrders';
import MyFavourites from '../screens/MyFavourites';

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
        <Stack.Screen name="HomeScreens" component={HomeNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: {height: 60, backgroundColor: '#fff'},
      }}>
      <Tab.Screen
        name="HomeNestedNavigation"
        component={HomeNestedNavigation}
        options={{
          tabBarIcon: ({focused}) => BottomTabsIcon(HomeIcon, focused),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: ({focused}) => BottomTabsIcon(CategoryIcon, focused),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigation}
        options={{
          tabBarIcon: ({focused}) => BottomTabsIcon(CartIcon, focused),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({focused}) => BottomTabsIcon(ProfileIcon, focused),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function HomeNestedNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ARSetup" component={ARSetup} />
    </Stack.Navigator>
  );
}

function CartNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CartScreen" component={Cart} />
      <Stack.Screen name="Pay" component={Pay} />
    </Stack.Navigator>
  );
}

function ProfileNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PersonalDetail" component={ProfileDetail} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="MyFavourites" component={MyFavourites} />
    </Stack.Navigator>
  );
}

export const BottomTabsIcon = (icon, focused) => (
  <SvgXml
    xml={icon}
    fill={focused ? '#FDCB6E' : '#000000'}
    stroke={focused ? '#FDCB6E' : '#000000'}
  />
);
