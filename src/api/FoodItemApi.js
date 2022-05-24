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
import { Descriptions } from "antd";
  import firebase from "firebase/compat/app";
  import firebaseConfig from "../firebaseconfig";

  
  const init = firebase.initializeApp(firebaseConfig);
  const db = getFirestore(init);
  const foodCollectionRef = collection(db, "FoodItem");

  
  
  export const getFooditemList = async (restaurantEmail) => {
    
    const q = query(
      collection(db, "FoodItem"),
      where("restaurantEmail", "==", restaurantEmail),
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
   
    const foodItemRef = doc(db, "FoodItem", id);
    const docSnap = await getDoc(foodItemRef);
    try {
      const newFields = {
        name : data.name,
        description : data.description,
        price : data.price
      };
      if(typeof(data.img)!="undefined"){
        newFields.img=data.img;
      }
      await updateDoc(foodItemRef, newFields);
    } catch (error) {
      alert(JSON.stringify(error));
    }
    window.location.reload();

  };

  export const getFoodItemID = async (email) => {
    const q = query(foodCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let id;
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    return id;
  };

  export const findFoodItem = async (id) => {
    const docRef = doc(db, "FoodItem", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    }else {
        console.log("No such document!");
    }
    
  };

  export const getAllFoodItem = async () => {
    const data = await getDocs(foodCollectionRef);
    alert("inner");
    try {
      let restaurantsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // normal;
      return restaurantsData;
    } catch (error) {
      alert("error");
      
    }
    
    
    
  };

  export const findFoodItemList = async (id) => {
    const docRef = doc(db, "FoodItem", id);
    const docSnap = await getDoc(docRef);
    var res = [];
    if (docSnap.exists()) {
      res.push(docSnap.data());
      return res;
    }else {
        console.log("No such document!");
    }
    
  };
  