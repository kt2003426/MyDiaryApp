import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// 日本語化の設定
LocaleConfig.locales['ja'] = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'ja';

// markedDatesに渡すオブジェクトの型
interface MarkedDates {
  [key: string]: {
    marked: boolean;
    dotColor: string;
  };
}

export default function CalendarScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const db = getFirestore();
        const q = query(collection(db, 'diaries'), where('userId', '==', currentUser.uid));
        
        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
          const dates: MarkedDates = {};
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.createdAt) {
              // 'YYYY-MM-DD'形式の文字列に変換
              const dateString = data.createdAt.toDate().toISOString().split('T')[0];
              dates[dateString] = { marked: true, dotColor: '#4682b4' };
            }
          });
          setMarkedDates(dates);
        });
        
        // このeffectが再実行される時に前回の監視を解除
        return () => unsubscribeFirestore();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>カレンダー</Text>
      <Calendar
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#4682b4',
          arrowColor: '#4682b4',
          todayTextColor: '#4682b4',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});