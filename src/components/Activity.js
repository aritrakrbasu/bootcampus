import React,{useEffect} from 'react'
import { Button } from '@material-ui/core'
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Drive from './Drive';

function Activity() {
    const[{userData,presentClassroom}, dispatch]=useStateValue();
    function uploadSyllabus(event)
    {   
        event.preventDefault();
        var file=event.target.files[0];
        var metadata = {
            name: 'SYLLABUS',
            mimeType: file.type,
            parents: [presentClassroom.classroomdriveFolderId], // Please set folderId here.
        };
        if(event.target.files[0])
        {
            Drive({
                type: 'UPLOAD_FILE',
                file: file,
                metadata:metadata,
                firebase:{
                    type:'UPDATE',
                    collection:'classrooms',
                    doc:presentClassroom.id,
                    feild:'syllabus'
                }
            }) 
        }
    }
    return (
        <div className="container py-2">
           <div className="online__class__active">
               <h2>Your class is active</h2>
               <Button variant="contained" size="large" color="primary" startIcon={<VoiceChatIcon />} className="p-4">Join Class Now</Button>
           </div>
           <div className="classroom_syllabus__container container">
                <div className="row classroom_syllabus bg1">
                    <div className="col-9">
                        <h2  className="classroom_syllabus_heading"> Classroom Syllabus </h2>
                    </div>
                    <div className="col-3">
                        <img src="/img/syllabus.svg" className="img-fluid"></img>
                    </div>
                </div>
                {
                    presentClassroom?.participants && presentClassroom.participants[userData.uId].isAuthor ?(
                        <div className="row">
                            <Button variant="contained" size="large" className="w-50 p-4 btn-1"  component="label">Upload Syllabus
                            <input
                                type="file"
                                onChange={uploadSyllabus}
                                style={{ display: "none" }}
                            />
                            </Button>
                            {presentClassroom?.syllabus != null && <Button variant="contained" size="large" className="w-50 p-4 btn-2" component={Link} to={presentClassroom?.syllabus} >View Syllabus
                            </Button>}
                            <iframe src={"https://drive.google.com/viewerng/viewer?url="+presentClassroom?.syllabus+"?pid=explorer&efh=false&a=v&chrome=false&embedded=true"} ></iframe>
                            


                        </div>
                    ):null
                }
                
           </div>
        </div>
    )
}

export default Activity
