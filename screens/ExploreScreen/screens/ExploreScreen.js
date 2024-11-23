import React, { useState } from 'react';
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

const data = [
  {
    id: '1',
    image: require('../../../assets/martin-masson-BkAEKU26osY-unsplash.jpg'), // Yerel bir resim ekleyin
    comments: [
      { text: 'Muhteşem bir manzara!', rating: 10 },
      { text: 'Orada olmak isterdim...', rating: 8 },
    ],
  },
  {
    id: '2',
    image: require('../../../assets/benjamin-hibbert-hingston--4FQeWudniE-unsplash.jpg'), // Yerel bir resim ekleyin
    comments: [
      { text: 'Hayalimdeki araba!', rating: 9 },
      { text: 'Ne kadar şık görünüyor.', rating: 7 },
    ],
  },
  {
    id: '3',
    image: require('../../../assets/alexander-mass-jGqehSmhM80-unsplash.jpg'), // Yerel bir resim ekleyin
    comments: [
      { text: 'Hayattan bir kare görmek', rating: 9 },
      { text: 'Waoooww', rating: 7 },
    ],
  },
  {
    id: '4',
    image: require('../../../assets/anthony-nelzin-santos-fF1DWEA1qB8-unsplash.jpg'), // Yerel bir resim ekleyin
    comments: [
      { text: 'Mükkemel', rating: 9 },
      { text: 'çok iyi seni takip ediyorum', rating: 7 },
    ],
  },
];

export default function ExploreScreen() {
  const [currentComments, setCurrentComments] = useState(data[0].comments);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
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
        onSnapToItem={(index) => setCurrentComments(data[index].comments)}
      />

      <TouchableOpacity style={styles.addCommentButton}>
        <Text style={styles.addCommentText}>Yorum Yap</Text>
      </TouchableOpacity>
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
});
