import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth); // Kullanıcı bilgileri
  const userPosts = useSelector((state) =>
    state.posts.items.filter((post) => post.id > 0) // Sadece bu kullanıcının gönderileri
  );

  return (
    <View style={styles.container}>
      {/* Kullanıcı Bilgileri */}
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      {/* Kullanıcının Gönderileri */}
      <Text style={styles.sectionTitle}>Your Posts</Text>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            {/* Gönderi Görseli */}
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            {/* Gönderi Başlığı ve İçeriği */}
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  post: {
    padding: 16,
    marginVertical: 8,
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

export default ProfileScreen;
