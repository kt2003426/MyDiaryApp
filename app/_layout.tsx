import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="new" 
        options={{ 
          title: '新しい日記',
          presentation: 'modal', // 画面が下からせり上がってくる
        }} 
      />
      <Stack.Screen name="detail" options={{ title: '日記の詳細' }} />
    </Stack>
  );
}