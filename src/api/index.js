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

const db = getFirestore(firebase.initializeApp(firebaseConfig));
const usersCollectionRef = collection(db, "users");

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  let userdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
export const getUserType = async (email) => {
  const q = query(usersCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let type;
  querySnapshot.forEach((doc) => {
    type = doc.data().type;
  });
  return type;
};
export const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
export const createUser = async (email, type) => {
  await addDoc(usersCollectionRef, { email, type });
};

export const updateUser = async (id, age) => {
  const userDoc = doc(db, "users", id);
  const newFields = { age: age + 1 };
  await updateDoc(userDoc, newFields);
};
