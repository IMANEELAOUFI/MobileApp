import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { Image } from 'react-native-animatable';
import ProfilePic from '../../../assets/images/ProfilePic.png';

const SECTIONS =[
{
    header: 'Profile',
    items: [
        { id: 'View profile', icon:'user', label:'View profile', type: 'select'},
        { id: 'Change profile photo', icon:'camera', label:'Change profile photo', type: 'select'},
    ],
},
{
    header: 'Account',
    items: [
        { id: 'Delete account', icon:'trash-2', label:'Delete account', type: 'select'},
        { id: 'Modify personal information', icon:'edit', label:'Modify personal information', type: 'select'},
    ],
},
{
    header: 'Password',
    items: [
        { id: 'Change password', icon:'lock', label:'Change password', type: 'select'},
      
    ],
},

{
    header: 'Statistics',
    items: [
        { id: 'View statistics', icon:'bar-chart-2', label:'View statistics', type: 'select'},
      
    ],
},
];

const SettingAdminScreen = () => {

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
                </View>
            </TouchableOpacity>
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
    con: {
        paddingVertical: 24,
    },
    tir: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
         marginVertical: 20,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 12,
    },

    section:{
        paddingTop: 12,
    },
    sectionHeader: {
         paddingHorizontal: 24,
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
        width: 92,
        height: 92,
        borderRadius: 9999,
    },
    profil: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

  });

export default SettingAdminScreen;