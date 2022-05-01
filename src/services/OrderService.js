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

function get(orderId){
    var orderRef = firebase.database().ref("Order/"+orderId);
    return orderRef;
}

function getCustomerOrderList(customerId){
    var orderRefTableRef = firebase.database().ref("Order/");
    orderRefTableRef.orderByChild("customer_account_id").equalTo(customerId).on("child_added", function(snapshot) {
        console.log(snapshot.key);
      });
    return orderTableRef;
}


function getMerchantOrderList(merchantId){
    var orderRefTableRef = firebase.database().ref("Order/");
    orderRefTableRef.orderByChild("merchant_account_id").equalTo(merchantId).on("child_added", function(snapshot) {
        console.log(snapshot.key);
      });
    return orderTableRef;
}

function generateOrderNumber(){
    var orderNumber;
    return orderNumber;
}

function create(merchantId,customerId,driverId,addressId,itemList,description){
    // Add a new document with a generated id.
    const res = await db.collection('Order').add({
        address_id : addressId,
        create_time: "",
        customer_account_id : customerId,
        description : description,
        driver_account_id : driverId,
        item_list : itemList,
        merchant_account_id:merchantId,
        order_number:this.generateOrderNumber(),
        status:0,
        update_time:""}
        );
    console.log('Added document with ID: ', res.id);
}

function updateStatus(orderId,status){
    const orderRef = db.collection('Order').doc(orderId);
    const res = await orderRef.update({
        status:status
    });
    console.log('Updated document with ID: ', res.id);
}

function remove(orderId){
    const res = await db.collection('Order').doc(orderId).delete();
}