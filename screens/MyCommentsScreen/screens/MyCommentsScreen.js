import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MyCommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MyCommentsScreen</Text>
    </View>
  );
};

export default MyCommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
