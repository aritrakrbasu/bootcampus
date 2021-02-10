import React,{createRef,useState} from 'react'
import { db } from '../routes/firebase';
import { useStateValue } from '../StateProvider';
import Posts from './Posts';

function PostUpdate() {
    let textInput = React.createRef();
    const[{userData}, dispatch]=useStateValue();
    const [newPost, setNewPost] = useState(false);
    const [newPostData, setNewPostData] = useState({});

function handleChange() {
        textInput.current.style.height = 'auto'; 
        textInput.current.style.height =  
        (textInput.current.scrollHeight) + 'px'; 
}
function addPost()
{
    var postData = textInput.current.value
    textInput.current.value="";
    var postRef=db.collection('posts')
    var postObject ={
        uId:userData.uId,
        Data:postData,
        createdAt:new Date()
    }
    postRef.add(postObject).then(function(docRef) {
        setNewPost(true);
        dispatch({
            type:'NEW_POST_UPDATE',
            item:postObject,
        });
        setNewPostData(postObject)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}
    return (
        <div className="main-container">
              <div className="row whats__on__mind my-4">
            <div className="col-3 p-4 profile__photo">
                <img src={userData.photoURL}/>
            </div>
            <div className="col">
                <textarea className="whats__on__mind__textarea" 
                placeholder="What's on your mind ?"
                ref={textInput}
                onChange={handleChange}
                ></textarea>
            </div>
            <div className="col-2">
            <button className="btn post__btn" onClick={addPost}>POST</button>
            </div>
        </div>
        {newPost &&  <Posts/>}
       
        </div>
    )
}

export default PostUpdate
