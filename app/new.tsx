import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewDiaryScreen() {
  return (
    <View style={styles.container}>
      <Text>ここは新しい日記を作成する画面です。</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});