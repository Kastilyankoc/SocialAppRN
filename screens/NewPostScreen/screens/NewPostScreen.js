import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NewPostScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NewPostScreen</Text>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
