import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';


export default function CameraDetails() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [galleryPermission, setGalleryPermission] = useState(null);

    // Kamera izni ve galeri iznini kontrol et
    React.useEffect(() => {
        (async () => {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          setGalleryPermission(status === "granted");
        })();
      }, []);
    
      if (!permission || !galleryPermission) {
        return <View />;
      }
    
      if (!permission.granted || !galleryPermission) {
        return (
          <View style={styles.container}>
            <Text style={styles.message}>
              We need your permission to use the camera and save to the gallery
            </Text>
            <Button onPress={requestPermission} title="Grant Camera Permission" />
          </View>
        );
      }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  async function takePhoto() {
    if (!isCameraReady || !cameraRef.current) {
      Alert.alert("Camera is not ready yet!");
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true, // Görüntüyü Base64 formatında almak için
        exif: true,  // EXIF bilgilerini almak için
        quality: 0.8, // Görüntü kalitesi (0.0 ile 1.0 arasında)
      });

      console.log("Photo URI:", photo.uri);
      console.log("Base64 Data (shortened):", photo.base64.slice(0, 50) + "...");
      console.log("EXIF Data:", photo.exif);

      // Fotoğrafı kalıcı olarak saklamak için
      const permanentUri = `${FileSystem.documentDirectory}photo.jpg`;
      await FileSystem.copyAsync({
        from: photo.uri,
        to: permanentUri,
      });
      console.log("Saved to:", permanentUri);
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  }
  async function saveToGallery(uri) {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      await MediaLibrary.createAssetAsync(uri);
      console.log('Photo saved to gallery!');
    } else {
      console.log('Gallery permissions not granted');
    }
  }
  saveToGallery("file:///var/mobile/Containers/Data/Application/FF8FCF7B-1691-4E2D-AB9A-D1E5EB545AEF/Documents/ExponentExperienceData/@anonymous/SocialAppRN1-f21e4963-a024-4ce2-93fb-0e54fefd01f1/photo.jpg");


  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take a Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
