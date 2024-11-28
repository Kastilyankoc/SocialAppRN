import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';

const userId = 'user1'; // Simüle edilmiş kullanıcı ID'si

const data = [
  {
    id: '1',
    image: 'https://picsum.photos/200/300',
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
];

export default function ExploreScreen() {
  const [currentComments, setCurrentComments] = useState(data[0].comments);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentComments((prevComments) => {
        if (prevComments.length > 0) {
          return prevComments.slice(1); // İlk yorumu kaldır
        }
        return prevComments;
      });
    }, 5000); // 5 saniye sonra kaldır

    return () => clearInterval(timer); // Temizleme işlemi
  }, []);

  const renderItem = ({ item: comment }) => (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={styles.commentContainer}
    >
      <Text style={styles.commentText}>{comment.text}</Text>
      <Text style={styles.commentRating}>⭐ {comment.rating}</Text>
    </Animated.View>
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
          data={currentComments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    maxHeight: '30%', // Yorumları ekranın alt üçte birine sınırla
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
});
