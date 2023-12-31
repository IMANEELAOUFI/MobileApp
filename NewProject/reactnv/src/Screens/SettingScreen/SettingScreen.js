import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
import CustomButton from '../../Compenents/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePic from '../../../assets/images/ProfilePic.png';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { request, PERMISSIONS } from 'react-native-permissions';

const API_BASE_URL = 'http://192.168.100.153:8000/api';
const SECTIONS = [
  {
    header: 'Profile',
    items: [
      // { id: 'View profile', icon:'user', label:'View profile', type: 'select'},
      { id: 'Change profile photo', icon: 'camera', label: 'Change profile photo', type: 'select' },
    ],
<<<<<<< HEAD
},
{
    header: 'Account',
    items: [
        { id: 'Modify personal information', icon:'edit', label:'Update User Info', type: 'select'},
    ],
},
{
=======
  },
  /*{
      header: 'Account',
      items: [
          { id: 'Modify personal information', icon:'edit', label:'Modify personal information', type: 'select'},
      ],
  },*/
  {
>>>>>>> b44b40910fa62b7573a4fb7537044091566a9727
    header: 'Password',
    items: [
      { id: 'Change password', icon: 'lock', label: 'Change password', type: 'select' },
    ],
  },
];

// Save profile picture for the current user
const saveProfilePicture = async (userId, profilePicturePath) => {
  try {
    await AsyncStorage.setItem(`profilePicture_${userId}`, profilePicturePath);
  } catch (error) {
    console.error('Error saving profile picture:', error);
  }
};

// Retrieve profile picture for the current user
const retrieveProfilePicture = async (userId) => {
  try {
    const profilePicture = await AsyncStorage.getItem(`profilePicture_${userId}`);
    return profilePicture;
  } catch (error) {
    console.error('Error retrieving profile picture:', error);
    return null; // Return a default profile picture or handle the error as needed.
  }
};

const SettingScreen = () => {
  const [ProfilePic, setProfilePic] = useState(null); // Initialize to null
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

<<<<<<< HEAD
    const onDeconnexionPressed = () => {
        navigation.navigate('Sign in');
    };
    const OnUpdateUserInfo = () => {
        navigation.navigate('OnUpdateUserInfo');
        };
=======
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/sessionUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
>>>>>>> b44b40910fa62b7573a4fb7537044091566a9727

      console.log('User Data:', response.data.data.items);

      if (response.data.success) {
        const userData = response.data.data.items;
        console.log('RESPONSE:', userData);

        // Retrieve and set the profile picture for the current user
        const profilePicture = await retrieveProfilePicture(userData[0].id);
        if (profilePicture) {
          setProfilePic(profilePicture);
        }

        setUserData(userData);
        setLoading(false);
      } else {
        console.error('Error while loading Contacts:', response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error while loading Contacts:', error.message);
      setLoading(false);
    }
  };

  const onDeconnexionPressed = () => {
    navigation.navigate('Sign in');
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((profilePic) => {
      console.log(profilePic);
      setProfilePic(profilePic.path);

      // Save the selected profile picture for the current user
      saveProfilePicture(userData[0].id, profilePic.path);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <ScrollView contentContainerStyle={styles.con} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.tir}>Settings</Text>
        </View>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <>
            {userData && (
              <TouchableOpacity style={styles.profil} onPress={choosePhotoFromLibrary}>
                <View>
                  <Image
                    source={ProfilePic ? { uri: ProfilePic } : ProfilePic}
                    style={styles.profileAvatar}
<<<<<<< HEAD
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
=======
                    key={ProfilePic}
                  />
                  <View style={{ marginLeft: 1 }}>
                    <Title
                      style={[
                        styles.title,
                        {
                          marginTop: 15,
                          marginBottom: 5,
                        },
                      ]}
                    >
                      {userData[0].username}
                    </Title>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            {userData && (
              <View style={styles.sectionHeader}>
                <View style={styles.row}>
                  <FontAwesome name="envelope" size={20} color="#000" />
                  <Text style={{ color: '#000', marginLeft: 20 }}>{userData[0].email}</Text>
                </View>
                <View style={styles.row}>
                  <Feather name="phone" color="#000" size={20} />
                  <Text style={{ color: '#000', marginLeft: 20 }}>{userData[0].phone_number}</Text>
                </View>
              </View>
            )}
>>>>>>> b44b40910fa62b7573a4fb7537044091566a9727

            {userData &&
              SECTIONS.map(({ header, items }) => (
                <View style={styles.section} key={header}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{header}</Text>
                  </View>

<<<<<<< HEAD
                    <View>
                        {items.map(({label, id, type, icon}, index) => (
                          <View style={[styles.rowWrapper, index === 0 && {borderTopWidth: 0},
                          ]} key={id}>
                           <TouchableOpacity onPress={() => {
                            if (label == 'Change password'){
                                navigation.navigate('Change');
                            }else if(label == 'Update User Info'){
                                OnUpdateUserInfo();
=======
                  <View>
                    {items.map(({ label, id, type, icon }, index) => (
                      <View
                        style={[
                          styles.rowWrapper,
                          index === 0 && { borderTopWidth: 0 },
                        ]}
                        key={id}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (label == 'Change password') {
                              navigation.navigate('Change');
>>>>>>> b44b40910fa62b7573a4fb7537044091566a9727
                            }
                          }}
                        >
                          <View style={styles.row}>
                            <Feather
                              name={icon}
                              color="#616161"
                              size={22}
                              style={{ marginRight: 12 }}
                            />
                            <Text style={styles.rowLabel}>{label}</Text>
                            <View style={styles.rowSpacer} />
                            {['select', 'link'].includes(type) && (
                              <Feather name="chevron-right" color="#ababab" size={22} />
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              ))}

            <CustomButton text="Log out" onPress={onDeconnexionPressed} />
          </>
        )}
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

  section: {
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
