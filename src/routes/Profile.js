import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Posts from '../components/Posts';
import MessagePannel from '../components/MessagePannel';
import Brandlogo from '../components/Brandlogo';
import { Button } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { db } from './firebase';
import Snackbar from '@material-ui/core/Snackbar';
function Profile() {
    let { profileid } = useParams();
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message:'null',
      });
      const { vertical, horizontal, open } = state;

      const handleClose = () => {
        setState({ ...state, open: false });
      };

    const[{userData}, dispatch]=useStateValue();
    function SendForeVerification()
    {
        
        if(userData.uId!='')
        {
            const newrequestref=db.collection('admin_newrequest');
            newrequestref.where('uId','==',userData.uId).get().then((doc)=>{
                if(doc.empty)
                {
                    newrequestref.add(userData).then(function(docRef) {
                        setState({ open: true, vertical: 'bottom', horizontal: 'right',message: 'Applied for profile verification'  });
                    }).catch((error)=>console.log(error))
                }else
                {
                    setState({ open: true, vertical: 'bottom', horizontal: 'right',message: 'Already applied for verification'  });   
                }
            })
            
        }
    }
  return (
    <div className="profile">
        <div className="container-fluid">
            
            <div className="row">

                <div className="col-lg-3 try">
                    <Brandlogo/>
                    <div className="profile__section">
                        <div className="profile__photo">
                            <img 
                            src={userData?.photoURL}
                            draggable="false" 
                            alt="profile--photo"
                            />
                        </div>
                        <center>
                        <button className="btn update__profile" onClick={SendForeVerification}>
                                Verify Profile
                        </button>
                        <Snackbar
                          autoHideDuration={2000}
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message={state.message}
                        key={vertical + horizontal}
                    />
                        </center>
                        <div className="profile__about">
                            <h1 className="profile__about__name verified">{userData.Dname}</h1>
                            
                            <p className="profile__about__bio">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="profile__activities">
                            <h2 className="profile__activities__header">Achievements</h2>
                            <li className="profile__activities__list__item">Web Designer at <span>Basu infotech</span> from 01/20/20 to 30/60/40</li>
                            <li className="profile__activities__list__item">Web Designer at <span>Basu infotech</span> from 01/20/20 to 30/60/40</li>
                            <li className="profile__activities__list__item">Web Designer at <span>Basu infotech</span> from 01/20/20 to 30/60/40</li>
                           
                        </div>
                    </div>
                    
                </div>
                <div className="col-lg-7">
                        <div className="header py-4">
                            <div className="row">
                                <div className="col-3">
                                    <a href="#"><span> &#8592;</span> Back to Timeline</a>
                                </div>
                                <div className="col text-right search__box">
                                    <div className="input-group mb-2">
                                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search" />
                                        <div className="input-group-prepend">
                                        <div className="input-group-text">&#128269;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main__posts__container">
                            <div className="row whats__on__mind my-4">
                                <div className="col-3 p-4 profile__photo">
                                    <img src="/img/photo.jpg"/>
                                </div>
                                <div className="col">
                                    <textarea className="whats__on__mind__textarea" placeholder="What's on your mind ?"></textarea>
                                </div>
                                <div className="col-2">
                                   <button className="btn post__btn">POST</button>
                                </div>
                            </div>
                            {/* Classrooms */}
                            <div className="highlights__container my-4">
                                <div className="highlights__container__header">
                                    <h2 className="highlights__container__header__text">Classrooms</h2>
                                    <a href="#" className="highlights__container__header__link">See all </a>
                                </div>
                                
                                <div className="container">
                                    <div className="row highlights__items__container">
                                        <div className="col-2 px-2 highlights__items">
                                           <img src="/img/1.jpg" className="img-fluid"/>
                                           <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/2.jpg" className="img-fluid"/>
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/3.jpg" className="img-fluid"/>   
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/4.jpg" className="img-fluid"/>
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/4.jpg" className="img-fluid"/>
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/4.jpg" className="img-fluid"/>
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Groups */}
                            <div className="highlights__container my-4">
                                <div className="highlights__container__header">
                                    <h2 className="highlights__container__header__text">Groups</h2>
                                    <a href="#" className="highlights__container__header__link">See all </a>
                                </div>
                                
                                <div className="container">
                                    <div className="row highlights__items__container">
                                        <div className="col-2 px-2 highlights__items">
                                           <img src="/img/1.jpg" className="img-fluid"/>
                                           <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/2.jpg" className="img-fluid"/>
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/3.jpg" className="img-fluid"/>   
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/4.jpg" className="img-fluid"/>
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/4.jpg" className="img-fluid"/>
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                        <div className="col-2 px-2 highlights__items">
                                            <img src="/img/4.jpg" className="img-fluid"/>
                                            <div class="highlights__item__description">
                                           <span>Datastructure & algorithm</span>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Posts container */}
                           <Posts />
                        </div>
                        
                </div>
                <div className="col-lg-2">
                    <MessagePannel />
                </div>
            </div>

        </div>
    </div>
  );
}

export default Profile;
