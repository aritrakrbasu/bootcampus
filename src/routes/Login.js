import React,{useEffect} from 'react'
import { Button } from '@material-ui/core';
import {fire,provider} from './firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

function Login() {
    var uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'redirect',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/timeline',
        // We will display Google
        signInOptions: [
            {
                 provider:firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes:[
            'https://www.googleapis.com/auth/drive.file'	
          ],
            }
           
        ]
      };
    useEffect(() => {
          if(localStorage.getItem('uid'))
          {
            window.location.href="/timeline"
          }
    }, [])
    return (
        <div>
        <div className="container-fluid">
        <div className="row py-4 bg1">
        </div>
        <div className="row">
            
            <div className="col-lg-1 col-2">
            <h1 class="login__header">Login </h1>
            </div>

            <div className="col-lg-11 col-10">
                <div className="row">
                    <div className="col-4 d-none d-md-block">

                        <div className="container login-form my-4">
                            <h5>For Students</h5>
                            <p>
                                    We are the market–leading technical
                                interview platform to identify and hire
                                developers with the right skills.
                            </p>
                        <img src="/img/l2.svg" className="img-fluid"/>     
                        </div>     
                    </div>
                    <div className="col-4 d-none d-md-block">
                    <div className="container login-form my-4">
                            <h5>For Faculties</h5>
                            <p>
                            Join over 11 million developers,
                        practice coding skills, prepare for
                        interviews, and get hired.
                            </p>
                        <img src="/img/l1.svg" className="img-fluid"/>     
                        </div>     
                    </div>
                    <div className="col-lg-4 d-flex align-items-center  justify-content-center">
                        
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        For any queries, click <a href="#"><u>here</u></a>.
                    </div>
                </div>
            </div>
        </div>
        
    </div>
        </div>
    )
}

export default Login;
