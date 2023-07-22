import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MultiSelectDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      // Deselect option
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
      setSelectedOptions(updatedOptions);
    } else {
      // Select option
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions); 
      onSelect(updatedOptions);
    }

   
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownButton} onPress={handleToggleDropdown}>
        <Text style={styles.dropdownButtonText}>
          {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select options'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownOptionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.dropdownOption,
                selectedOptions.includes(option) && styles.selectedDropdownOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdownWrapper: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1, // Set a higher zIndex to ensure the dropdown wrapper is displayed above other elements
  },
  dropdownOptionsContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    overflow: 'scroll',
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  selectedDropdownOption: {
    backgroundColor: 'lightblue',
  },
  dropdownOptionText: {
    fontSize: 16,
  },
});
export default MultiSelectDropdown;
