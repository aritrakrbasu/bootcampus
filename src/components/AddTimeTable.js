import React from 'react'
import { Button, TextField, FormControlLabel } from '@material-ui/core'
import { Modal } from 'react-bootstrap'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Checkbox from '@material-ui/core/Checkbox';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
function AddTimeTable(props) {
  const [days, setDays] = React.useState(() => []);
  const [state, setState] = React.useState({
    subject_name: "",
    subject_code:"",
    start_time:"",
    end_time:"",
  })
  const handleFormat = (event, newDays) => {
    setDays(newDays);
  };

    function handleChange(evt)
    {
      setState({
        ...state,
        [evt.target.name]: evt.target.value
      });
    }
    function joinClassroom()
    {}

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <form autoComplete="off">
          <TextField id="outlined-basic" name="subject_name" onChange={handleChange} label="Subject Name" className="w-100 my-2" variant="outlined" require="true" />
          <TextField id="outlined-basic" name="subject_code" onChange={handleChange} label="Subject Code" className="w-100 my-2" variant="outlined" require="true" />
          <TextField
            id="time"
            label="Start Time"
            type="time"
            className="w-25 my-2"
            name="start_time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <TextField
            id="time"
            label="End Time"
            type="time"
            className="w-25 m-2"
            name="end_time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <br />
          <ToggleButtonGroup value={days} onChange={handleFormat} aria-label="text formatting" className="days__selector my-2">
              <ToggleButton value="mon" aria-label="monday">
                Mon
              </ToggleButton>
              <ToggleButton value="tue" aria-label="tuesday">
                Tue
              </ToggleButton>
              <ToggleButton value="wed" aria-label="wednessday">
                Wed
              </ToggleButton>
              <ToggleButton value="thu" aria-label="thursday">
                Thu
              </ToggleButton>
              <ToggleButton value="fri" aria-label="friday">
                Fri
              </ToggleButton>
              <ToggleButton value="sat" aria-label="saturday">
                Sat
              </ToggleButton>
              <ToggleButton value="sun" aria-label="sunday" color="primary">
                Sun
              </ToggleButton>
            </ToggleButtonGroup>
            <br/>
          <Button type="submit" onClick={joinClassroom} variant="contained" color="primary" size="large" className="my-2">Preview Timetable</Button>
         </form> 
         {
           days !=null ?(
           days.map((data)=>{
              return(<li>{data}</li>)
            })
           ):null
          }
           
        </Modal.Body>
      </Modal>
    )
}

export default AddTimeTable
