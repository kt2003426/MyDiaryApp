import { Stack } from 'expo-router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import '../firebaseConfig';

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
      <Stack.Screen 
        name="newdiary" 
        options={{ 
          title: '新しい日記を作成',
          presentation: 'modal', // 画面が下からせり上がってくる
        }}
      />
      <Stack.Screen 
        name="diary" 
        options={{ 
          title: '日記詳細',
          presentation: 'modal', // 画面が下からせり上がってくる
        }}
      />
    </Stack>
  );
}