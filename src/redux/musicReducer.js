import {GET_ALBUM,GET_SONG} from './musicType'
const InitialValue={
    loader:false
}

const musicReducer= (state=InitialValue,action)=>{
      switch(action.type){
          case 'LOADING':
            return{
                ...state,
                loader:true,
            }
           
          case GET_ALBUM: 
            return{
                ...state,
                album:action.payload,
                loader:false,
                
            }
  
          case GET_SONG:
            return{
                ...state,
                songs:action.payload,
                loader:false, 
            }
              
          default :
          return state
      }  
  }
  
export default musicReducer;