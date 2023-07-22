import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {Title} from 'react-native-paper';
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native-animatable';
import ProfilePic from '../../../assets/images/ProfilePic.png';


const SECTIONS =[
{
    header: 'Profile',
    items: [
       // { id: 'View profile', icon:'user', label:'View profile', type: 'select'},
        { id: 'Change profile photo', icon:'camera', label:'Change profile photo', type: 'select'},
    ],
},
/*{
    header: 'Account',
    items: [
        { id: 'Modify personal information', icon:'edit', label:'Modify personal information', type: 'select'},
    ],
},*/
{
    header: 'Password',
    items: [
        { id: 'Change password', icon:'lock', label:'Change password', type: 'select'},
      
    ],
},
];

const SettingScreen = () => {

    const navigation = useNavigation();

    const onDeconnexionPressed = () => {
        navigation.navigate('Sign in');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6'}}>
           <ScrollView contentContainerStyle={styles.con} showsVerticalScrollIndicator={false}> 
            <View style={styles.header}>
             <Text style={styles.tir}>Settings</Text> 
            </View>
            <TouchableOpacity style={styles.profil}>
                <View>
                    <Image 
                    source={ProfilePic} 
                    style={styles.profileAvatar}
                    />
                 <View style={{marginLeft: 1}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>username</Title>
          </View>
      </View>
            </TouchableOpacity>
            <View style={styles.sectionHeader}>
        <View style={styles.row}>
        <FontAwesome name="envelope" size={20} color="#000" />
          <Text style={{color:"#000", marginLeft: 20}}>email</Text>
        </View>
        <View style={styles.row}>
        <Feather name="phone" color="#000" size={20} />
          <Text style={{color:"#000", marginLeft: 20}}>phone number</Text>
        </View>
      </View>

            {SECTIONS.map(({ header, items }) => (
                <View style={styles.section} key={header}>
                    <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{header}</Text>
                    </View>

                    <View>
                        {items.map(({label, id, type, icon}, index) => (
                          <View style={[styles.rowWrapper, index === 0 && {borderTopWidth: 0},
                          ]} key={id}>
                           <TouchableOpacity onPress={() => {
                            if (label == 'Change password'){
                                navigation.navigate('Change');
                            }
                  }}>
                            <View style={styles.row}>
                                <Feather
                                name={icon} color="#616161" size={22} style={{marginRight: 12}}
                                />
                            <Text style={styles.rowLabel}>{label}</Text>
                            <View style={styles.rowSpacer} />
                                {['select', 'link'].includes(type) &&  (
                                    <Feather name="chevron-right" color="#ababab" size={22}/>
                                )}
                            </View>
                           </TouchableOpacity>
                          </View>
                        ))}
                    </View>
                </View>
            ))}
            
             <CustomButton  
               text="Log out" 
               onPress={onDeconnexionPressed}  
             /> 
            </ScrollView>  
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
   },
   title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
    con: {
        paddingVertical: 14,
    },
    tir: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
         marginVertical: 10,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 12,
    },

    section:{
        paddingTop: 1,
    },
    sectionHeader: {
         paddingHorizontal: 14,
         paddingVertical: 8,
    },
    sectionHeaderText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#a7a7a7',  
    },

    rowWrapper: {
           paddingLeft: 24,
           borderTopWidth: 1,
           borderColor: '#e3e3e3',
           backgroundColor: '#fff',
    },

    row: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24,
    },

    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
    },

    rowSpacer: {
        flex: 1,
    },
    profileAvatar: {
        width: 122,
        height: 122,
        borderRadius: 9999,
    },
    profil: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

  });

export default SettingScreen;