import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, ScrollView,  Platform } from 'react-native'
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';



const NewPasswordScreen = () => { 
const [code, setCode] = useState('');
const [codeError, setCodeError] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [newPasswordError, setNewPasswordError] = useState(false);
const [passwordRepeat, setPasswordRepeat] = useState('');
const [passwordRepeatError, setPasswordRepeatError] = useState(false);

const navigation = useNavigation();
    
const validateNewPassword = newPassword => {
    return newPassword.length >= 6;
    };
const validateCode = code => {
    return code.length == 4;
    };
const validatePasswordRepeat = passwordRepeat => {
        return  passwordRepeat === newPassword;
        };

    const onSubmitPressed = () => {
        const errors = {};
        if (!validateCode(code)) {
            errors.code = ' Code must contain just 4 characters';
          }
        if (!validateNewPassword(newPassword)) {
            errors.newPassword = ' Password must contain at least 6 characters';
          }
          if (!validatePasswordRepeat(passwordRepeat)) {
            errors.passwordRepeat = 'Passwords do not match';
          }
          if (Object.keys(errors).length > 0) {
            setCodeError(errors.code || false);
            setNewPasswordError(errors.newPassword || false);
            setPasswordRepeatError(errors.passwordRepeat || false);
            return;
          }
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
        <Text style={styles.text_footer}>Code</Text>
            <View style={styles.action}>

            <FontAwesome 
                 name="code"
                 color="#05375a"
                 size={20}
/>
             
             <TextInput 
                    placeholder="Enter your confirmation code"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={code}
                    onChangeText={text => setCode(text)}
                />
              
      
            </View>
            {codeError && (
        <Text style={styles.errorMsg}>Code must contain just 4 characters</Text>
      )}

             <Text style={styles.text_footer}>New password</Text>
        <View style={styles.action}>
            <Feather 
                    name="lock"
                    color="#05375a" 
                    size={20}
                />
              <TextInput 
                    placeholder="Your new password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    
                />
              
        </View>
        {newPasswordError && (
        <Text style={styles.errorMsg}>Password must contain at least 6 characters</Text>
      )}     

<Text style={styles.text_footer}>Confirm new password</Text>
        <View style={styles.action}>
            <Feather 
                    name="lock"
                    color="#05375a" 
                    size={20}
                />
              <TextInput 
                    placeholder="Confirm your new password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={passwordRepeat}
                    onChangeText={text => setPasswordRepeat(text)}
                    
                />
              
        </View>
        {passwordRepeatError && (
        <Text style={styles.errorMsg}> Passwords do not match </Text>
        )}

             <CustomButton  
             text="Submit" 
             onPress={onSubmitPressed}  
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

export default NewPasswordScreen