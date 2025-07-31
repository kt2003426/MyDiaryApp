import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth';

export default function DiaryListScreen() {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();

  // この画面でもログイン状態を監視
  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>日記アプリ</Text>
      </View>
      
      <View style={styles.authContainer}>
        {user ? (
          // --- ログインしている時の表示 ---
          <View style={styles.loggedInContainer}>
            <Text style={styles.welcomeText}>{user.email} でログイン中</Text>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>ログアウト</Text>
            </Pressable>
          </View>
        ) : (
          // --- ログインしていない時の表示 ---
          <View style={styles.loggedOutContainer}>
            <Link href="/new" asChild>
              <Pressable style={styles.authButton}>
                <Text style={styles.authButtonText}>ユーザー登録</Text>
              </Pressable>
            </Link>
            <Link href="/detail" asChild>
              <Pressable style={styles.loginButton}>
                <Text style={styles.authButtonText}>ログイン</Text>
              </Pressable>
            </Link>
          </View>
        )}
      </View>

      {/* --- 日記一覧 (ログインしている時だけ表示) --- */}
      {user && (
        <View style={styles.listContainer}>
          <View style={styles.card}>
            <Text style={styles.cardDate}>2025年7月31日</Text>
            <Text style={styles.cardTitle}>ログイン機能を実装した！</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
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
});