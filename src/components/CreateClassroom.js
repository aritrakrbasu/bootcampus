import React from 'react'
import {Modal} from 'react-bootstrap'
import { TextField,Button } from '@material-ui/core'
import { db } from '../routes/firebase'
import { useStateValue } from '../StateProvider';
function CreateClassroom(props) {
    const[{userData}, dispatch]=useStateValue();
    const [formError,setFormError]=React.useState(false)
    const [state, setState] = React.useState({
        class_room_name: "",
        section:"",
        room:"",
      })
    function randomString(length, chars) {
        var mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
        return result;
        
    }
    function CreateClassroom(event){
      if(state.class_room_name==='')
      {
        setFormError(true);
      }else
      {
        event.preventDefault();
        var gapi=window.gapi;
        gapi.load('client', function () {
            gapi.client.load('drive', 'v3', function (){
              var search =gapi.client.drive.files.list({
                q: "mimeType='application/vnd.google-apps.folder'and name='Bootcampus' and trashed=false"
              }).then((response)=>{
                if (response.result && response.result.files && response.result.files[0]) {

                  var fileMetadata = {
                    'name': state.class_room_name,
                    'parents': [response.result.files[0].id],
                    'mimeType': 'application/vnd.google-apps.folder'
                  };
                  var create = gapi.client.drive.files.create({
                    resource: fileMetadata,
                    fields: 'id'
                  })
                  create.execute (function (res) {
                    addClassroomdet(res.id);
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
                      'name': state.class_room_name,
                      'parents': [res.id],
                      'mimeType': 'application/vnd.google-apps.folder'
                    };
                    var create = gapi.client.drive.files.create({
                      resource: fileMetadata,
                      fields: 'id'
                    })
                    create.execute (function (res) {
                      addClassroomdet(res.id);
                    });
                  })
                }
              }, (error) => {
               console.error(error);
              });
            })
        });    
      }
  }
    function addClassroomdet(classroomFolderId){
          var uniqueId=randomString(6, '#aA');
          const classroomRef = db.collection('classrooms')
          props.onHide();
          classroomRef.where('classId','==',uniqueId).get().then((doc)=>{
            if(doc.empty)
            {
              classroomRef.add({
                syllabus:null,
                classroomdriveFolderId:classroomFolderId,
                notice:{},
                timetable:{},
                classRoomId:uniqueId,
                classRoomName:state.class_room_name,
                section:state.section,
                room:state.room,
                participants:{
                  [userData.uId]:{
                    uId:userData.uId,
                    Dname:userData.Dname,
                    Displaypicture:userData.photoURL,
                    isAuthor:true,
                    isStudent:false,
                    isTeacher:false,
                  }
                },
              }).then(function(docRef) {
                
            }).catch((error)=>console.log(error))
            }else
            {
              addClassroomdet(classroomFolderId);
            }
          })
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
        <TextField id="outlined-basic" name="class_room_name" onChange={handleChange} label="Class Room Name" className="w-100 my-2" variant="outlined" require="true" error={formError}/>
        
        <TextField id="outlined-basic" name="section" onChange={handleChange} label="Section" className="w-100 my-2" variant="outlined" />
        <TextField id="outlined-basic" name="room" onChange={handleChange} label="Room" className="w-100 my-2" variant="outlined" />
        <Button type="submit" onClick={CreateClassroom} variant="contained" color="primary" size="large" className="my-2" disabled={!state.class_room_name}>Create Classroom</Button>
       </form> 
       
      </Modal.Body>
    </Modal>
    )
}

export default CreateClassroom
