import { useCallback, useState } from 'react';
import {
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../../constants/themes/colors';
import Button from '../../../components/UI/Button';
import LocationPicker from './LocationPicker';
import { Place } from '../../../data/Place';
import { insertPlace } from '../../../util/Database';
import TakeImage from './TakeImage';

// import * as ImagePicker from 'expo-image-picker';

const LaunchImagePicker = ({ imagePreview }) => {
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState();
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState();

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback(location => {
    setPickedLocation(location);
  }, []);

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  async function savePlaceHandler() {
    if (!enteredTitle || !selectedImage || !pickedLocation) {
      Alert.alert('Incomplete Data', 'Please provide all required details.');
      return;
    }
  
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
  
    try {
      const id = await insertPlace(placeData); // Burada hatayı yakalayabiliriz.
      console.log('Inserted Place ID:', id); // Veritabanına eklenen ID'yi kontrol edin.
      navigation.navigate('All Places', { place: placeData });
    } catch (error) {
      console.error('Error inserting place:', error); // Hatanın detayını konsola yazdırın.
      Alert.alert('Error', 'Failed to save the place.');
    }
  }
  
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <TakeImage onImageTaken={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default LaunchImagePicker;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcc00',
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

///////////////////////////////////////////bu HAlde sadece galeriye erişip seçim yapıyor
// import React, { useState } from 'react';
// import { Button, Image, View, StyleSheet, Text, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const LaunchImagePicker = () => {
//     const [image, setImage] = useState(null);

//   const pickImage = async () => {

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images', 'videos'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={styles.image} />}
//     </View>
//   );
// };

// export default LaunchImagePicker;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
// });
