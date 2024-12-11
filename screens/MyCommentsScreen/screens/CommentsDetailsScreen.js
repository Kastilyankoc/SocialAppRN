import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import OutlinedButton from '../../../components/UI/OutlinedButton';

// helper functions to work with SQLite
import { fetchPlace } from '../../../util/Database';

import { Colors } from '../../../constants/themes/colors'; // color palette

export default function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.lat,
      initialLng: fetchedPlace.lng,
    });
  }

  // fetch place details for a specific placeId when the screen loads.
  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlace(selectedPlaceId);
      setFetchedPlace(place);

      // set the title of the screen to place.title.
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  // if there is no place data, show a fallback message.
  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading place data ...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statText}>👍 Likes: {fetchedPlace.likes}</Text>
          <Text style={styles.statText}>
            👎 Dislikes: {fetchedPlace.dislikes}
          </Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gray700,
  },

  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },

  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },

  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  addressContainer: {
    padding: 20,
  },

  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
