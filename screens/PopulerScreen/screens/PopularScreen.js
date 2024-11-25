import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

const PopularScreen = () => {
  const [dependency, setDependency] = useState(0); // Bağımlılık için bir state
  const [effectCount, setEffectCount] = useState(0);
  useEffect(() => {
    // useEffect çalıştığında sayaç artar
    setEffectCount(prevCount => prevCount + 1);
  }, [dependency]); // Dependency burada!
  return (
    <View style={styles.container}>
      <Text style={styles.text}>useEffect Çalışma Sayısı: {effectCount}</Text>
      <Text style={styles.text}>Dependency Değeri: {dependency}</Text>
      <Button
        title="Dependency Artır"
        onPress={() => setDependency(prev => prev + 1)}
      />
      <Button
        title="Dependency Aynı Tut (useEffect Tetiklenmez)"
        onPress={() => setDependency(dependency)}
      />
    </View>
  );
};

export default PopularScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
