import React,{useEffect} from 'react'
import { db } from './firebase'
import Adminsidebar from '../components/Adminsidebar';
import Sidebar from '../components/Sidebar';
import { useStateValue } from '../StateProvider';
import { makeStyles } from '@material-ui/core/styles';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ProfileListcomp from '../components/profileListcomp';

function ProfileList() {
    const[{userData}, dispatch]=useStateValue();
   return(
        <div>
        <div className="timeline-conatiner">
            {userData?.role=="admin" && <Adminsidebar/>}
            {userData?.role=="student" && <Sidebar/>}
            <ProfileListcomp />
        </div>
    </div>
    )
}

export default ProfileList
