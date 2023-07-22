import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text, type = "PRIMARY", textStyle }) => {
    return (
      <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`${type}_text`]]}>{text}</Text>
      </Pressable>
    );
  };

const styles = StyleSheet.create({
    container: {
        width: '88%',
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginVertical: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center', // Added to center the button horizontally
      },
  container_PRIMARY: {
    backgroundColor: "#0000ff",
  },
  container_SECONDARY: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#0000ff",
  },
  container_TERTIARY: {
    backgroundColor: "transparent",
   
  },
  
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  PRIMARY_text: {
    color: '#FFFFFF',
  },
  SECONDARY_text: {
    color: '#0000ff',
  },
  TERTIARY_text: {
    color: '#99C4D2',
  },
});

export default CustomButton;