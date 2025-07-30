import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
  <View>
    <View style={styles.header}>
        <Text style={styles.headerText}>日記アプリ</Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>日記一覧</Text>
      <StatusBar style="auto" />
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text>2025/7/30</Text>
          <Text>月が綺麗</Text>
        </View>
        <View style={styles.card}>
        <Text>2025/7/31</Text>
        <Text>最近は都心に雨が少ない</Text>
        </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 50,
    paddingLeft: 20, 
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000', // iOS用の影設定
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android用の影設定
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

});