import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, limitToLast, onValue, orderByChild, query, ref, set } from "firebase/database";

// viết dữ liệu
// sử dụng set() để lưu dữ liệu vào một tham chiếu được chỉ định, thay thế bất kỳ dữ liệu hiện có nào tại đường dẫn đó


const firebaseConfig = {
    apiKey: 'AIzaSyAJ2MtskK33P1WWdsCn5KRz_XOHTQn13xE',
    authDomain: 'reactjs-api-a31a3.firebaseapp.com',
    databaseURL: 'https://reactjs-api-a31a3-default-rtdb.firebaseio.com',
    projectId: 'reactjs-api-a31a3',
    storageBucket: 'reactjs-api-a31a3.appspot.com',
    messagingSenderId: '466254532477',
    appId: '1:466254532477:web:ca48108627cfa7bbee0614',
    measurementId: 'G-XWRB84HDJS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

function writeUserData(userId, name, email, imageUrl, a) {
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl,
    arr: a
  });
}

// writeUserData('test2', 'dai2', 'dailai9966', 'abcde', ["a", "b", "c"])

// đọc dữ liệu

const starCountRef = ref(db, 'users/test');
console.log('🚀 starCountRef: ', starCountRef)
onValue(starCountRef, (snapshot) => {
    console.log('🚀 snapshot: ', snapshot)
  const data = snapshot.val();
  console.log('🚀 data: ', data)
});

// đọc dữ liệu 1 lần

// const dbRef = ref(getDatabase());
// get(child(dbRef, `users/test`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

// const db = getDatabase();
const mostViewedPosts = query(ref(db, 'users/test2'), limitToLast(10));

onValue(mostViewedPosts, (snapshot) => {
    console.log('🚀 snapshot: ', snapshot)
  const data = snapshot.val();
  console.log('🚀 data: ', data)
});
