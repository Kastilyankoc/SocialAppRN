import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const userId = 'user1'; // Simüle edilmiş kullanıcı ID'si

const data = [
  {
    id: '1',
    image: 'https://picsum.photos/200/300.jpg',
    comments: [
      { id: 'c1', text: 'Muhteşem bir manzara!', rating: 10, likedBy: [] },
      { id: 'c2', text: 'Orada olmak isterdim...', rating: 8, likedBy: [] },
    ],
  },
  {
    id: '2',
    image: 'https://picsum.photos/200/300.webp',
    comments: [
      { id: 'c3', text: 'Muhteşem bir araba!', rating: 9, likedBy: [] },
      { id: 'c4', text: 'Çok şık görünüyor.', rating: 7, likedBy: [] },
    ],
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/picsum/200/300',
    comments: [
      { id: 'c5', text: 'Muhteşem bir şehir!', rating: 8, likedBy: [] },
      { id: 'c6', text: 'Güzel bir görüntü.', rating: 6, likedBy: [] },
    ],
  },
  {
    id: '4',
    image: 'https://picsum.photos/200/300/?blur',
    comments: [
      { id: 'c7', text: 'Muhteşem bir hayvan!', rating: 7, likedBy: [] },
      { id: 'c8', text: 'Harika bir fotoğraf.', rating: 5, likedBy: [] },
    ],
  },
  {
    id: '5',
    image: 'https://picsum.photos/200/300?grayscale',
    comments: [
      { id: 'c9', text: 'Muhteşem bir yemek!', rating: 6, likedBy: [] },
      { id: 'c10', text: 'Harika bir lezzet.', rating: 4, likedBy: [] },
    ],
  },
];

export default function ExploreScreen() {
  const [currentComments, setCurrentComments] = useState(data[0].comments);
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Yorumların kaybolma sürecini kontrol eden efekt
  useEffect(() => {
    if (!modalVisible) {
      const timer = setInterval(() => {
        setCurrentComments((prevComments) => {
          if (prevComments.length > 1) {
            return prevComments.slice(1); // İlk yorumu kaldır
          }
          return prevComments;
        });
      }, 5000); // 5 saniyede bir yorum kaybolur

      return () => clearInterval(timer); // Modal açıldığında veya bileşen unmount olduğunda temizleme
    }
  }, [modalVisible]);

  const addComment = () => {
    if (newComment.trim()) {
      const updatedData = [...data];
      updatedData[activeSlide].comments.push({
        id: `c${Date.now()}`,
        text: newComment,
        rating: 0,
        likedBy: [],
      });
      setCurrentComments(updatedData[activeSlide].comments);
      setNewComment('');
    }
  };

  const handleLike = (commentId) => {
    const updatedData = [...data];
    const comment = updatedData[activeSlide].comments.find(
      (c) => c.id === commentId
    );

    if (comment.likedBy.includes(userId)) {
      comment.likedBy = comment.likedBy.filter((id) => id !== userId);
      comment.rating -= 1;
    } else {
      comment.likedBy.push(userId);
      comment.rating += 1;
    }

    setCurrentComments([...updatedData[activeSlide].comments]);
  };

  const renderItem = ({ item: comment }) => (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
        style={styles.commentContainer}
      >
        <Text style={styles.commentText}>{comment.text}</Text>
        <Text style={styles.commentRating}>⭐ {comment.rating}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={(index) => {
          setActiveSlide(index);
          setCurrentComments(data[index].comments);
        }}
      />

      <View style={styles.commentsContainer}>
        <FlatList
          data={currentComments} // En fazla iki yorum göster
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      {/* Yorumlar Modali */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: data[activeSlide].image }}
            style={styles.modalImage}
          />
          <FlatList
            data={currentComments} // Tüm yorumlar burada gösteriliyor
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentRating}>⭐ {item.rating}</Text>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => handleLike(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {item.likedBy.includes(userId) ? 'Beğenildi' : 'Beğen'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Yorum ekle..."
              placeholderTextColor="#aaa"
              value={newComment}
              onChangeText={setNewComment}
            />
            <Button title="Gönder" onPress={addComment} />
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
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
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  commentsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    maxHeight: '30%',
  },
  commentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  commentText: {
    color: '#fff',
    fontSize: 14,
  },
  commentRating: {
    color: '#ff0',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  likeButton: {
    backgroundColor: '#1e90ff',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ff4757',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
