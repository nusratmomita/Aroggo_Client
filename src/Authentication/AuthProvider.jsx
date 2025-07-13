import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider();

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    // console.log(loading,user);


    // register with email & password
    const handleRegister = (email,password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // register with google
    const handleGoogleAuth = () => {
        return signInWithPopup(auth,provider);
    }

    // login with email & password
    const handleLogin = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }

    // update profile
    const handleUpdateProfile = (updateData) => {
        return updateProfile(auth.currentUser , updateData)
    } 

    // handle logout
    const handleLogout = () => {
        return signOut(auth);
    }
    
    // setting up an observer
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        
        return () => {
            unsubscribe();
        }
    })
    
    const userInfo = {
        handleRegister,
        handleGoogleAuth,
        handleUpdateProfile,
        handleLogin,
        handleLogout,
        user,
        setUser,
        loading,setLoading,
    }
    // console.log(userInfo)

    return (
        <AuthContext.Provider value={userInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;