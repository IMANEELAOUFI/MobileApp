import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';



const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = useState(false);




  const navigation = useNavigation();

    const validateEmail = email => {
    //const regex = /^\w+([.-]?\w+)\w+([.-]?\w+)@intellcap\.fr$/;
    const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    return regex.test(email);
    };
    
    const validatePassword = password => {
    return password.length >= 6;
    };

    const validatePasswordRepeat = password_confirmation => {
        return  password_confirmation === password;
        };

  const validatePhoneNumber = (phone_number) => {
    const phoneNumberRegex = /^\d{10,14}$/;
    return phoneNumberRegex.test(phone_number);
  };


  const onRegisterPressed = () => {
    
    const errors = {};
  
  if (!validateEmail(email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!validatePassword(password)) {
    errors.password = ' Password must contain at least 6 characters';
  }
  
  if (!validatePhoneNumber(phone_number)) {
    errors.phone_number = 'Invalid phone number';
  }
  
  if (!validatePasswordRepeat(password_confirmation)) {
    errors.password_confirmation = 'Passwords do not match';
  }
  
  if (Object.keys(errors).length > 0) {
    setEmailError(errors.email || false);
    setPasswordError(errors.password || false);
    setPhoneNumberError(errors.phone_number || false);
    setPasswordRepeatError(errors.password_confirmation || false);
    return;
    
  }
  
  handleSignup(); 
  };
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://192.168.1.7:8000/api/register', {
        username,
        email,
        phone_number,
        password,
        password_confirmation
      });

      // Handle the response from the backend
      console.log(response.data);

      // Redirect or perform any other action based on the response
      navigation.navigate('Sign in');
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate('Sign in');
  };

  const onTermsUsePressed = () => {
    console.warn('onTermsUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('oonPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.fot}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>
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

            <Text style={styles.text_footer}>Password</Text>
        <View style={styles.action}>
            <Feather 
                    name="lock"
                    color="#05375a" 
                    size={20}
                />
              <TextInput 
                    placeholder="Your password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
              
        </View>
        {passwordError && (
        <Text style={styles.errorMsg}>Password must contain at least 6 characters</Text>
        )}

        <Text style={styles.text_footer}>Confirm password</Text>
        <View style={styles.action}>
            <Feather 
                    name="lock"
                    color="#05375a" 
                    size={20}
                />
              <TextInput 
                    placeholder="Confirm your password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={password_confirmation}
                    onChangeText={text => setPassword_confirmation(text)}
                    
                />
              
        </View>
        {passwordRepeatError && (
        <Text style={styles.errorMsg}> Passwords do not match </Text>
        )}

             <CustomButton 
              text="Register " 
              onPress={onRegisterPressed}
              
              />  
             <Text style={styles.text}>
                By registering, you confirme that you accept our{' '} 
                <Text style={styles.link} onPress={onTermsUsePressed}>termes of Use</Text> and{' '}  
                <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
                </Text> 

             <CustomButton  
             text="Have an account? Sign In" 
             onPress={onSignInPressed} 
             type="TERTIARY" 
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

export default SignupScreen