import React from 'react'
import {Modal} from 'react-bootstrap'
import { TextField,Button } from '@material-ui/core'
import { db } from '../routes/firebase';
import { useStateValue } from '../StateProvider';
function JoinClassrooms(props) {
  const[{userData}, dispatch]=useStateValue();
    const [state, setState] = React.useState({
        classroom_code:""
      })
    function joinClassroom(event){
        event.preventDefault();
        var classroomRef=db.collection('classrooms').where("classRoomId","==",state.classroom_code);
        var gapi = window.gapi;
        props.onHide();
        classroomRef.get().then((docs)=>{
          if(!docs.empty)
          {
            docs.forEach((doc)=>{
              if(doc.data().participants[userData.uId])
              {
                // already a author
              }
              else
              {
                gapi.load('client', function () {
                  gapi.client.load('drive', 'v3', function (){
                    var search =gapi.client.drive.files.list({
                      q: "mimeType='application/vnd.google-apps.folder'and name='Bootcampus' and trashed=false"
                    }).then((response)=>{
                      if (response.result && response.result.files && response.result.files[0]) {
                        var fileMetadata = {
                          'name': doc.data().classRoomName,
                          'parents': [response.result.files[0].id],
                          'mimeType': 'application/vnd.google-apps.folder'
                        };
                        var create = gapi.client.drive.files.create({
                          resource: fileMetadata,
                          fields: 'id'
                        })
                        create.execute (function (res) {
                          jointoclassroom(doc.id)
                        });
                      } else {
                        var folderMetadata ={
                          'name':"Bootcampus",
                          'mimeType': 'application/vnd.google-apps.folder'
                        }
                        var create = gapi.client.drive.files.create({
                          resource: folderMetadata,
                          fields: 'id'
                        })
                        create.execute (function (res) {
                          var fileMetadata = {
                            'name': doc.data().classRoomName,
                            'parents': [res.id],
                            'mimeType': 'application/vnd.google-apps.folder'
                          };
                          var create = gapi.client.drive.files.create({
                            resource: fileMetadata,
                            fields: 'id'
                          })
                          create.execute (function (res) {
                            jointoclassroom(doc.id)
                          });
                        })
                      }
                    }, (error) => {
                     console.error(error);
                    });
                  })
              });                   
              }
             })
          }
        })
    }
    function jointoclassroom(docId)
    {
      db.collection('classrooms').doc(docId).update(
        {
          ["participants."+userData.uId]:
          {
            uId:userData.uId,
            Dname:userData.Dname,
            Displaypicture:userData.photoURL,
            isAuthor:false,
            isStudent:true,
            isTeacher:false,
          }
        }
      )
    }
    function handleChange(evt) {
        setState({
            ...state,
            [evt.target.name]: evt.target.value
          });
      }
    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
      <form autoComplete="off">
        <TextField id="outlined-basic" name="classroom_code" onChange={handleChange} label="Class Name" className="w-100 my-2" variant="outlined" require="true" />
        <Button type="submit" onClick={joinClassroom} variant="contained" color="primary" size="large" className="my-2">Join Classroom</Button>
       </form> 
       
      </Modal.Body>
    </Modal>
    )
}

export default JoinClassrooms
