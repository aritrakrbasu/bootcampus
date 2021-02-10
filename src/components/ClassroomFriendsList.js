import React,{useEffect} from 'react'
import { useStateValue } from '../StateProvider';

function ClassroomFriendsList() {
    const[{presentClassroom}, dispatch]=useStateValue();

    return (
        <div className="container classroom__friends__list">
            {/* <li></li> */}
            {
                presentClassroom.participants != null ?
                (
                    Object.values(presentClassroom.participants).map((data , index)=>{
                        return (
                        <li className="classroom__friends__list__items" key={index}>
                            <img src={data.Displaypicture} />
                            <div class="desc">
                            {data.Dname}
                                <div class="tags">
                                {
                                    data.isAuthor ?(
                                        <span> Owner</span>
                                    ):
                                    data.isTeacher ?(
                                        <span> Teacher</span>
                                    ): 
                                    data.isStudent ?(
                                        <span> Students</span>
                                    ):null

                                }
                                </div>
                                
                            </div>
                            </li>
                        )
                    })
                )
                :null
            }
        </div>
    )
}

export default ClassroomFriendsList
