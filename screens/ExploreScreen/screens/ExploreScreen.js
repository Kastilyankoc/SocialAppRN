import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/slices/PostsSlice';

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const { items: posts, loading, error } = useSelector((state) => state.posts);

  // Her gönderiye rastgele görsel URL'si ekleme
  const postsWithImages = posts.map((post) => ({
    ...post,
    imageUrl: `https://picsum.photos/seed/${post.id}/200/300`, // Her gönderiye benzersiz görsel
  }));

  useEffect(() => {
    dispatch(fetchPosts()); // Veri çekme işlemini başlat
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={postsWithImages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.post}>
          {/* Görsel */}
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          {/* Başlık ve içerik */}
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  post: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ExploreScreen;
