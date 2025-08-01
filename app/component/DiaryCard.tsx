import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

interface Diary {
  id: string;
  title: string;
  createdAt: any;
}

interface Props {
  item: Diary;
}

export default function DiaryCard({ item }: Props) {
  return (
    <Link href={{ pathname: "/diary", params: { diaryId: item.id } }} asChild>
      <Pressable>
        <View style={styles.card}>
          <Text style={styles.cardDate}>
            {item.createdAt?.toDate().toLocaleDateString('ja-JP')}
          </Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});