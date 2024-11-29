import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const profileData = {
  username: 'selim_user',
  profilePic: 'https://picsum.photos/200',
  followers: 1200,
  following: 300,
  posts: [
    { id: '1', image: 'https://picsum.photos/300/300?random=1' },
    { id: '2', image: 'https://picsum.photos/300/300?random=2' },
    { id: '3', image: 'https://picsum.photos/300/300?random=3' },
    { id: '4', image: 'https://picsum.photos/300/300?random=4' },
    { id: '5', image: 'https://picsum.photos/300/300?random=5' },
    { id: '6', image: 'https://picsum.photos/300/300?random=6' },
  ],
};

export default function ProfileScreen() {
  const { username, profilePic, followers, following, posts } = profileData;

  const renderPost = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.postImage} />
  );

  return (
    <View style={styles.container}>
      {/* Profil Bilgileri */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoCount}>{posts.length}</Text>
            <Text style={styles.infoLabel}>Gönderiler</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoCount}>{followers}</Text>
            <Text style={styles.infoLabel}>Takipçi</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoCount}>{following}</Text>
            <Text style={styles.infoLabel}>Takip Edilen</Text>
          </View>
        </View>
      </View>

      {/* Kullanıcı Adı ve Ayarlar */}
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Profili Düzenle</Text>
        </TouchableOpacity>
      </View>

      {/* Gönderiler */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  usernameContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#333',
  },
  postsContainer: {
    paddingHorizontal: 5,
  },
  postImage: {
    width: Dimensions.get('window').width / 3 - 10,
    height: Dimensions.get('window').width / 3 - 10,
    margin: 5,
    borderRadius: 5,
  },
});
