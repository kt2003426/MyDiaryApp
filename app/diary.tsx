import { Link, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { deleteDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Diary {
  title: string;
  content: string;
  createdAt: any;
}

export default function DiaryDetailScreen() {
  const { diaryId } = useLocalSearchParams();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    const handleDelete = () => {
    if (!diaryId) {
      return;
    }
    const db = getFirestore();
    const diaryRef = doc(db, 'diaries', diaryId);
    deleteDoc(diaryRef).then(() => {
      router.replace('/'); // ルートに戻る
      Alert.alert('日記を削除しました');
    }).catch((error) => {
      console.error('日記の削除に失敗:', error);
      Alert.alert('日記の削除に失敗しました');
    });
  };

  useFocusEffect(React.useCallback(() => {
    const fetchDiary = async () => {
      if (!diaryId) {
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
  }, [diaryId]));

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
          <Link href={{ pathname: "/edit", params: { diaryId } }} asChild>
            <Pressable style={styles.editLink}>
              <Text style={{ color: '#fff' }}>編集</Text>
              </Pressable>
          </Link>
          <Pressable onPress={handleDelete} style={styles.deleteLink}>
              <Text style={{ color: '#fff' }}>削除</Text>
              </Pressable>
          <Pressable onPress={() => router.back()} style={styles.editLink}>
              <Text style={{ color: '#fff' }}>戻る</Text>
            </Pressable>
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
    editLink: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
    },
    deleteLink: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    alignItems: 'center',
  },
});