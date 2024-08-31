import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from 'firebase/auth';

import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyANpfVXGLOdHLxp9ZNm5tKHIOVmLy5-ZdM',
  authDomain: 'graphiqlapp.firebaseapp.com',
  projectId: 'graphiqlapp',
  storageBucket: 'graphiqlapp.appspot.com',
  messagingSenderId: '1046585951190',
  appId: '1:1046585951190:web:9e94e950abdb9c20291a77',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    authProvider: 'local',
    email,
  });
};

const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
