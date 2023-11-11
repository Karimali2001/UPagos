import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const OCRScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const pickImage = () => {
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response);
        recognizeText(response.uri);
      }
    });
  };

  const recognizeText = async (imageUri) => {
    try {
      const subscriptionKey = 'da3adbaa7a2f4a58895c705505352b9a';
      const endpoint = 'https://upagos.cognitiveservices.azure.com/';

      const apiUrl = `${endpoint}/vision/v3.1/ocr`;

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      });

      const extractedText = response.data.regions
        .map((region) =>
          region.lines.map((line) =>
            line.words.map((word) => word.text).join(' ')
          )
        )
        .flat()
        .join('\n');

      setRecognizedText(extractedText);
    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        <Text>Pick an image from gallery</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}

      <Text>Recognized Text:</Text>
      <Text>{recognizedText}</Text>
    </View>
  );
};

export default OCRScreen;
