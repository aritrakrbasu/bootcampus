import React,{useEffect} from 'react';
import { IconButton, Button } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom'
import { db } from '../routes/firebase'
import { useStateValue } from '../StateProvider';



function Classroomlist() {
   const[{userData,ClassroomList}, dispatch]=useStateValue();
   useEffect(() => {
      if(userData.uId !== '')
      {
         var unsubscribe = db.collection("classrooms").where(`participants.${userData.uId}.uId`, '==', userData.uId)
         .onSnapshot(function(docs) {
           
            if(!docs.empty)
            {
               var classroomlist=[]
               docs.forEach(doc => {
                  classroomlist.push({
                     id:doc.id,
                     classRoomId:doc.data().classRoomId,
                     classRoomName:doc.data().classRoomName,
                     classroomdriveFolderId:doc.data().classroomdriveFolderId,
                     notice:doc.data().notice,
                     participants:doc.data().participants,
                     room:doc.data().room,
                     section:doc.data().section,
                     syllabus:doc.data().syllabus,
                     timetable:doc.data().timetable,
                  }) 
                  dispatch({
                     type:'CLASSROOM_LIST_UPDATE',
                     item:classroomlist
                     });
               })
            }else
            {
               dispatch({
                  type:'CLASSROOM_LIST_UPDATE',
                  item:''
                  });
            }
         })
         
   
         return () => {
            unsubscribe();
         };
      }
   }, [userData.uId])

   function SearchClassRoom(event,id)
   {
      event.preventDefault();
      db.collection("classrooms").doc(id).get().then((doc)=>{
         DeleteClassDriveFolder(doc.data().driveFileId,id);
      })
   }
   function DeleteClass(id)
   {
      db.collection("classrooms").doc(id).delete().then(function() {
     }).catch(function(error) {
         console.error("Error removing document: ", error);
     });
     
   }
   function DeleteClassDriveFolder(folderId,id){
      var gapi=window.gapi;
      gapi.load('client', function () {
          gapi.client.load('drive', 'v3', function (){
                var DeleteClassFolder = gapi.client.drive.files.delete({
                  'fileId':folderId
                })
                DeleteClassFolder.execute(function (res) {
                  DeleteClass(id);
                });

          })
      });     
  }

   function ShareClass(event,classId)
   {
      event.preventDefault();
      var url = window.location.protocol+'://'+window.location.hostname+'/classrooms/join/'+classId
      if (navigator.share) {
         navigator.share({
           title: 'Welcome to my classroom',
           url: url,
         })
           .then(
              //if success
           )
           .catch((error)=>
           {
              console.log(error);
             
            }
            )
       }else{
         var textField = document.createElement('textarea')
         textField.innerText = url
         document.body.appendChild(textField)
         textField.select()
         document.execCommand('copy')
         textField.remove()
       }
   } 
    return (
      <div className="container h-100 -fluid">
      <div className="row">

        {ClassroomList && ClassroomList.map((classroom, i)=>{
           return(
           <div className=" col-lg-3 my-3" key={i}>
               
              <Link to={'/classroom/'+classroom.id}>  
               <div className="container h-100  class__preview">
               {classroom.participants[userData.uId].isAuthor?(
                  <IconButton
                  variant="contained"
                  color="secondary"
                  className="btn__delete"
                  onClick={(event)=>SearchClassRoom(event,classroom.id)}
                  ><ClearIcon /></IconButton>
               ):(null) }
              
               
                     <h2>{classroom.classRoomName}</h2>
                     <span class="f_letter">{classroom.classRoomName.charAt(0)}</span>
                     <div class="break" />
               <div class="check__class">{classroom.participants[userData.uId].isAuthor?("Class Code :"+classroom.classRoomId):("Check Class") }</div>
               {classroom.participants[userData.uId].isAuthor?(
                   <IconButton
                   variant="contained"
                   color="secondary"
                   className="btn__share"
                   onClick={(event)=>ShareClass(event,classroom.classRoomId)}
                   ><ShareIcon /></IconButton>
               ):(null) }
              
                  </div>

               </Link>
             </div>
           );
        })}
       
            
            </div> 
       </div>
    )
}

export default Classroomlist
