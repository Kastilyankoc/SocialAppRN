import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

const NewPostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Şu an için sadece alert gösteriyoruz, backend bağlandıktan sonra API çağrısı yapılacak
    Alert.alert('Success', 'Your post has been created!');
    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Post Content"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />
      <Button title="Submit Post" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default NewPostScreen;
