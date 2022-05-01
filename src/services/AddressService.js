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
const addressCollectionRef = collection(db, "Address");

function get(addressId){
    var addressRef = firebase.database().ref("Address/"+addressId);
    return addressRef;
}

function getList(customerId){
    var addressTableRef = firebase.database().ref("Address/");
    addressTableRef.orderByChild("customer_account_id").equalTo(customerId).on("child_added", function(snapshot) {
        console.log(snapshot.key);
      });
    
}



function create(customerId,contactNumber, postcode,city, lineAddress1,lineAddress2){
    // Add a new document with a generated id.
    const res = await db.collection('Address').add({
        customer_account_id: customerId,
        contact_number: contactNumber,
        post_code:postcode,
        city:city,
        line_address_1: lineAddress1,
        line_address_2 : lineAddress2
    });
    console.log('Added document with ID: ', res.id);
}

function update(addressId,customerId,contactNumber, postcode,city, lineAddress1,lineAddress2){

    const addressRef = db.collection('Address').doc(addressId);
    const res = await addressRef.update({
        customer_account_id: customerId,
        contact_number: contactNumber,
        post_code:postcode,
        city:city,
        line_address_1: lineAddress1,
        line_address_2 : lineAddress2});

    console.log('Updated document with ID: ', res.id);
}

function remove(addressId){
    const res = await db.collection('Address').doc(addressId).delete();
}

export const getAddress = async () => {
    const data = await getDocs(usersCollectionRef);
    let userdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(userdata);
  };
  
export const deleteAddress = async (addressId) => {
    const addressDoc = doc(db, "Address", addressId);
    await deleteDoc(addressDoc);
    console.log("done");
};

export const createAddress = async (customerId,contactNumber, postcode,city, lineAddress1,lineAddress2) => {
    await addDoc(addressCollectionRef, {  
        customer_account_id: customerId,
        contact_number: contactNumber,
        post_code:postcode,
        city:city,
        line_address_1: lineAddress1,
        line_address_2 : lineAddress2
    });
};
  
export const updateAddress = async (addressId,customerId,contactNumber, postcode,city, lineAddress1,lineAddress2) => {
    const addressDoc = doc(db, "Address", addressId);
    const newAddress = { 
        customer_account_id: customerId,
        contact_number: contactNumber,
        post_code:postcode,
        city:city,
        line_address_1: lineAddress1,
        line_address_2 : lineAddress2
    };
    await updateDoc(addressDoc, newAddress);
};