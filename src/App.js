import React,{useEffect,useState} from 'react';
import {useStateValue} from './StateProvider'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import Profile from './routes/Profile';
import Login from './routes/Login';
import firebaseConfig,{fire,db} from './routes/firebase'
import  {PrivateRoute} from './routes/PrivateRoute';
import Home from './routes/Home';
import Timeline from './routes/TImeline';
import Classrooms from './routes/Classrooms';
import Classroom from './routes/Classroom';
import ProfileList from './routes/ProfileList';
function App() {
  var gapi=window.gapi;
  const[,dispatch]=useStateValue();
  const [userData, setUser] = useState(null);
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      // console.log(user)
       if(user)
       { 
         gapi.load('client',()=>{
              gapi.client.init({
                apiKey: firebaseConfig.apiKey,
                clientId: firebaseConfig.clientId,
                discoveryDocs: firebaseConfig.discoveryDocs,
                scope: firebaseConfig.scope,
              }).then(function() {
                // Make sure the Google API Client is properly signed in
                if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                  startApp(user);
                } else {
                  fire.auth().signOut(); // Something went wrong, sign out
                }
              })
         })
                                   
      
         localStorage.setItem('uid',user.uid);
         localStorage.setItem('userName',user.displayName);
         UserData(user);
         setUser({user});
       }else
       {
         localStorage.removeItem('uid');
         localStorage.removeItem('userName');
         setUser({});
       }
     });
     function UserData(userdata)
    {
      var user= null  
            const ProfileRef = db.collection('profile').doc(userdata.uid)
             ProfileRef.get()
                .then((doc) => {
                    if (doc.exists) {
                        //doc already exists
                        user=doc.data();
                        dispatch({
                          type:'USER_SIGN_UP',
                          item:user
                          });
                    } else {
                        //create profile
                        ProfileRef.set({
                            uId:userdata.uid,
                            Dname:userdata.displayName,
                            email:userdata.email,
                            photoURL:userdata.photoURL,
                            role:'student',

                        })
                        .then(function(docRef) {
                          user={
                            uId:userdata.uid,
                            Dname:userdata.displayName,
                            email:userdata.email,
                            photoURL:userdata.photoURL,
                            role:userdata.role
                        }
                        dispatch({
                          type:'USER_SIGN_UP',
                          item:user
                          });
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
                
           }
    }, [])
    function startApp(user) {
      fire.auth().currentUser.getIdToken()
      .then(function(token) {
        dispatch({
          type:'ADD_GOOGLE_AUTH_TOKEN',
          item:token
        })
       })
      .then(function(response) {
        console.log(response);  
      });
    }
  return (
    <div className="App">
       <Router>
        <Switch>
          <PrivateRoute path="/profile/:profileid" component={Profile} />
          <PrivateRoute path="/profiles" component={ProfileList} />
          <PrivateRoute path="/timeline" component={Timeline} />
          <PrivateRoute path="/classrooms" component={Classrooms} />
          <PrivateRoute path="/classroom/:classRoomId" component={Classroom} />
          
          <Route path="/login">
            {/* <Login /> */}
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
