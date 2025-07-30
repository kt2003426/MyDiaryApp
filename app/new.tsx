import { router } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewDiaryScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlePress = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("認証成功！");
        router.back();
      })
      .catch((error) => {
        Alert.alert("認証失敗", error.message);
      });
  }
  return (
    <SafeAreaView>
      <View>
        <Text style={{ fontSize: 24, marginBottom: 20, marginTop: 20 }}>新しい日記を作成</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 ,width: 500}}
          placeholder="メールアドレス"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,width: 500}}
          placeholder="パスワード"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={handlePress} style={{ marginTop: 20, padding: 10, backgroundColor: '#007AFF' }}>
          <Text style={{ color: '#fff' }}>会員登録</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});