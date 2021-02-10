import {db} from './routes/firebase'
export const initialState={
   name:'aritrabasu',
   GoogleAuthToken:'',
   ClassroomList:[],
   presentClassroom:{
    participants:null
   },
   userData:{
       uId:''
   }
};

function reducer(state,action)
{
    switch(action.type){
        case 'USER_SIGN_UP':
              return {...state, userData:action.item};
        case 'NEW_POST_UPDATE':
            return {...state,NewPost:action.item}
        case 'CLASSROOM_LIST_UPDATE':
            return {...state,ClassroomList:action.item}    
        case  'ADD_GOOGLE_AUTH_TOKEN':
            return{...state,GoogleAuthToken:action.item}
        case  'PRESENT_CLASSROOM_UPDATE':
            return{...state,presentClassroom:action.item}
        default:
            return { ...state};
    }
}

export default reducer