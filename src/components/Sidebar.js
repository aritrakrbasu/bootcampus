import React from 'react'
import { Link } from 'react-router-dom'
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import ClassTwoToneIcon from '@material-ui/icons/ClassTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Brandlogo from './Brandlogo';

function Sidebar() {
    return (
        <div className="nav sidebar">
            <div className="container">
            <Brandlogo />
            </div>
           <ul>
               <li>
                   
                    <Link to="/timeline">
                    <HomeTwoToneIcon fontSize="large"/>
                    <span>Home</span>
                    </Link>                
                </li>
                <li>
                   
                    <Link to={'/profile/'+localStorage.getItem('uid')}>
                    <FaceTwoToneIcon fontSize="large"/>
                    <span>Profile</span>
                    </Link>                
                </li>
                <li>
                   
                    <Link to="/explore">
                    <SearchTwoToneIcon fontSize="large"/>
                    <span>Explore</span></Link>                
                </li>
                <li>
                    <Link to="/classrooms">
                    <ClassTwoToneIcon fontSize="large"/>
                    <span>Classrooms</span>
                    </Link>                
                </li>
                <li>
                    <Link to="/groups">
                    <PeopleAltTwoToneIcon fontSize="large"/>
                    <span>Groups</span>
                    </Link>                
                </li>
           </ul>
            
        </div>
    )
}

export default Sidebar
