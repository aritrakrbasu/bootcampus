import React from 'react'
import Sidebar from '../components/Sidebar'
import TimelineComp from '../components/TimelineComp'
import Classroomlist from '../components/Classroomlist'
import { ButtonGroup, Button } from '@material-ui/core'
import CreateClassroom from '../components/CreateClassroom'
import JoinClassrooms from '../components/JoinClassroom'

function Classrooms() {
    const [createClassroomShow, setCreateClassroomModal] = React.useState(false);
    const [joinClassroomShow, setJoinClassroomModal] = React.useState(false);
    const modalRef = React.useRef();
    return (
        <div className="timeline-conatiner">
                <Sidebar/>
                <div className="main-container">
                <ButtonGroup size="small" color="primary" className="my-4">
                <Button  variant="contained" onClick={() => setCreateClassroomModal(true)}>Create A classroom</Button>

                <Button onClick={() => setJoinClassroomModal(true)}>Join A classroom</Button>
                <CreateClassroom show={createClassroomShow} onHide={() => setCreateClassroomModal(false)} refs={modalRef}/>
                <JoinClassrooms show={joinClassroomShow} onHide={() => setJoinClassroomModal(false)} refs={modalRef}/>
                 </ButtonGroup >
                <Classroomlist />
                </div>
                
        </div>
    )
}

export default Classrooms
