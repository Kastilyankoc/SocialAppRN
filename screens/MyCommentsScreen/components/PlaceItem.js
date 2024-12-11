import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Button } from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';

import IconButton from '../../../components/UI/IconButton';
import { Colors } from '../../../constants/themes/colors';

export default function PlaceItem({
  place,
  onSelect,
  onDelete,
  onLike,
  onDislike,
}) {
  const [likes, setLikes] = useState(place.likes);
  const [dislikes, setDislikes] = useState(place.dislikes);

  function handleLike() {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    onLike(place.id, updatedLikes, dislikes);
  }

  function handleDislike() {
    const updatedDislikes = dislikes + 1;
    setDislikes(updatedDislikes);
    onDislike(place.id, likes, updatedDislikes);
  }

  function renderLeftActions(placeId) {
    return (
      <View style={styles.deleteAction}>
        <IconButton
          icon="trash"
          color={Colors.gray700}
          size={24}
          onPress={onDelete.bind(this, placeId)}
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        overshootRight={false} // the swipeable panel can NOT be pulled further than the right actions panel's width.
        renderRightActions={
          // method that is expected to return an action panel that is going to be revealed from the right side when user swipes left.
          renderLeftActions.bind(this, place.id)
        }
      >
        <Pressable
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}
          onPress={onSelect.bind(this, place.id)} // with bind we ensure that place.id reaches to selectPlaceHandler in PlacesList.
        >
          <Image style={styles.image} source={{ uri: place.imageUri }} />
          <View style={styles.info}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.address}>{place.address}</Text>
            <View style={styles.actions}>
              <Button title={`👍 ${likes}`} onPress={handleLike} />
              <Button title={`👎 ${dislikes}`} onPress={handleDislike} />
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    // shadow effect for Android.
    elevation: 2,
    // shadow effect for iOS.
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  pressed: {
    // visual feedback when item is pressed.
    opacity: 0.9,
  },

  image: {
    flex: 1, // 'info' is twice as big as the 'image' (Note: 'info' and 'image' are siblings).
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },

  info: {
    flex: 2, // 'info' is twice as big as the 'image' (Note: 'info' and 'image' are siblings).
    padding: 12,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },

  address: {
    fontSize: 12,
    color: Colors.gray700,
  },

  deleteAction: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginVertical: 12,
    marginLeft: 5,
    width: 100,
    backgroundColor: Colors.delete,
  },
});
