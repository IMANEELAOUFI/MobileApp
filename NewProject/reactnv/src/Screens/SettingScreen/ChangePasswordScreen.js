import React, { useState } from 'react';
import { View, TextInput, ScrollView, Alert, StyleSheet, TouchableOpacity, Text, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import reset from '../../../assets/images/reset.jpg';
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import * as Animatable from 'react-native-animatable';

const ChangePasswordScreen = () => {
    const {height} = useWindowDimensions();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigation = useNavigation();

  const handleChangePassword = () => {
    // Vérifier si les champs sont vides
    if (currentPassword === '' || newPassword === '' || confirmNewPassword === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // Vérifier si les mots de passe ne correspondent pas
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    // Envoyer une demande au serveur pour changer le mot de passe
    // Remplacez cet exemple avec votre propre logique pour la modification du mot de passe

    // Réinitialiser les champs
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');

    // Afficher une confirmation de réussite
    //Alert.alert('Succès', 'Le mot de passe a été modifié avec succès');
    navigation.navigate('Sign in');
  };

  

  return (
    <ScrollView>
    <View style={styles.fot}>
    <View style={styles.root}>
        <Image
         source={reset} 
         style={[styles.LogoMakr, {height: height * 0.3}]}
          resizeMode='contain' />
    </View>
    <Animatable.View style={styles.footer} animation="fadeInUpBig">
    <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Mot de passe actuel"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Confirmer le nouveau mot de passe"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      <CustomButton 
      text="Changer le mot de passe" 
      onPress={handleChangePassword} 
      />

     
    </Animatable.View>
    </View>
    </ScrollView>
);
};

  

const styles = StyleSheet.create({
    fot: {
        flex: 1,
        backgroundColor: "#f6f6f6" , 
    },
    root: {
        flex: 2,
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#f6f6f6" ,
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
    
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  navigateToLoginButton: {
    marginTop: 16,
  },
  navigateToLoginText: {
    marginLeft: 70,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ChangePasswordScreen;