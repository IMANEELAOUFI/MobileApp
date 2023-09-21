import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProfilePic from '../../../assets/images/ProfilePic.png';
const API_BASE_URL = 'http://192.168.1.7:8000/api';


const ContactScreen = () => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setChats(response.data.data.items);
        // console.log(chats)
      } else {
        console.error('Error while loading Contacts:', response.data.message);
      }
    } catch (error) {
      console.error('Error while loading Contacts:', error.message);
    }
  };
  const go = async (userId ) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(`${API_BASE_URL}/chat`, {
            user_id: userId
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data.success) {
            navigation.navigate('Chat' , { userId });
            console.log('chats')
        } else {
          console.error('Error while loading Contacts:', response.data.message);
        }
      } catch (error) {
        console.error('Error while loading Contacts:', error.message);
      }
      // Redirect or perform any other action based on the response
      
    } ;
  const RenderChatItem = ({ item }) => (
    <TouchableOpacity onPress={() => go(item.id)}style={styles.chatItem} >
      <Image source={ProfilePic} style={styles.profileAvatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.username}</Text>
        <Text style={styles.chatMessage}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact</Text>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchInput}
      />
      <FlatList
        data={chats}
        renderItem={({item}) => <RenderChatItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 20,
  },
  searchInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  chatList: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#888',
  },
});

export default ContactScreen;