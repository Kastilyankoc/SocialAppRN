import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const data = [
  {
    id: '1',
    image: 'https://picsum.photos/200/300.jpg',
    comments: [
      {
        id: 'c1',
        text: 'Muhteşem bir manzara!',
        rating: 10,
        likedBy: [],
        user: { id: 'u1', name: 'Ali', profilePic: 'https://picsum.photos/50' },
      },
      {
        id: 'c2',
        text: 'Orada olmak isterdim...',
        rating: 8,
        likedBy: [],
        user: { id: 'u2', name: 'Ayşe', profilePic: 'https://picsum.photos/51' },
      },
    ],
  },
  {
    id: '2',
    image: 'https://picsum.photos/200/300.webp',
    comments: [
      {
        id: 'c3',
        text: 'Muhteşem bir araba!',
        rating: 9,
        likedBy: [],
        user: { id: 'u3', name: 'Mehmet', profilePic: 'https://picsum.photos/52' },
      },
      {
        id: 'c4',
        text: 'Çok şık görünüyor.',
        rating: 7,
        likedBy: [],
        user: { id: 'u4', name: 'Elif', profilePic: 'https://picsum.photos/53' },
      },
    ],
  },
  {
    id: '3',
    image: 'https://picsum.photos/200/300?random=1',
    comments: [
      {
        id: 'c5',
        text: 'Bu doğa harika!',
        rating: 11,
        likedBy: [],
        user: { id: 'u5', name: 'Veli', profilePic: 'https://picsum.photos/54' },
      },
      {
        id: 'c6',
        text: 'Gerçekten etkileyici.',
        rating: 6,
        likedBy: [],
        user: { id: 'u6', name: 'Fatma', profilePic: 'https://picsum.photos/55' },
      },
    ],
  },
  {
    id: '4',
    image: 'https://picsum.photos/200/300?random=2',
    comments: [
      {
        id: 'c7',
        text: 'Ne kadar güzel bir yer!',
        rating: 12,
        likedBy: [],
        user: { id: 'u7', name: 'Ahmet', profilePic: 'https://picsum.photos/56' },
      },
      {
        id: 'c8',
        text: 'Kesinlikle ziyaret etmeliyim.',
        rating: 15,
        likedBy: [],
        user: { id: 'u8', name: 'Zeynep', profilePic: 'https://picsum.photos/57' },
      },
    ],
  },
];

export default function ExploreScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sortOption, setSortOption] = useState('newest'); // Sıralama seçeneği

  // Yorumları sıralama fonksiyonu
  const sortedComments = () => {
    const comments = data[activeSlide].comments;
    if (sortOption === 'mostLiked') {
      return [...comments].sort((a, b) => b.rating - a.rating);
    }
    return [...comments].reverse(); // newest: en yeni yorumlar
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <Image source={{ uri: item.user.profilePic }} style={styles.profilePic} />
      <Text style={styles.userName}>{item.user.name}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentRating}>⭐ {item.rating}</Text>
    </View>
  );

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.sortButtons}>
        <Button title="En Yeni" onPress={() => setSortOption('newest')} />
        <Button title="En Çok Beğenilen" onPress={() => setSortOption('mostLiked')} />
      </View>
      <Carousel
        data={sortedComments()} // Sıralanmış yorumlar
        renderItem={renderComment}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8} // Kart genişliği
        containerCustomStyle={styles.commentCarousel}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderSlide} // Her gönderi için slayt
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={(index) => setActiveSlide(index)} // Aktif gönderiyi takip et
      />
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
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    marginBottom: 10,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 10,
  },
  commentCarousel: {
    marginTop: 10,
  },
  commentCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  commentText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  commentRating: {
    color: '#ff0',
    fontSize: 14,
  },
});
