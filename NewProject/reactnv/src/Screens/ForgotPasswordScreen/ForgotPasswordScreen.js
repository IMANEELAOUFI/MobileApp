import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, ScrollView,  Platform } from 'react-native'
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';



const ForgotPasswordScreen = () => { 
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

const navigation = useNavigation();

const validateEmail = email => {
    const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    return regex.test(email);
    };

    const onSendPressed = () => {
        if (!validateEmail(email)) {
            setEmailError(true);
            return;
            } else {
            setEmailError(false);
            }
        navigation.navigate('New password');
    };
    
    const onSignInPressed = () => {
        navigation.navigate('Sign in');
    };


    return (
        <ScrollView>
       <View style={styles.fot}>
        <View style={styles.root}>
            <Text style={styles.title}>
               Reset your password 
            </Text>
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>

            <Entypo name="email" 
            color="#05375a" 
            size={20} 
            />
             
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
             

             <CustomButton  
             text="Send" 
             onPress={onSendPressed}  
             /> 
              

             <CustomButton  
             text="Back to Sign in" 
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

    footer: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    
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

export default ForgotPasswordScreen