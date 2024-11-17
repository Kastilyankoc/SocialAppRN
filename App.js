import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log("Hello This is For Step Githup");
  
  return (
    <View style={styles.container}>
      <Text>Hadi Başlayalım!</Text>
      <Text>Herşey adım adım!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
