import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faThumbsUp, faComment, faShareAlt, faShare } from '@fortawesome/free-solid-svg-icons'
import { useStateValue } from '../StateProvider';
function Posts() {
    const[{NewPost,userData}, dispatch]=useStateValue();

    return (
        <div>
        {/* <div className="posts posts__container">
            <div className="row align-items-center post__container__header">
                <div className="col-3 p-4 profile__photo__container">
                        <img src="/img/photo.jpg"/>
                </div>
                <div className="col profile__desc">
                    <h2>Aritra Kumar Basu</h2>
                    <span>2 days</span>
                </div>
                <div className="col-1">
                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <span class="sr-only">Toggle Dropdown</span>
                     </button>
                     <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Delete Post</a>
                    </div>
                </div>
            </div>
            <div className="posts_container_text">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <div className="posts_container_image">
                <img src="/img/banner.jpg" className="img-fluid"/>
            </div>
            <div className="py-2"/>
            <div className="posts_container_actions">
               <div className="row">
                   <div className="col d-flex align-items-center">
                   <FontAwesomeIcon icon={faThumbsUp} size="2x" className="posts_action" />
                   <span>Liked By Aritra Basu and 6 others</span>
                   </div>
                   <div className="col-3 text-right">
                   <FontAwesomeIcon icon={faComment} size="2x" className="posts_action" />
                   <FontAwesomeIcon icon={faShare} size="2x" className="posts_action" />
                   </div>
               </div>
            </div>
            <div className="py-2"/>
        </div> */}
        <div className="posts posts__container">
        <div className="row align-items-center post__container__header">
            <div className="col-3 p-4 profile__photo__container">
                    <img src="/img/photo.jpg"/>
            </div>
            <div className="col profile__desc">
                <h2>Aritra Kumar Basu</h2>
                <span>2 days</span>
            </div>
            <div className="col-1">
                <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <span class="sr-only">Toggle Dropdown</span>
                 </button>
                 <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Delete Post</a>
                </div>
            </div>
        </div>
        <div className="posts_container_text">
            <p>nope</p>
        </div>
        <div className="posts_container_actions">
           <div className="row">
               <div className="col align-items-center d-flex">
               <FontAwesomeIcon icon={faThumbsUp} size="2x" className="posts_action liked" />
                <span>Liked By Aritra Basu and 56 others</span>
               </div>
               <div className="col-3 text-right">
               <FontAwesomeIcon icon={faComment} size="2x" className="posts_action" />
               <FontAwesomeIcon icon={faShare} size="2x" className="posts_action" />
               </div>
           </div>
        </div>
        <div className="py-2"/>
    </div>
    </div>
    );
}
export default Posts;
