import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Alert } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import OutlinedButton from '../../../components/UI/OutlinedButton';

const TakeImage = ({ onImageTaken }) => {
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

    console.log('Image Response:', image);

    // Yanıt doğrulama ve URI alma
    if (!image.canceled && image.assets && image.assets.length > 0) {
      const uri = image.assets[0].uri; // URI'yi alın
      setPickedImage(uri); // State'e kaydedin
      onImageTaken(uri);
      console.log('Photo URI:', uri);
    } else {
      console.log('Kullanıcı fotoğraf çekmedi.');
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  
    return (
      <View style={styles.container}>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
          Take Image
        </OutlinedButton>
      </View>
    );
  };

export default TakeImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
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
