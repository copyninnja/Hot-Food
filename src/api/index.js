import { useState, useEffect } from "react";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebaseconfig";

const db = getFirestore(firebase.initializeApp(firebaseConfig));
const usersCollectionRef = collection(db, "users");

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  let userdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log(userdata);
};

export const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
  console.log("done");
};
export const createUser = async (newName, newAge) => {
  await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
};

export const updateUser = async (id, age) => {
  const userDoc = doc(db, "users", id);
  const newFields = { age: age + 1 };
  await updateDoc(userDoc, newFields);
};
