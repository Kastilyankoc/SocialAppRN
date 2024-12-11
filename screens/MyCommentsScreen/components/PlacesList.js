import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../../constants/themes/colors';
import PlaceItem from './PlaceItem';
import { deletePlace } from '../../../util/Database';
import { updateLikes } from '../../../util/Database';


function PlacesList({ places, onPlaceUpdate }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate('PlacesDetails', { placeId: id });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  async function deletePlaceHandler(id) {
    onPlaceUpdate(false);
    await deletePlace(id);
    onPlaceUpdate(true);
  }
  async function handleLike(id, likes, dislikes) {
    await updateLikes(id, likes, dislikes);
    setLoadedPlaces(prevPlaces =>
      prevPlaces.map(place =>
        place.id === id ? { ...place, likes, dislikes } : place
      )
    );
  }

  async function handleDislike(id, likes, dislikes) {
    await updateLikes(id, likes, dislikes);
    setLoadedPlaces(prevPlaces =>
      prevPlaces.map(place =>
        place.id === id ? { ...place, likes, dislikes } : place
      )
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={selectPlaceHandler}
          onDelete={deletePlaceHandler}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
