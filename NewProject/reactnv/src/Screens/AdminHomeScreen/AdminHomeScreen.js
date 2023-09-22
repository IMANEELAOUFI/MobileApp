import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, Modal } from 'react-native'
import SignupPopup from '../../Compenents/SignupPopup/SignupPopup';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProfilePic from '../../../assets/images/ProfilePic.png';

const API_BASE_URL = 'http://192.168.1.53:8000/api';


const AdminHomeScreen = () => {

  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchChats();
      console.log(chats);
    }, [chats.length])
  );
  const deleteUser = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('User deleted successfully');
        navigation.navigate('Users');
        // Handle any further actions or UI updates after successful deletion
      } else {
        console.log('Failed to delete user:', response.data.message);
        // Handle error cases or display error message to the user
      }
    } catch (error) {
      console.log('Error deleting user:', error);
      // Handle error cases or display error message to the user
    }
  };
  const handleSignup = async (formData) => {
    try {
      // Perform signup logic using the form data
      const response = await axios.post('http://100.73.96.230:8000/api/register', formData);
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

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
  const RenderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={ProfilePic} style={styles.profileAvatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.username}</Text>
        <Text style={styles.chatMessage}>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteUser(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
<View style={styles.container}>
  <View style={styles.header}>
    <Text style={styles.title}>All Users</Text>
    <TouchableOpacity style={styles.addButton} onPress={openModal}>
      <Text style={styles.buttonText}>Add Users</Text>
    </TouchableOpacity>
  </View>
  <Modal visible={isModalVisible} animationType="slide">
    <SignupPopup onClose={closeModal} onSignup={handleSignup} />
  </Modal>
  <TextInput
    placeholder="Search"
    clearButtonMode="always"
    style={styles.searchInput}
  />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
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
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  plusIcon: {
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default AdminHomeScreen;
