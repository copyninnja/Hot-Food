import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
} from "@firebase/firestore";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseconfig";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { Empty } from "antd";

const init = firebase.initializeApp(firebaseConfig);
const db = getFirestore(init);


export const getAddressList = async (email) => {
  const q = query(
    collection(db, "Address"),
    where("customerEmail", "==", email),
  );
  const data = await getDocs(q);
  let listData = [];
  data.forEach((doc) => {
      listData.push(doc.data());
  });
  return listData;
  // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  // return restaurantsData;
};
