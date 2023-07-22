import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import LogoMakr from '../../../assets/images/LogoMakr.png';
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';



const GetstartedScreen = () => { 

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('Sign in');
    };



    return (
        <ScrollView>
        <View style={styles.fot}>
        <View style={styles.root}>
            <Image
             source={LogoMakr} 
             style={[styles.LogoMakr, {height: height * 0.3}]}
              resizeMode='contain' />
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
              <Text style={styles.titre}>Stay connected with everyone!</Text>
            <View style={{ marginVertical: 24}}>
             <CustomButton 
              text="Get Started" 
              onPress={onSignInPressed}
             /> 
            </View>  
        </Animatable.View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    fot: {
        flex: 1,
        backgroundColor: "#ADD8E6" , 
    },
    root: {
        flex: 2,
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#ADD8E6" ,
        justifyContent: 'center',
    
    },
    LogoMakr: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 300,
        margin: 20,
        
    },

    footer: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        
    
      },
 
      titre: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    
});

export default GetstartedScreen