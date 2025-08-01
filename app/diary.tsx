import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Diary {
  title: string;
  content: string;
  createdAt: any;
}

export default function DiaryDetailScreen() {
  const { diaryId } = useLocalSearchParams();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchDiary = async () => {
        if(!diaryId) {
          return;
        }
      const db = getFirestore();
      const diaryDoc = doc(db, 'diaries', diaryId);
      const diarySnapshot = await getDoc(diaryDoc);
      if (diarySnapshot.exists()) {
        setDiary(diarySnapshot.data() as Diary);
      } else {
        console.error('日記が見つかりません');
      }
      setLoading(false);
    };

    fetchDiary();
  }, [diaryId]);

  if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
  }
  if (!diary) {
      return (
        <View style={styles.centered}>
          <Text>日記が見つかりません</Text>
        </View>
      );
  }
    
  return (
    <ScrollView style={styles.container}>
          <Text style={styles.title}>{diary.title}</Text>
          <Text style={styles.date}>{diary.createdAt?.toDate().toLocaleDateString("ja-JP")}</Text>
          <Text style={styles.content}>{diary.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24, // 行間を調整して読みやすくする
  },
});