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

const API_BASE_URL = 'http://192.168.11.101:8000/api';

const ChatScreen = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const name = route.params;
  const [showModal, setShowModal] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleDropdownSelect = (options) => {
    const selectedIds = options.map((option) =>
      users.find((user) => user.username === option)?.id
    );
    setSelectedOptions(selectedIds);
  };

  const handleButtonPress = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleTextInputChange = (value) => {
    setTextInputValue(value);
  };

  const handleSubmit =async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/group`, {
        user_id : selectedOptions,
        name : textInputValue
      },
      {
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
    // Handle form submission
    // You can access the selectedOption and textInputValue states here
    // and perform the necessary actions, such as sending data to the server

    // After submission, close the modal
    // console.log(selectedOptions);
    setShowModal(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchChats();
      fetchUsers();
      console.log(name.name)
    }, [])
  );

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions.length]);

  const fetchChats = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/chat`, {
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
  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.data.items);

      } else {
        console.error('Error while loading chats:', response.data.message);
      }
    } catch (error) {
      console.error('Error while loading chats:', error.message);
    }
  };
  const go = (itemId, contact , length) => {
    // Redirect or perform any other action based on the response
    navigation.navigate('Message', { itemId, contact,length ,name: name.name });
  };

  const RenderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => go(item.id, item.participants.length > 2 ? item.name :  item.participants[0].user.username ==name.name ?  item.participants[1].user.username :  item.participants[0].user.username,  item.participants.length)}
      style={styles.chatItem}
    >
      <Image source={ProfilePic} style={styles.profileAvatar} />
      <View style={styles.chatDetails}>
      {item.participants.length > 2 ? (
      <Text style={styles.chatName}>{item.name}</Text>
    ) : (
      <Text style={styles.chatName}>{item.participants[0].user.username ==name.name ?  item.participants[1].user.username :  item.participants[0].user.username }</Text>
    )}
        {item.last_message && item.last_message.message && (
          <Text style={styles.chatMessage}>{item.last_message.message}</Text>
        )}
        {!item.last_message && <Text style={styles.chatMessage}>No messages</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
        <Button  
        title="Add Group" 
        onPress={handleButtonPress}  
         />
      </View>
      <TextInput placeholder="Search" clearButtonMode="always" style={styles.searchInput} />
      <FlatList
        data={chats}
        renderItem={({ item }) => <RenderChatItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatList}
      />
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Add your form inputs here */}
            {/* Example: */}
            <MultiSelectDropdown
              options={users.map((user) => user.username)}
              onSelect={handleDropdownSelect}
            />
            <TextInput
              placeholder="Enter text"
              value={textInputValue}
              onChangeText={handleTextInputChange}
              style={styles.input}
            />
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Close" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
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

export default ChatScreen;
