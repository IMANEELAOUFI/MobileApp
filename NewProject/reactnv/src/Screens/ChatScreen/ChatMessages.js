import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet,Button,Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfilePic from '../../../assets/images/ProfilePic.png';
import Profile from '../../../assets/images/Profile.jpg';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';



const API_BASE_URL = 'http://192.168.0.150:8000/api';

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;
  const { contact } = route.params;
  const {length} = route.params;
  const { name } = route.params;

  useEffect(() => {
    fetchMessages();
    console.log(itemId);
    console.log(contact);
    console.log(name);
    console.log(length);
  }, []);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/chat_message/${itemId}/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setMessages(response.data.data.items);
      } else {
        console.error('Error while loading messages:', response);
      }
    } catch (error) {
      console.error('Error while loading messages:', error.message);
    }
  };
  

  const sendMessage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/chat_message/${itemId}`,
        {
          message: newMessage, // Use the value from the newMessage state
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNewMessage('');
        setMessages((prevItems) => [...prevItems, response.data.data.item]);
      } else {
        console.error('Error while sending message:', response);
      }
    } catch (error) {
      console.error('Error while sending message:', error.message);
    }
  };
  const handlePdfLinkPress = (pdfUrl) => {
    // Perform any actions you want when the user clicks on the PDF link
    // For example, you can open the URL in a browser or a PDF viewer
  
    // Open the PDF link in a browser
     // navigation.navigate('PdfScreen', { pdfUrl });
     console.log(pdfUrl);
     Linking.openURL(pdfUrl);
  };
  const quitGroup = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/group/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigation.goBack()
      } else {
        console.error('Error while sending message:', response);
      }
    } catch (error) {
      console.error('Error while sending message:', error.message);
    }
  };



  const handleAttachmentPress = async () => {
    try {
      const image = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const token = await AsyncStorage.getItem('token');
  
      const fileUri = image[0].uri;
      const fileName = image[0].name;
      const fileType = image[0].type;
      const uploadUrl = `${API_BASE_URL}/chat_message/${itemId}`;
  
    
  
      const formData = new FormData();
      formData.append('message',  image[0].name);
      formData.append('image_path', {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
  
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        const filePath = response.data.data.item;
       console.log(filePath)
      } else {
        console.error('Error sending message:', response.data.message);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  

  const renderMessageItem = ({ item }) => {
    const isCurrentUser = item.user.username === name;
  
    const messageTime = new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={isCurrentUser ? styles.messageItemOther : styles.messageItem}>
        {isCurrentUser ? null : (
          <Image source={ProfilePic} style={styles.profileAvatar} />
        )}
        <View
          style={isCurrentUser ? styles.messageContentOther : styles.messageContent}
        >
          {/* Message content */}
          {item.image_path ? (
  <View style={styles.container}>
    {item.image_path.toLowerCase().endsWith('.pdf') ? (
      <TouchableOpacity onPress={() => handlePdfLinkPress("http://100.73.96.230:8000" + item.image_path)}>
        <Text style={styles.pdfLink}>Click to open File  {item.image_path}</Text>
      </TouchableOpacity>
    ) : (
      <Image source={{ uri: "http://100.73.96.230:8000" + item.image_path }} style={styles.messageImage} />
    )}
    <Text style={isCurrentUser ? styles.messageItemOther : styles.messageText}>{item.message}</Text>
  </View>
) : (
  <Text style={isCurrentUser ? styles.messageItemOther : styles.messageText}>{item.message}</Text>
)}
          <Text style={isCurrentUser ? styles.messageItemOther : styles.messageDate}>{messageTime}</Text>
        </View>
        {isCurrentUser ? (
          <Image source={ProfilePic} style={styles.profileAvatar} />
        ) : null}
        
      </View>
    );
  };

  
    return (
      <View style={styles.container}>
        <View style={styles.Bigheader}>
          <View style={styles.header}>
          <Image source={ProfilePic} style={styles.profileAvatar} />
          <Text style={styles.userName}>{contact}</Text>
          </View>
          {length >2?<Button title="Quit grp"  onPress={quitGroup}/> : null

          }
          
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.attachmentButton} onPress={handleAttachmentPress}>
  <MaterialIcons name="attach-file" size={24} color="#0000ff" />
</TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <MaterialIcons name="send" size={24} color="#0000ff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
      },
      Bigheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#fff',
      },
      profileAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
     
        messageImage: {
          width: 200,
          height: 200,
          resizeMode: 'cover',
          borderRadius: 10,
        },
      userName: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
      },
      messageList: {
        flexGrow: 1,
        paddingBottom: 20,
        justifyContent: 'flex-end',
      },
      messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'flex-start',
      },
      messageItemOther: {
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        alignItems: 'center',
        marginBottom: 10,
      },
      messageContent: {
        flex: 0.6,
        backgroundColor: '#fff',
        borderRadius: 28,
        padding: 10,
        alignSelf: 'flex-end',
      },
      messageContentOther: {
        flex: 0.6,
        backgroundColor: '#ADD8E6',
        borderRadius: 28,
        padding: 10,
        alignSelf: 'flex-start',
      },
      
      messageText: {
        fontSize: 14,
      },
      messageDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 10,
      },
    attachmentButton: {
        marginRight: 10,
      },
    sendButton: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 10,
      dd: 8,
    },
  });
  
  export default ChatMessages;