import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { profileData } from '../../../data/DummyData';

export default function ProfileScreen() {
  
  const navigation = useNavigation();

  const {
    name,
    title,
    rating,
    profilePic,
    posts,
    postsCount,
    followers,
    following,
    about,
  } = profileData;

  return (
    <View style={styles.container}>
      {/* Gradient Arka Plan */}
      <LinearGradient
        colors={['#FF5F6D', '#FFC371']}
        style={styles.gradientBackground}
      >
        {/* Profil Fotoğrafı ve Bilgiler */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
          {/* Rating Yıldız ve Puan */}
          <View style={styles.ratingContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('MyComments')}>
              <Text style={styles.ratingText}>⭐ {rating}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          {/* Takipçi Bilgileri */}
          <View style={styles.statsContainer}>
            <View style={styles.statsBlock}>
              <Text style={styles.statsNumber}>{postsCount}</Text>
              <Text style={styles.statsLabel}>Posts</Text>
            </View>
            <View style={styles.statsBlock}>
              <Text style={styles.statsNumber}>{followers}</Text>
              <Text style={styles.statsLabel}>Followers</Text>
            </View>
            <View style={styles.statsBlock}>
              <Text style={styles.statsNumber}>{following}</Text>
              <Text style={styles.statsLabel}>Following</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      {/* About Me */}
      {/* About Me */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutHeader}>About Me</Text>
        <Text style={styles.aboutText}>{about}</Text>
      </View>

      {/* Album */}
      <View style={styles.albumContainer}>
        <View style={styles.albumHeader}>
          <Text style={styles.albumTitle}>Album</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.albumGrid}>
          {posts.slice(0, 4).map((post, index) => (
            <Image
              key={index}
              source={{ uri: post.image }}
              style={styles.albumImage}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  statsBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statsNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
  },
  aboutContainer: {
    padding: 20,
  },
  aboutHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  albumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF5F6D',
  },
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  albumImage: {
    width: '48%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  //burada sadece yıldız ile rating eklemesi yaptık
  profilePicContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  ratingContainer: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FFD700', // Altın rengi
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
