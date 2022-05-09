import { useState, useEffect } from "react";

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
} from "@firebase/firestore";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseconfig";
import { getStorage, uploadBytes, ref } from "firebase/storage";

const init = firebase.initializeApp(firebaseConfig);
const db = getFirestore(init);
const storage = getStorage(init);
const usersCollectionRef = collection(db, "users");
const restaurantsCollectionRef = collection(db, "restaurants");
const requestCollectionRef = collection(db, "adminList");

export const uploadDiplomaImg = async (uid, file) => {
  const storageRef = ref(storage, `diploma/${uid}/diploma.jpg`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};
export const uploadRestaurantImg = async (uid, file) => {
  const storageRef = ref(storage, `restaurantPhoto/${uid}/photo.jpg`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};
export const getRestaurantsRaw = async () => {
  const data = await getDocs(restaurantsCollectionRef);
  let restaurantsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return restaurantsData;
};
export const getUserTypeAndStatus = async (email) => {
  const q = query(usersCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let type, status;
  querySnapshot.forEach((doc) => {
    type = doc.data().type;
    status = doc.data().status;
  });
  return { type, status };
};
export const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
export const createUser = async (email, type, status) => {
  // console.log(status == null, { email, type, status });
  await addDoc(usersCollectionRef, { email, type, status });
};

export const updateUser = async (id, age) => {
  const userDoc = doc(db, "users", id);
  const newFields = { age: age + 1 };
  await updateDoc(userDoc, newFields);
};
export const createRequest = async (data) => {
  data.status = "Not verified";
  console.log(data);
  // {category: 'Burgers', price: '2', Restaurant Name: '1', description: '2', place: '3'}
  await addDoc(requestCollectionRef, data);
};
