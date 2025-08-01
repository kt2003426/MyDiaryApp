import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, getFirestore, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import React from 'react';
import { Alert, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import DiaryCard from '../component/DiaryCard';

interface Diary{
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;  
}

export default function DiaryListScreen() {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  const [diaries, setDiaries] = React.useState<Diary[]>([]);
  // この画面でもログイン状態を監視
  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

  let unsubscribeDiaries: () => void = () => {};
    if (auth.currentUser) {
      const db = getFirestore();
      const q = query(collection(db, 'diaries'), 
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      unsubscribeDiaries = onSnapshot(q, (querySnapshot) => {
        const userDiaries: Diary[] = [];
        querySnapshot.forEach((doc) => {
          userDiaries.push({ id: doc.id, ...doc.data() } as Diary);
        });
        setDiaries(userDiaries);
      });
    }
    else {
      setDiaries([]);
    }
    return () => {
      unsubscribe();
      unsubscribeDiaries();
    };
  }, [user]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert('ログアウトしました');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };
    

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}><Feather name="book" size={24} /> 日記アプリ</Text>
      </View>
      
      <View style={styles.authContainer}>
        {user ? (
          // --- ログインしている時の表示 ---
          <View style={styles.loggedInContainer}>
            <Text style={styles.welcomeText}>{user.email} でログイン中</Text>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}><Feather name="log-out" size={16} /> ログアウト</Text>
            </Pressable>
          </View>
        ) : (
          // --- ログインしていない時の表示 ---
          <View style={styles.loggedOutContainer}>
            <Link href="/new" asChild>
              <Pressable style={styles.authButton}>
                <Text style={styles.authButtonText}><Feather name="user-plus" size={16} /> ユーザー登録</Text>
              </Pressable>
            </Link>
            <Link href="/detail" asChild>
              <Pressable style={styles.loginButton}>
                <Text style={styles.authButtonText}><Feather name="log-in" size={16} /> ログイン</Text>
              </Pressable>
            </Link>
          </View>
        )}
      </View>
      
      {/* --- 日記一覧 (ログインしている時だけ表示) --- */}
      {user && (
          <View style={styles.listContainer}>
          <Text style={styles.SectionTitle}><Feather name="list" size={16} /> 開発ニュース</Text>
          <View style={styles.card}>
            <Text style={styles.cardDate}>2025年7月31日</Text>
            <Text style={styles.cardTitle}>ログイン機能を実装した！</Text>
          </View>
        </View>
      )}

      {user && (
        <View>
        <Text style={styles.SectionTitle}><Feather name="book" size={16} /> あなたの日記一覧</Text>
        <FlatList
          data={diaries}
          keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DiaryCard item={item} />
            )}
          style={{ paddingHorizontal: 20 }}
          />
        </View>
      )}
      {user && (
        <View>
          <Link href="/newdiary" asChild>
            <Pressable style={styles.authButton}>
              <Text style={styles.authButtonText}><Feather name="edit" size={16} /> 新しい日記を書く</Text>
            </Pressable>
          </Link>
        </View>
      )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: { backgroundColor: '#4682b4', paddingVertical: 20, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  authContainer: { padding: 20 },
  loggedInContainer: { alignItems: 'center' },
  welcomeText: { marginBottom: 10, color: '#555' },
  logoutButton: { backgroundColor: '#dc3545', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  logoutButtonText: { color: '#fff', fontWeight: 'bold' },
  loggedOutContainer: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 },
  authButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  loginButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  authButtonText: { color: '#fff', fontWeight: 'bold' },
  listContainer: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardDate: { fontSize: 12, color: '#888', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  SectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333', marginLeft: 20 },
});