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
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { exploreData } from '../../../data/DummyData'; // Verileri DummyData'dan alıyoruz

export default function TrendsScreen() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    // Trend hesaplama ve filtreleme
    const calculateTrends = () => {
      const trendCriteria = 15; // Ortalama bir trend skoru, ayarlanabilir
      const trendData = exploreData
        .map(item => {
          const commentCount = item.comments.length;
          const totalRating = item.comments.reduce(
            (sum, comment) => sum + comment.rating,
            0
          );
          const likeCount = item.comments.reduce(
            (sum, comment) => sum + comment.likedBy.length,
            0
          );
          // Trend skor hesaplama
          const trendScore = commentCount * 2 + totalRating * 1.5 + likeCount;
          return { ...item, trendScore };
        })
        .filter(item => item.trendScore >= trendCriteria) // Yalnızca trend olanları seç
        .sort((a, b) => b.trendScore - a.trendScore); // En yüksek trend skoruna göre sıralama
      setTrends(trendData);
    };

    calculateTrends();
  }, []);

  const renderTrendItem = ({ item }) => (
    <TouchableOpacity>
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
        style={styles.trendContainer}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.trendScore}>Trend Skoru: {item.trendScore}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trend Gönderiler</Text>
      <Carousel
        data={trends}
        renderItem={renderTrendItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
      />
      <View style={styles.detailsContainer}>
        <FlatList
          data={trends}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.detailCard}>
              <Text style={styles.cardTitle}>Gönderi ID: {item.id}</Text>
              <Text style={styles.cardText}>
                Toplam Yorum: {item.comments.length}
              </Text>
              <Text style={styles.cardText}>
                Toplam Rating:{' '}
                {item.comments.reduce(
                  (sum, comment) => sum + comment.rating,
                  0
                )}
              </Text>
              <Text style={styles.cardText}>
                Beğeni Sayısı:{' '}
                {item.comments.reduce(
                  (sum, comment) => sum + comment.likedBy.length,
                  0
                )}
              </Text>
              <Text style={styles.cardText}>
                Trend Skoru: {item.trendScore}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  trendContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  trendScore: {
    color: '#ff0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  detailCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#aaa',
    fontSize: 14,
  },
});
