import {GET_PLAYLIST} from './localstorageType'
const InitialValue={
    localstorage:[]
}

const localstorageReducer= (state=InitialValue,action)=>{
     console.log(action)
      switch(action.type){
           case GET_PLAYLIST:
               return{
                ...state,
                localstorage:action.payload
               }
          default :
          return state
      }  
  }
  
export default localstorageReducer;