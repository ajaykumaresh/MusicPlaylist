import {GET_ALBUM,GET_SONG,REQUEST_FOR_LOADING} from './musicType'
import axios from 'axios'


export const getAlbum = () =>{
  return (dispatch)=>{
      dispatch(LOADING)
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response=>{
          console.log(response.data)
          dispatch(albumResponse(response.data))
      })
      .catch(err=>{
        console.error(err) 
      })
  }
}

export const getSongs = () =>{
    return (dispatch)=>{
        dispatch(LOADING)
      axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(response=>{
           
            let processdata=response.data.slice(4750,response.data.length)
            console.log(processdata)
            dispatch(songsResponse(processdata))
        })
        .catch(err=>{
          console.error(err) 
        })
    }
  }

 export const songsResponse = (responce) =>{
    return {
        type:GET_SONG,
        payload:responce
    }
}

export const albumResponse = (args) =>{
    return {
        type:GET_ALBUM,
        payload:args
    }
}

export const LOADING = () =>{
    return {
        type:REQUEST_FOR_LOADING,
    }
}