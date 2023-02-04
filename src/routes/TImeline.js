import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { fire } from "./firebase";
import { useStateValue } from "../StateProvider";
import Sidebar from "../components/Sidebar";
import TimelineComp from "../components/TimelineComp";
import Adminsidebar from "../components/Adminsidebar";
// import {google} from 'googleapis';
// const {google} = require('googleapis');
function TImeline() {
  const [{ userData, GoogleAuthToken }, dispatch] = useStateValue();
  // const fs = require('fs');
  // const readline = require('readline');
  // const {google} = require('googleapis');

  function signout() {
    fire
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  }
  useEffect(() => {
    console.log(userData);
  }, [userData.uId != ""]);

  return (
    <div>
      <div className="timeline-conatiner">
        {userData?.role == "admin" && <Adminsidebar />}
        {userData?.role == "student" && <Sidebar />}
        <TimelineComp />
      </div>
      <Button onClick={signout}>Sign out</Button>
    </div>
  );
}

export default TImeline;
