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
import { getStorage, uploadBytes, ref } from "firebase/storage";

const init = firebase.initializeApp(firebaseConfig);
const db = getFirestore(init);
const storage = getStorage(init);
const usersCollectionRef = collection(db, "users");
const restaurantsCollectionRef = collection(db, "restaurants");
const requestCollectionRef = collection(db, "adminList");
const notificationCollectionRef = collection(db, "notifications");
const addressCollectionRef = collection(db, "Address");
const orderCollectionRef = collection(db, "Order");

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
export const uploadDishImg = async (uid, file) => {
  const storageRef = ref(storage, `dishPhoto/${uid}/photo.jpg`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};

export const getAllRequestList = async () => {
  let listArr = [];
  const q = query(requestCollectionRef, orderBy("time", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let requestList = {};
    querySnapshot.forEach((doc) => {
      requestList = doc.data();
      listArr.push(requestList);
    });
  });
  console.log("fucall", listArr);
  return listArr;
};

export const getDoneRequestList = async () => {
  let listArr = [];
  const qs = query(requestCollectionRef, where("status", "!=", "Not verified"));
  const unsubscribe = onSnapshot(qs, (querySnapshot) => {
    let requestLists = {};
    querySnapshot.forEach((doc) => {
      requestLists = doc.data();
      listArr.push(requestLists);
    });
  });
  console.log("fucdone", listArr);
  return listArr;
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
  data.time = Date.now();
  // {category: 'Burgers', price: '2', Restaurant Name: '1', description: '2', place: '3'}
  await addDoc(requestCollectionRef, data);
};

export const createNotification = async (data) => {
  data.status = "Not seen";
  // console.log(data);
  // {foodName: 'tmp', foodDescription: 'no', foodPrice: '1', restaurantID: 'ZlXgHMiTWzgpK9YwtL3zsbF75St1', status: 'Not seen'}
  await addDoc(notificationCollectionRef, data);
};

export const createAddress = async (data) => {
  // console.log(data);
  // {foodName: 'tmp', foodDescription: 'no', foodPrice: '1', restaurantID: 'ZlXgHMiTWzgpK9YwtL3zsbF75St1', status: 'Not seen'}
  await addDoc(addressCollectionRef, data);
};
export const getAddressRaw = async (email) => {
  const q = query(
    collection(db, "Address"),
    where("restaurantEmail", "==", email),
    orderBy("time", "desc"),
  );
  const data = await getDocs(q);
  let rawData;
  data.forEach((doc) => {
    rawData = doc.data();
  });
  return rawData;
  // let addressData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  // return restaurantsData;
};
export const createOrder = async (
  cart,
  email,
  tax,
  deliveryFee,
  grandTotal,
  address,
  restaurantName,
) => {
  console.log(
    cart,
    email,
    tax,
    deliveryFee,
    grandTotal,
    address,
    restaurantName,
  );
  // {foodName: 'tmp', foodDescription: 'no', foodPrice: '1', restaurantID: 'ZlXgHMiTWzgpK9YwtL3zsbF75St1', status: 'Not seen'}
  await addDoc(orderCollectionRef, {
    orderDetail: cart,
    customerEmail: email,
    tax: tax,
    deliveryFee: deliveryFee,
    grandTotal: grandTotal,
    address: address,
    restaurantName: restaurantName,
    status: "not taken",
    time: Date.now(),
  });
};
export const getRestaurantName = async (id) => {
  const docRef = doc(db, "restaurants", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().name, docSnap.data().name;
  } else {
    console.log("No such document!");
  }
};
export const getCustomerOrderRaw = async (email) => {
  const q = query(
    collection(db, "Order"),
    where("customerEmail", "==", email),
    orderBy("time", "desc"),
  );
  const data = await getDocs(q);
  let rawData = [];
  data.forEach((doc) => {
    // const { grandTotal, orderDetail, address, status, restaurantName} = doc.data();
    rawData.push(doc.data());
  });
  console.log(rawData);
  return rawData;
};
