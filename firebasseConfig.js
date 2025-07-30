import { initializeApp } from "firebase/app";

// ここに、先ほどFirebaseコンソールからコピーした自分の設定を貼り付ける
const firebaseConfig = {
  apiKey: "AIzaSyBJKtcKa6dEUD0Gjyp_aozr_WEL7CIutOM",
  authDomain: "mydiaryapp-kanata.firebaseapp.com",
  projectId: "mydiaryapp-kanata",
  storageBucket: "mydiaryapp-kanata.firebasestorage.app",
  messagingSenderId: "319282740619",
  appId: "1:319282740619:web:5fff6957b4252c5250c38e",
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);

// 初期化したappを他のファイルで使えるようにエクスポート
export default app;
