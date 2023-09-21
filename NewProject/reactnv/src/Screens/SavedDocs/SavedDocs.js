import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import ProfilePic from '../../../assets/images/ProfilePic.png';
import MultiSelectDropdown from '../../Compenents/MultiSelectDropdown/MultiSelectDropdown';

const API_BASE_URL = 'http://192.168.1.7 :8000/api';

const SavedDocs = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      fetchSaved();
    
    }, [])
  );

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions.length]);

  const fetchSaved = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setChats(response.data.data.items);
    
      } else {
        console.error('Error while loading chats:', response.data.message);
      }
    } catch (error) {
      console.error('Error while loading chats:', error.message);
    }
  };

  const RenderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {}}
      style={styles.chatItem}
    >
      <Image source={ProfilePic} style={styles.profileAvatar} />
      <View style={styles.chatDetails}>
      
      <Text style={styles.chatName}> sent by user number {item.user_id}</Text>
      {item.docs != null ? <Text style={styles.chatMessage}>doc_Uri : {item.docs}</Text> : null}
      {item.images != null ? <Text style={styles.chatMessage}>image_Uri : {item.images}</Text> : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>saved documents</Text>
      </View>
      <TextInput placeholder="Search" clearButtonMode="always" style={styles.searchInput} />
      <FlatList
        data={chats}
        renderItem={({ item }) => <RenderChatItem item={item} />}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1, // Add zIndex property to bring the modal to the front
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SavedDocs;
