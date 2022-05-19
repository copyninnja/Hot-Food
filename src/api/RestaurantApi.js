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
    getDoc,
  } from "@firebase/firestore";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseconfig";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { dateFormat } from "../helpers/dateFormat";
const init = firebase.initializeApp(firebaseConfig);
const db = getFirestore(init);
const restaurantsCollectionRef = collection(db, "restaurants");

export const findRestaurantEmail = async (id) => {
    const docRef = doc(db, "restaurants", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().email;
    }else {
        console.log("No such document!");
    }
    
  };