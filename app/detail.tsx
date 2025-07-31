import React from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';

export default function DetailScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("ログイン成功:", userCredential.user.email);
                router.back();
            })
            .catch((error) => {
                console.error("ログイン失敗:", error.message);
            });
    };

    return (
        <View style={styles.container}>
                <Text>ログイン</Text>
                <TextInput
                    style={styles.input}
                    placeholder="メールアドレス"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="パスワード"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Pressable onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>ログイン</Text>
                </Pressable>
        </View>
    
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});