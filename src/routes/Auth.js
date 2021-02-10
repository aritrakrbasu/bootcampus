import React,{useEffect,useState} from 'react';
import {app} from './base';
import firebase from 'firebase'; 
export const Auth =()=>{
    const[currentUser,setCurrentUser]=useState();
    const provider = new firebase.auth.GithubAuthProvider();

    useEffect(() => {
        app.auth().onAuthStateChanged((user)=>{
            setCurrentUser(user)
        });
    }, [])
    const authWithGoogle=()=>
    {
        firebase.auth.signInWithPopup(provider)
    }
    return (<button onClick={authWithGoogle}>Login</button>)
}