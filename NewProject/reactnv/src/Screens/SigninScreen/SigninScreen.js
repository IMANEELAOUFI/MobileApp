import React, {useState} from 'react';
import {
View,
Text,
TextInput,
StyleSheet,
ScrollView,
Platform,
} from 'react-native';
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';


const SigninScreen = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [emailError, setEmailError] = useState(false);
const [passwordError, setPasswordError] = useState(false);

const navigation = useNavigation();

const validateEmail = email => {
 const regex = /^\w+([.-]?\w+)\w+([.-]?\w+)@intellcap\.fr$/;
 //const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return regex.test(email);
}
const validatePassword = password => {
return password.length >= 6;
};



const onSignInPressed = () => {

    const errors = {};
  
    if (!validateEmail(email)) {
        errors.email = 'Invalid email address';
      }
      
      if (!validatePassword(password)) {
        errors.password = ' Password must contain at least 6 characters';
      }
      if (Object.keys(errors).length > 0) {
        setEmailError(errors.email || false);
        setPasswordError(errors.password || false);
        return;
      }
      handleSignin();
    };
  
    const handleSignin = async () => {
      try {
        const response = await axios.post('http://192.168.0.150:8000/api/login', {
          email,
          password
        });
  
        // Handle the response from the backend
        console.log(response.data.data.accessToken);
        await AsyncStorage.setItem('token', response.data.data.accessToken);
        // Redirect or perform any other action based on the response
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.accessToken}`;
        const role = response.data.data.user.role;
        role == 'user' ?
        navigation.navigate('Home', { name: response.data.data.user.username }):
        navigation.navigate('Admin', { name: response.data.data.user.username })
        ;
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };


const onSignUpPressed = () => {
navigation.navigate('Sign up');
};

return (
<ScrollView>
<View style={styles.fot}>
<View style={styles.root}>
<Text style={styles.title}>Welcome Back!</Text>
</View>
<Animatable.View style={styles.footer} animation="fadeInUpBig">
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
        <Text style={styles.errorMsg}>Enter a valid email address</Text>
      )}
      <Text style={styles.text_footer}>Password</Text>
      <View style={styles.action}>
        <Feather name="lock" color="#05375a" size={20} />
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
        <Text style={styles.errorMsg}>
          Password must contain at least 6 characters
        </Text>
      )}
      <CustomButton text="Sign In" onPress={onSignInPressed} />

      

<CustomButton
  text="Don't have an account? Sign Up"
  onPress={onSignUpPressed}
  type="TERTIARY"
/>
    </Animatable.View>
  </View>
</ScrollView>
 );
};

const styles = StyleSheet.create({
  signUpText: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#05375a',
    fontSize: 16,
  },
    fot: {
        flex: 1,
        backgroundColor: "#ADD8E6", 
    },
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#ADD8E6",
        justifyContent: 'center',
    
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        margin: 50,
        
    },

    footer: {
        flex: 3,
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

export default SigninScreen