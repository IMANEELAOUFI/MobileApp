import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';



const OnUpdateUserInfo = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
 


  

    const validateEmail = email => {
      
    // const regex = /^\w+([.-]?\w+)\w+([.-]?\w+)@intellcap\.fr$/;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // return regex.test(email);
    return regex.test(email.trim())
    
    };
    
    

  const validatePhoneNumber = (phone_number) => {
    const phoneNumberRegex = /^\d{10,14}$/;
    return phoneNumberRegex.test(phone_number.trim());
  };


  const onUpdatePressed = () => {
    
    const errors = {};
  
  if (!validateEmail(email)) {
    errors.email = 'Invalid email address';
  }
  
  
  
  if (!validatePhoneNumber(phone_number)) {
    errors.phone_number = 'Invalid phone number';
  }
  
  console.log(errors)
  if (Object.keys(errors).length > 0) {
    setEmailError(errors.email || false);
    setPhoneNumberError(errors.phone_number || false);
    return false;
    
  } 
  return true;
  };
  
  const handleUpdate = async () => {
    try {
       //getId()
      const user = await AsyncStorage.getItem('User')

      const token = await AsyncStorage.getItem('token')
      const id  = JSON.parse(user).id;
      const response = await axios.put(`http://192.168.11.101:8000/api/user/${id}`, {
        username,
        email,
        phone_number} ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        
      })

      
      // Handle the response from the backend
      console.log(response.data);
      Alert.alert('Updated');
      // Redirect or perform any other action based on the response
      //navigation.navigate('Sign in');
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.fot}>
        <View style={styles.root}>
          <Text style={styles.title}>Update User Info</Text>
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} color="#05375a" />

            <TextInput
              placeholder="username"
              style={styles.textInput}
              autoCapitalize="none"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>

          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <Entypo name="email" color="#05375a" size={20} />

            <TextInput
              placeholder="Your email"
              style={styles.textInput}
              autoCapitalize="none"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          {emailError && (
        <Text style={styles.errorMsg}>Invalide email address</Text>
          )}

          <Text style={styles.text_footer}>Phone number</Text>
          <View style={styles.action}>
            <Feather name="phone" color="#05375a" size={20} />

            <TextInput
              placeholder="Your phone number"
              style={styles.textInput}
              autoCapitalize="none"
              value={phone_number}
              onChangeText={text => setPhone_number(text)}
            />
          </View>
          {phoneNumberError && (
        <Text style={styles.errorMsg}>Invalide phone number</Text> 
          )}

            

             <CustomButton  
             text="Update" 
             onPress={()=>onUpdatePressed() && handleUpdate()} 
             />
        </Animatable.View>
      </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
   
    fot: {
        flex: 1,
        backgroundColor: "#ADD8E6", 
    },
      root: {
          flex: 2,
          alignItems: 'center',
          padding: 20,
          backgroundColor: "#ADD8E6",
          justifyContent: 'center',
      
      },
    
    text: {
     color: 'gray',
     marginVertical: 10,   
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 50,
        
    },

    link: {
         color: '#F0B074',  
    },

    footer: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    
      },

      text_footer: {
        color: '#05375a',
        fontSize: 18
    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});

 export default OnUpdateUserInfo
