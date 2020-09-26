import {GET_PLAYLIST,ADDSONGS} from './localstorageType'
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
               case ADDSONGS:
                   return state
          default :
          return state
      }  
  }
  
export default localstorageReducer;