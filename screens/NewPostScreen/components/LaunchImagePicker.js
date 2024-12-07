import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, Alert } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import Button from '../../../components/UI/Button';
import OutlinedButton from '../../../components/UI/OutlinedButton';
import LocationPicker from './LocationPicker';


// import * as ImagePicker from 'expo-image-picker';

const LaunchImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
  
      console.log("Image Response:", image);
  
      // Yanıt doğrulama ve URI alma
      if (!image.canceled && image.assets && image.assets.length > 0) {
        const uri = image.assets[0].uri; // URI'yi alın
        setPickedImage(uri); // State'e kaydedin
        console.log("Photo URI:", uri);
      } else {
        console.log("Kullanıcı fotoğraf çekmedi.");
      }
    }
  
    let imagePreview = <Text>No image taken yet.</Text>;
  
    if (pickedImage) {
      imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    }
    function savePlaceHandler() {
      console.log(enteredTitle);
      console.log(selectedImage);
      console.log(pickedLocation);
    }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
      <LocationPicker />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </View>
  );
};

export default LaunchImagePicker;

const styles = StyleSheet.create({
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
