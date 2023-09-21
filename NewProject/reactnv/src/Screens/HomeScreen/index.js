import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ProfilePic from '../../../assets/images/ProfilePic.png';
import axios from 'axios';

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.7 :8000/api/user');
      const userData = response.data;
      setUsers(userData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, }}>
      <Text style={styles.title}>Contact</Text>

      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 8,
        }}
      />

      <View style={styles.userContainer}>
        {users.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <TouchableOpacity style={styles.profileContainer}>
              <Image source={ProfilePic} style={styles.profileAvatar} />
            </TouchableOpacity>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>{user.username}</Text>
              <Text style={styles.userPhone}>{user.phone_number}</Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginVertical: 20,
  },
  userContainer: {
    marginTop: 20,
  },
  userItem: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    marginRight: 10,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userPhone: {
    fontSize: 14,
    color: '#888',
  },
});

export default Index;
