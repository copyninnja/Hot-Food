import React, { useState, useEffect, createContext, useContext } from "react";
import firebaseConfig from "../firebaseconfig";
import { Route, Redirect, useHistory } from "react-router-dom";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/analytics";
import firebase from "firebase/compat/app";
import { createUser, getUserType } from "../api";

//***************** Fire base Initialization ************************
const db = getFirestore(firebase.initializeApp(firebaseConfig));

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//***************** Redirect review item to signIn ************************
export const PrivateRoute = ({ restricted, children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          auth.user.type === restricted ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/signup",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const getUser = (user) => {
  const { email, displayName, photoURL } = user;
  return { email, name: displayName, photo: photoURL };
};

const Auth = () => {
  const [user, setUser] = useState(null);
  // const usersCollectionRef = collection(db, "users"); //表名
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const fetchData = async () => {
          const type = await getUserType(user.email);
          const currentUser = user;
          currentUser.type = type === undefined ? "Customer" : type;
          setUser(currentUser);
          window.history.back();
        };
        fetchData();
      }
    });
  }, []);

  //***************** sign in with popup Start ************************
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const signedInUser = getUser(result.user);
        setUser(signedInUser);
        window.history.back();
        return result.user;
      })
      .catch((error) => {
        setUser(null);
        console.log(error.message);
        return error.message;
      });
  };

  const signIn = (email, password, type) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        setUser(null);
        return error.message;
      });
  };

  const signUp = (email, password, name, type) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            createUser(email, type);
            let thisUser = result.user;
            thisUser.type = type;
            setUser(thisUser);
          });
      })
      .catch((error) => {
        setUser(null);
        return error.message;
      });
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then((result) => {
        setUser(null);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return error.message;
      });
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
};

export default Auth;
