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

  
  const init = firebase.initializeApp(firebaseConfig);
  const db = getFirestore(init);
  
  
  export const getFooditemList = async (restaurantID) => {
    const q = query(
      collection(db, "FoodItem"),
      where("restaurantID", "==", restaurantID),
    );
    const data = await getDocs(q);
    let listData = [];
    data.forEach((doc) => {
      let finalDoc = doc.data();
      finalDoc.id = doc.id;
      listData.push(finalDoc);
    });
    return listData;
    // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // return restaurantsData;
  };

  export const deleteFoodItem = async (id) => {
    const foodItemDoc = doc(db, "FoodItem", id);
    await deleteDoc(foodItemDoc);
  };
  