import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const data = [
  {
    id: '1',
    image: 'https://picsum.photos/200/300', // İnternet resmi
    comments: [
      { text: 'Muhteşem bir manzara!', rating: 10 },
      { text: 'Orada olmak isterdim...', rating: 8 },
    ],
  },
  {
    id: '2',
    image: 'https://picsum.photos/200/300.webp', // İnternet resmi
    comments: [
      { text: 'Muhteşem bir manzara!', rating: 10 },
      { text: 'Orada olmak isterdim...', rating: 8 },
    ],
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/picsum/200/300', // İnternet resmi
    comments: [
      { text: 'Muhteşem bir manzara!', rating: 10 },
      { text: 'Orada olmak isterdim...', rating: 8 },
    ],
  },
  {
    id: '4',
    image: 'https://picsum.photos/200/300?grayscale', // İnternet resmi
    comments: [
      { text: 'Muhteşem bir manzara!', rating: 10 },
      { text: 'Orada olmak isterdim...', rating: 8 },
    ],
  },
  {
    id: '5',
    image: require('../../../assets/benjamin-hibbert-hingston--4FQeWudniE-unsplash.jpg'), // Yerel resim
    comments: [
      { text: 'Hayalimdeki foto', rating: 9 },
      { text: 'Ne kadar iyi görünüyor.', rating: 7 },
    ],
  },
];

export default function ExploreScreen() {
  const [currentComments, setCurrentComments] = useState(data[0].comments);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addComment = () => {
    if (newComment.trim()) {
      const updatedData = [...data];
      updatedData[activeSlide].comments.push({ text: newComment, rating: 0 });
      setCurrentComments(updatedData[activeSlide].comments);
      setNewComment('');
      setModalVisible(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image
        source={
          typeof item.image === 'string' ? { uri: item.image } : item.image
        }
        style={styles.image}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setError(true)}
      />
      {loading && <ActivityIndicator size="large" color="#ffffff" />}
      {error && <Text style={styles.errorText}>Resim Yüklenemedi</Text>}

      <FlatList
        data={item.comments}
        keyExtractor={(comment, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: comment }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{comment.text}</Text>
            <Text style={styles.commentRating}>⭐ {comment.rating}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={index => {
          setActiveSlide(index);
          setCurrentComments(data[index].comments);
        }}
      />

      <TouchableOpacity
        style={styles.addCommentButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addCommentText}>Yorum Yap</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Yorumunuzu yazın..."
              placeholderTextColor="#999"
              value={newComment}
              onChangeText={setNewComment}
            />
            <Button title="Gönder" onPress={addComment} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  commentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  commentText: {
    color: '#fff',
    fontSize: 14,
  },
  commentRating: {
    color: '#ff0',
    fontSize: 12,
  },
  addCommentButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 20,
  },
  addCommentText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
