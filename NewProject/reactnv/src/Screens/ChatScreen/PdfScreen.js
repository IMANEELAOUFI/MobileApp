import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';
import { useRoute } from '@react-navigation/native';
const PdfScreen = () => {
  const route = useRoute();
  const { pdfUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Pdf source={{ uri: pdfUrl }} style={{ flex: 1 }} />
    </View>
  );
};

export default PdfScreen;