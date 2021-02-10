import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { db } from '../routes/firebase';

function ProfileListcomp() {
    const [state, setState] = React.useState({
       profiles:[],
      });
    
      const handlerolechange = (event,newRole) => {
        if (newRole !== null) {
            const profileId=event.currentTarget.name;
            const newRole=event.currentTarget.value
             
            const profilesref = db.collection('profile').doc(profileId);
            profilesref.update({role:newRole})

        }
      };
    
    useEffect(() => {
        const profilesref = db.collection('profile');
        profilesref.onSnapshot(function(querySnapshot) {
            var profiles=[];
            querySnapshot.forEach(function(doc) {
                profiles.push(doc.data())
                setState({ ...state, profiles: profiles });
            });
        });
        
    },[])
    
    return (
            <div className="container py-4">
               <h1 className="page__headings">Profiles</h1>
               <div className="profile__lists">
                    {state.profiles.map((profile)=>{
                        return(
                            <div className="profile__lists_item" key={profile.uId}>
                        <div className="row">
                            <div className="col-2">
                                <div className="profile__image">
                                    <img src={profile.photoURL} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="profile__details">
                                   <h2>{profile.Dname}</h2>
                                </div>
                                <ToggleButtonGroup
                                value={profile.role}
                                exclusive
                                onChange={(e) => {handlerolechange(e)}}
                                aria-label="text alignment"
                            >
                                    <ToggleButton value="student" name={profile.uId} aria-label="left aligned">
                                        <FaceTwoToneIcon />
                                    </ToggleButton>
                                    <ToggleButton value="teacher" name={profile.uId} aria-label="centered">
                                        <LocalLibraryTwoToneIcon />
                                    </ToggleButton>
                                    <ToggleButton value="admin" name={profile.uId} aria-label="right aligned">
                                        <VerifiedUserTwoToneIcon />
                                    </ToggleButton>
                            </ToggleButtonGroup>
                            </div>
                            {/* <div className="col-1 block__menu">
                                <ToggleButtonGroup
                                value={alignment}
                                exclusive
                                onChange={handleAlignment}
                                className="red-select"
                                aria-label="text alignment"
                             >
                            <ToggleButton value="blocked" aria-label="left aligned">
                            <BlockTwoToneIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                            </div> */}
                        </div>
                    </div>
                        )
                    })}
               </div>
            </div>
    )
}

export default ProfileListcomp
