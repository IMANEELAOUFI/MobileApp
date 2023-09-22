import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRoute } from '@react-navigation/native';

import SigninScreen from '../Screens/SigninScreen/SigninScreen';
import SignupScreen from '../Screens/SignupScreen/SignupScreen';
import ConfirmEmailScreen from '../Screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../Screens/NewPasswordScreen/NewPasswordScreen';
import HomeScreen from '../Screens/HomeScreen';
import AdminHomeScreen from '../Screens/AdminHomeScreen/AdminHomeScreen';
import ChatMessages from '../Screens/ChatScreen/ChatMessages';
import GetstartedScreen from '../Screens/GetstartedScreen/GetstartedScreen';
import SettingScreen from '../Screens/SettingScreen/SettingScreen';
import SavedDocs from '../Screens/SavedDocs/SavedDocs';
import ChatScreen from '../Screens/ChatScreen/ChatScreen';
import PdfScreen from '../Screens/ChatScreen/PdfScreen';
import ContactScreen from '../Screens/ChatScreen/ContactScreen';
import ChangePasswordScreen from '../Screens/SettingScreen/ChangePasswordScreen';
import OnUpdateUserInfo from '../Screens/UpdateUserInfo/OnUpdateUserInfo'





const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function SaDocs() {
    return ( 
      <SavedDocs/>
    );
  }
  function ChScreen() {
    return (
      <ChatScreen/>
    );
  }
  function MsgScreen() {
    return (
      <ChatMessages/>
    );
  }
  function CntScreen() {
    return (
      <ContactScreen/>
    );
  }
  function SeScreen() {
    return (       
      <SettingScreen/>    
    );
  }
  function FileScreen() {
    return (       
      <PdfScreen/>    
    );
  }


  function TabB() {
    const route = useRoute();
    const { name } = route.params;
    return (
        <Tab.Navigator initialRouteName="Chat" screenOptions={{headerShown: false }}>
          <Tab.Screen  name="Contact"  component={CntScreen}
         options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}/>
          <Tab.Screen name="Chat" component={ChScreen} 
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="chat" color={color} size={size} />
            ),
          }}initialParams={{ name }}/>
          <Tab.Screen name="Settings" component={SeScreen} 
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }}/>
        </Tab.Navigator>

    );
  }

  


  function TabA() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false }}>
          <Tab.Screen name="Users" component={AdminHomeScreen} 
          options={{
            tabBarLabel: 'Users',
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" color={color} size={size} />
            ),
          }}/>
          
          <Tab.Screen name="Saved" component={SaDocs}
          options={{
            tabBarLabel: 'documents',
            tabBarIcon: ({ color, size }) => (
              <Feather name="file-text" color={color} size={size} />
            ),
          }} />

          <Tab.Screen name="Settings" component={SettingScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }} />
        </Tab.Navigator>

    );
  }

  

const Naviagtion = () => {

    return (
        <NavigationContainer>
             <Stack.Navigator screenOptions={{headerShown: false }}>
             <Stack.Screen name="Get started" component={GetstartedScreen} />
             <Stack.Screen name="Sign in" component={SigninScreen} />
             <Stack.Screen name="Admin" component={TabA} />
             <Stack.Screen name="Sign up" component={SignupScreen} />
             <Stack.Screen name="confirm email" component={ConfirmEmailScreen} />
             <Stack.Screen name="Forgot password" component={ForgotPasswordScreen} />
             <Stack.Screen name="New password" component={NewPasswordScreen} />
             <Stack.Screen name="Home" component={TabB} />
             <Stack.Screen name="Message" component={MsgScreen} />
             <Stack.Screen name="Chat" component={ChScreen} />
             <Stack.Screen name="Change" component={ChangePasswordScreen} />
             <Stack.Screen name="PdfScreen" component={FileScreen} />
             <Stack.Screen name="OnUpdateUserInfo" component={OnUpdateUserInfo} />
             

    </Stack.Navigator>
        </NavigationContainer>
    );
};



export default Naviagtion;