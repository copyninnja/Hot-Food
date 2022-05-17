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
const storage = getStorage(init);
const usersCollectionRef = collection(db, "users");
const restaurantsCollectionRef = collection(db, "restaurants");
const requestCollectionRef = collection(db, "adminList");
const notificationCollectionRef = collection(db, "notifications");
const addressCollectionRef = collection(db, "Address");
const orderCollectionRef = collection(db, "Order");
const foodCollectionRef = collection(db, "FoodItem");

export const uploadDiplomaImg = async (now, file) => {
  if (file.status == "done") {
    console.log(file);
    const storageRef = ref(storage, `diploma/${now}/diploma.jpg`);
    const metadata = {
      contentType: "image/jpeg",
    };
    uploadBytes(storageRef, file.originFileObj, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }
};
export const uploadRestaurantImg = async (now, file) => {
  if (file.status == "done") {
    const storageRef = ref(storage, `restaurantPhoto/${now}/photo.jpg`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }
};
export const uploadDishImg = async (uid, file) => {
  //const storageRef = ref(storage, `dishPhoto/${uid}/photo.jpg`);
  //uploadBytes(storageRef, file).then((snapshot) => {

  //  console.log("Uploaded a blob or file!");
  //});
  //alert(JSON.stringify(res));
  if (file.status == "done") {
    const timeStamp = Date.now();
    const storageRef = ref(storage, `dishPhoto/${uid}/${timeStamp}.jpg`);
    const result = await uploadBytes(storageRef, file.originFileObj);
    const url = await getDownloadURL(storageRef);

    return url;
  }
};

export const uploadFoodImg = async (uid, file) => {
  const timeStamp = Date.now();
  const storageRef = ref(storage, `dishPhoto/${uid}/${timeStamp}.jpg`);
  uploadBytes(storageRef, file.originFileObj).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
  getDownloadURL(storageRef).then((url) => {
    alert(url);
  });
};

//get request data from db
export const getRequestList = async (select) => {
  let listArr = [];
  if (select.select === 1) {
    listArr = getAllRequestList();
  } else {
    listArr = getDoneRequestList();
  }
  console.log("listarr", listArr);
  return listArr;
};

export const getAllRequestList = async () => {
  let listArr = [];
  const q = query(requestCollectionRef, orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    listArr.push({ ...doc.data(), id: doc.id });
  });
  //console.log("fucall",listArr)
  return listArr;
};

export const getDoneRequestList = async () => {
  let listArr = [];
  const qs = query(requestCollectionRef, where("status", "!=", "Not verified"));
  const querySnapshot = await getDocs(qs);
  querySnapshot.forEach((doc) => {
    listArr.push({ ...doc.data(), id: doc.id });
  });
  //console.log("fucdone",listArr);
  return listArr;
};

//get each request detail content:
export const getRequestContent = async (id) => {
  let detail = {};
  let contentlist = [];
  console.log("listid", id);
  const data = await getDoc(doc(db, "adminList", id));
  if (data.exists()) {
    console.log("data", data.data());
    detail = data.data();
    const creatTime = dateFormat(new Date(data.data().time));
    const newStorage = storage;
    const pathRerence = ref(newStorage, data.data().diplomaUrl);
    // getBytes(pathRerence, 64)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    await getDownloadURL(pathRerence)
      .then((url) => {
        console.log("url", url);
        detail.imgUrl = url;
        detail.time = creatTime;
        console.log("detail", detail);
        contentlist.push(detail);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("No such document");
  }

  return contentlist;
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
export const getUserUID = async (email) => {
  const q = query(usersCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let id;
  querySnapshot.forEach((doc) => {
    id = doc.id;
  });
  return id;
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

export const updateRequest = async (id, newStatus, message) => {
  console.log(id, newStatus, message);
  const requestDoc = doc(db, "adminList", id);
  const newFields = { status: newStatus, comment: message };
  await updateDoc(requestDoc, newFields);
};

export const createRequest = async (data) => {
  data.status = "Not verified";
  data.comment = null;
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

export const createFood = async (data) => {
  // console.log(data);
  // {foodName: 'tmp', foodDescription: 'no', foodPrice: '1', restaurantID: 'ZlXgHMiTWzgpK9YwtL3zsbF75St1', status: 'Not seen'}
  await addDoc(foodCollectionRef, data);
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
    let tmp = doc.data();
    tmp.uid = doc.id;
    rawData.push(tmp);
  });
  console.log(rawData);
  return rawData;
};
export const getRestaurantOrderRaw = async (name) => {
  const q = query(
    collection(db, "Order"),
    where("restaurantName", "==", name),
    orderBy("time", "desc"),
  );
  const data = await getDocs(q);
  let rawData = [];
  data.forEach((doc) => {
    // const { grandTotal, orderDetail, address, status, restaurantName} = doc.data();
    let tmp = doc.data();
    tmp.uid = doc.id;
    rawData.push(tmp);
  });
  console.log(rawData);
  return rawData;
};
export const updateOrderDelivering = async ({ driver, uid }) => {
  console.log({ driver, uid });
  const orderCollectionRef1 = doc(db, "Order", uid);
  await updateDoc(orderCollectionRef1, {
    driver: driver,
    status: "delivering",
  });
  window.location.reload();

  // const newFields = { driver: driver, status: "delivering" };
  // await updateDoc(userDoc, newFields);
};
export const updateOrderDelivered = async (uid) => {
  console.log(uid);
  const orderCollectionRef1 = doc(db, "Order", uid);
  await updateDoc(orderCollectionRef1, {
    status: "delivered",
  });
  window.location.reload();
};
export const updateOrderCanceled = async (uid) => {
  console.log(uid);
  const orderCollectionRef1 = doc(db, "Order", uid);
  await updateDoc(orderCollectionRef1, {
    status: "canceled",
  });
  window.location.reload();
};

//after approving,change the status of restaurant
export const updateRetaurantStatus = async (uid) => {
  // console.log("email",email)
  console.log("o-uid", uid);
  const docRef = doc(db, "users", uid);
  const newFields = { status: "verified" };
  await updateDoc(docRef, newFields);
};
