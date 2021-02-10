import React,{useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import { Tab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Activity from '../components/Activity';
import Material from '../components/Material';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { useStateValue } from '../StateProvider';
import ClassroomFriendsList from '../components/ClassroomFriendsList';
import TeacherAction from '../components/TeacherAction';



function Classroom() {

    const { classRoomId } = useParams();
    const[{userData,presentClassroom}, dispatch]=useStateValue();
    const [selectedTab, setSelectedtab] = React.useState(2);
    const handleChange = (event, newValue) => {
        setSelectedtab(newValue);
    };

    useEffect(()=>{

        const presentClassroomRef=db.collection("classrooms").doc(classRoomId)
        var unsubscribe = presentClassroomRef.onSnapshot((doc)=>{
            dispatch({
                type:'PRESENT_CLASSROOM_UPDATE',
                item:{
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
                }
                });
                
        })
        return () =>{
            unsubscribe();
        }  
    },[])


    return (
        <div className="timeline-conatiner">
                <Sidebar/>
                <div className="main-container p-0">
                    <div className="class__header p-4">
                        <h2>{presentClassroom?.classRoomName}</h2>
                        <div className="class__header__image">
                            <img src={userData?.photoURL} class="img-fluid img-circle"/>
                            <span></span>
                        </div>
                    </div>
                    <div className="class__menu">
                    <Paper>
                        <Tabs
                            value={selectedTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Activity" />
                            <Tab label="Material" />
                            <Tab label="Friends" />
                        </Tabs>
                    </Paper>
                    {selectedTab==0 && <Activity />}
                    {selectedTab==1 && <Material />}
                    {selectedTab==2 && <ClassroomFriendsList />}
                    
                    {userData.uId && presentClassroom?.participants[userData.uId].isAuthor?(<TeacherAction/>):null
                    }
                    </div>
                </div>
                
        </div>
    )
}

export default Classroom
