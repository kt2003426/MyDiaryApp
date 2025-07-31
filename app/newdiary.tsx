import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewDiaryEntry() {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const handlePress = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('ログインしてください');
            return;
        }
        if (!title || !content) {
            Alert.alert('タイトルと内容を入力してください');
            return;
        }
        const db = getFirestore();
        addDoc(collection(db, 'diaries'), {
            title,
            content,
            userId: user.uid,
            createdAt: serverTimestamp(),
        })
            .then(() => {
                Alert.alert('日記を保存しました');
                router.back();
            })
            .catch((error) => {
                console.error('日記の保存に失敗:', error);
                Alert.alert('日記の保存に失敗しました');
            }
        );
    };
    return (
            <View style={styles.container}>
                <Text>新しい日記を作成</Text>
                {/* 他のコンポーネントやロジックをここに追加 */}
                <TextInput placeholder="タイトル"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <TextInput placeholder="内容" multiline={true}
                    value={content}
                    onChangeText={setContent}
                    style={styles.input}
                />
                <Pressable onPress={handlePress} style={styles.button}>
                    <Text style={styles.buttonText}>保存</Text>
                </Pressable>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        marginTop: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
});