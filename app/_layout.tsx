import { Stack } from 'expo-router';
import React from 'react';
import {useState} from 'react';
import '../firebaseConfig';
import { getAuth,onAuthStateChanged,User } from 'firebase/auth';
import { useEffect } from 'react';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('User state changed:', user?.email);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="new" 
        options={{ 
          title: '新規登録',
          presentation: 'modal', // 画面が下からせり上がってくる
        }} 
      />
      <Stack.Screen name="detail" options={{ title: 'ログイン', presentation: 'modal' }} />
    </Stack>
  );
}