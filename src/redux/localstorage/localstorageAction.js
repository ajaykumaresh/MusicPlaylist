import {REQUEST_FOR_LOADING,GET_PLAYLIST,objectTemplate} from './localstorageType'

//["{"name":"Playlist1","created_at":""}"]
  export const createLocalstore= ()=>{
     return (dispatch)=>{ 
   // localStorage.setItem("Playlists", "Smith");
    let playlist=localStorage.getItem("Playlists");
    if(!playlist) localStorage.setItem("Playlists", "[]");
    playlist=localStorage.getItem("Playlists");
    let localData=JSON.parse(playlist)
    objectTemplate.name=`Playlist${localData.length}`
    objectTemplate.created_at=dateformat()
    localData.push(objectTemplate)
    localStorage.setItem("Playlists", JSON.stringify(localData));
    playlist=localStorage.getItem("Playlists");
    localData=JSON.parse(playlist)
    dispatch(getplaylistResponse(localData))
  }
  }
  export const getLocalstore= ()=>{
    return (dispatch)=>{ 
    let playlist=localStorage.getItem("Playlists");
    let localData=JSON.parse(playlist)
    dispatch(getplaylistResponse(localData))
    }
  }
 

export const LOADING = () =>{
    return {
        type:REQUEST_FOR_LOADING,
    }
}


export const getplaylistResponse= (responce) =>{
    return {
        type:GET_PLAYLIST,
        payload:responce
    }
}

const dateformat=()=>{
const date=new Date()
return date.toISOString()
}