import React from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ShareIcon from '@material-ui/icons/Share';
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import TableChartIcon from '@material-ui/icons/TableChart';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import AddTimeTable from './AddTimeTable';


function TeacherAction() {
    const { classRoomId } = useParams();
    const[{presentClassroom}, dispatch]=useStateValue();
    const [CreateTimeTable, setCreateTimeTableModal] = React.useState(false);
    const modalRef = React.useRef();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function ShareClass(classId)
  {

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
        <div className="teacher__action">
        <SpeedDial
          ariaLabel="SpeedDial example" 
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
            <SpeedDialAction
              icon={ <ShareIcon />}
              onClick={ShareClass(presentClassroom.classRoomId)}
              tooltipTitle="Share"
              tooltipOpen
            ></SpeedDialAction>
            <SpeedDialAction
              icon={<TableChartIcon />}
              tooltipTitle="Add Timetable"
              onClick={()=>setCreateTimeTableModal(true)}
              tooltipOpen
            ></SpeedDialAction>
            <SpeedDialAction
              icon={<AssignmentTwoToneIcon />}
              tooltipTitle="Add Assingment"
              tooltipOpen
            ></SpeedDialAction>
            <SpeedDialAction
              icon={<BookTwoToneIcon />}
              tooltipTitle="Add Lesson"
              tooltipOpen
            ></SpeedDialAction>
            <SpeedDialAction
              icon={<NoteAddTwoToneIcon />}
              tooltipTitle="Add Class"
              tooltipOpen
            ></SpeedDialAction>
            <SpeedDialAction
              icon={<AssignmentTurnedInTwoToneIcon />}
              tooltipTitle="Check Assingment"
              tooltipOpen
            ></SpeedDialAction>
        </SpeedDial>



        <AddTimeTable show={CreateTimeTable} onHide={() => setCreateTimeTableModal(false)} refs={modalRef}/>
    </div>
    )
}

export default TeacherAction
