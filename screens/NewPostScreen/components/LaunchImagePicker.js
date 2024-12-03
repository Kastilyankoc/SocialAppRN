// import React, { useState } from 'react';
// import { Button, Image, View, StyleSheet, Text, Alert } from 'react-native';
// import {
//   launchCameraAsync,
//   useCameraPermissions,
//   PermissionStatus,
// } from 'expo-image-picker';

// // import * as ImagePicker from 'expo-image-picker';

// const LaunchImagePicker = () => {
// //     const [cameraPermissionInformation, requestPermission] =
// //     useCameraPermissions();

// //   async function verifyPermissions() {
// //     if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
// //       const permissionResponse = await requestPermission();

// //       return permissionResponse.granted;
// //     }

// //     if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
// //       Alert.alert(
// //         'Insufficient Permissions!',
// //         'You need to grant camera permissions to use this app.'
// //       );
// //       return false;
// //     }

// //     return true;    
// //   }

//   async function takeImageHandler() {
//     // const hasPermission = await verifyPermissions();

//     // if (!hasPermission) {
//     //   return;
//     // }

//     const image = await launchCameraAsync({
//       allowsEditing: true,
//       aspect: [16, 9],
//       quality: 0.5,
//     });
//     console.log(image);
//   }
//   return (
//     <View>
//       <View></View>
//       <Button title="Take Image" onPress={takeImageHandler} />
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




///////////////////////////////////////////bu HAlde sadece galeriye erişip seçim yapıyor 
import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const LaunchImagePicker = () => {
    const [image, setImage] = useState(null);

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

export default LaunchImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});