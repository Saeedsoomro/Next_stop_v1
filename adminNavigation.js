import React from 'react';
import {View, Text} from 'react-native';
import SignUp from './src/screens/SignUp';
import OrderTracking from './src/screens/vendor screens/OrderTracking';
import ReviewTimelineVendors from './src/screens/vendor screens/ReviewTimelineVendors';
import MenuPage from './src/screens/MenuPage';
import About from './src/screens/About';
import Tracking from './src/screens/Tracking';
import Information from './src/screens/vendor screens/Information';
import Profile from './src/screens/Profile';
import Cart from './src/screens/Cart';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import HomepageVendor from './src/screens/vendor screens/HomepageVendor';
import HomepageAccepted from './src/screens/vendor screens/HomepageAccepted';
import HomepageDeclined from './src/screens/vendor screens/HomepageDeclined';
import MenuReservationMenu from './src/screens/vendor screens/MenuReservationMenu';
import OrderTrackingToday from './src/screens/vendor screens/OrderTrackingToday';
import MenuReservationAddItems from './src/screens/vendor screens/MenuReservationAddItems';
import OrderTrackingPrevious from './src/screens/vendor screens/OrderTrackingPrevious';
import HomepageProfile from './src/screens/vendor screens/HomepageProfile';
import HomepageSettings from './src/screens/vendor screens/HomepageSettings';
import MenuReservationSeats from './src/screens/vendor screens/MenuReservationSeats';
import HomepageNew from './src/screens/vendor screens/HomepageNew';
import AdminHome from './src/screens/vendor screens/AdminHome';
import AdminLogin from './src/screens/vendor screens/AdminLogin';
import AdminSignUp from './src/screens/vendor screens/AdminSignup';
import AdminOTPVerification from './src/screens/vendor screens/AdminOtp';

/*
const Stack = createNativeStackNavigator();


// inside a return statement

 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} /> 
        <Stack.Screen name="Homepage" component={Homepage} />
         <Stack.Screen name="UserProfile" component={Profile} />
         <Stack.Screen name="ViewAll" component={ViewAll} />
         <Stack.Screen name="OrderHistory" component={OrderHistory} />
         <Stack.Screen name="Favourites" component={Favourites} />
         <Stack.Screen name="ReviewTimeline" component={ReviewTimeline} />
         <Stack.Screen name="DealsAndDiscount" component={DealsAndDiscount} />
         <Stack.Screen name="PaymentMethod" component={HomepagePaymentMethod} />
         <Stack.Screen name="Settings" component={Settings} />
         <Stack.Screen name="PreBookingPage" component={PreBookingPage} />
         <Stack.Screen name="MenuPage" component={MenuPage} />
         <Stack.Screen name="ReviewPage" component={ReviewPage} />
         <Stack.Screen name="About" component={About} />
         <Stack.Screen name="Cart" component={Cart} />
         <Stack.Screen name="Payment" component={Payment} />
         <Stack.Screen name="Tracking" component={Tracking} /> 
         

        //admin side route 
        <Stack.Screen name="HomepageVendor" component={HomepageVendor} />
        <Stack.Screen name="HomepageProfile" component={HomepageProfile} />
        <Stack.Screen name="OrderTrackingPrevious" component={OrderTrackingPrevious} />
        <Stack.Screen name="HomepageSettings" component={HomepageSettings} />
        <Stack.Screen name="MenuReservationSeats" component={MenuReservationSeats} />
        <Stack.Screen name="MenuReservationAddItems" component={MenuReservationAddItems} />
        <Stack.Screen name="MenuReservationMenu" component={MenuReservationMenu} />
        <Stack.Screen name="OrderTrackingToday" component={OrderTrackingToday} />
        <Stack.Screen name="OrderTracking" component={OrderTracking} />
        <Stack.Screen name="ReviewTimelineVendors" component={ReviewTimelineVendors} />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="HomepageNew" component={HomepageNew} />
        <Stack.Screen name="HomepageAccepted" component={HomepageAccepted} />
        <Stack.Screen name="HomepageDeclined" component={HomepageDeclined} />
*/

export default function AdminNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/*admin side route */}
        <Stack.Screen name="AdminHome" component={AdminHome} />
        {/* <Stack.Screen name="AdminLogin" component={AdminLogin} /> */}
        <Stack.Screen name="AdminSignup" component={AdminSignUp} />
        {/*<Stack.Screen name="AdminOtp" component={AdminOTPVerification} />*/}

        <Stack.Screen name="HomepageVendor" component={HomepageVendor} />
        <Stack.Screen name="HomepageProfile" component={HomepageProfile} />
        <Stack.Screen
          name="OrderTrackingPrevious"
          component={OrderTrackingPrevious}
        />
        <Stack.Screen name="HomepageSettings" component={HomepageSettings} />
        <Stack.Screen
          name="MenuReservationSeats"
          component={MenuReservationSeats}
        />
        <Stack.Screen
          name="MenuReservationAddItems"
          component={MenuReservationAddItems}
        />
        <Stack.Screen
          name="MenuReservationMenu"
          component={MenuReservationMenu}
        />
        <Stack.Screen
          name="OrderTrackingToday"
          component={OrderTrackingToday}
        />
        <Stack.Screen name="OrderTracking" component={OrderTracking} />
        <Stack.Screen
          name="ReviewTimelineVendors"
          component={ReviewTimelineVendors}
        />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="HomepageNew" component={HomepageNew} />
        <Stack.Screen name="HomepageAccepted" component={HomepageAccepted} />
        <Stack.Screen name="HomepageDeclined" component={HomepageDeclined} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
