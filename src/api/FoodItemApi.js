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
  const foodCollectionRef = collection(db, "FoodItem");

  
  
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

  export const createFoodItem = async (data) => {
    // console.log(data);
    // {foodName: 'tmp', foodDescription: 'no', foodPrice: '1', restaurantID: 'ZlXgHMiTWzgpK9YwtL3zsbF75St1', status: 'Not seen'}
    await addDoc(foodCollectionRef, data);
  };

  export const updateFoodItem = async ( id, data ) => {
   
    alert("id"+id);
    const foodItemRef = doc(db, "FoodItem", id);
    try {
      await updateDoc(foodItemRef, data);
    } catch (error) {
      alert(JSON.stringify(error));
    }
    
    window.location.reload();
  
    // const newFields = { driver: driver, status: "delivering" };
    // await updateDoc(userDoc, newFields);
  };
  