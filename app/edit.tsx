import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function NewDiaryEntry() {
  const { diaryId } = useLocalSearchParams();
  const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleUpdate = () => {
    if (!diaryId) {
      return;
    }
    const db = getFirestore();
    const diaryRef = doc(db, 'diaries', diaryId);
      updateDoc(diaryRef, {
      title: title,
      content: content,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        Alert.alert('日記を更新しました');
        router.back();
      })
      .catch((error) => {
        console.error('日記の更新に失敗:', error);
        Alert.alert('日記の更新に失敗しました');
      }
    );
  };
    useEffect(() => {
        const fetchDiary = async () => {
            if (!diaryId) {
                return;
            }
            const db = getFirestore();
            const diaryDoc = doc(db, 'diaries', diaryId);
            const diarySnapshot = await getDoc(diaryDoc);
            if (diarySnapshot.exists()) {
                setTitle(diarySnapshot.data().title);
                setContent(diarySnapshot.data().content);
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

    return (
        <ScrollView style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 20, marginTop: 20 }}>日記の編集<Feather name="edit" size={24} /></Text>
        <Text style={{ marginBottom: 20 }}>日記の内容を編集してください。</Text>
        <TextInput
            style={styles.input}
            placeholder="タイトル"
            value={title}
            onChangeText={setTitle}
        />
        <TextInput
            style={styles.input}
            placeholder="内容"
            value={content}
            onChangeText={setContent}
            multiline
        />
        <Pressable onPress={handleUpdate} style={styles.button}>
            <Text style={styles.buttonText}><Feather name="save" size={16} /> 保存</Text>
        </Pressable>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    },
    centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});