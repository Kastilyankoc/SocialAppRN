import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function NewPostScreen() {

  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  const [postDescription, setPostDescription] = useState('');

  // Kamera ile fotoğraf çekme
  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      response => {
        if (response.didCancel) {
          Alert.alert('İşlem iptal edildi');
        } else if (response.errorCode) {
          Alert.alert('Hata', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  // Galeriden fotoğraf seçme
  const handleSelectFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          Alert.alert('İşlem iptal edildi');
        } else if (response.errorCode) {
          Alert.alert('Hata', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  // Gönderiyi kaydetme
  const handleSavePost = () => {
    if (!imageUri || !postDescription.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir görsel seçin ve açıklama ekleyin.');
      return;
    }
    Alert.alert('Başarılı', 'Gönderiniz yüklendi!');
    // Burada gönderiyi backend'e göndermek için kod yazılabilir.
    setImageUri(null);
    setPostDescription('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera Details')}
      >
        <Text style={styles.buttonText}>📷 Fotoğraf Çek</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSelectFromGallery}>
        <Text style={styles.buttonText}>🖼️ Galeriden Seç</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Gönderi açıklaması..."
        placeholderTextColor="#888"
        value={postDescription}
        onChangeText={setPostDescription}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePost}>
        <Text style={styles.saveButtonText}>Gönderiyi Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
