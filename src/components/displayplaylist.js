import React, { useEffect, useState } from 'react';
import Allsongs from './allsongs'
import {connect} from 'react-redux';
import {getLocalstore,deletePlaylistSongs } from '../redux/localstorage/localstorageAction';

const DisplayPlaylist= (props)=>{
useEffect(props.getLocalstore,[])
const [selectedData,ActiontoSelectedData]=useState({
currentIndex:"",
currentData:{songs:[]},
editpage:true,
toggle:false,
})
useEffect(()=>{
   let selectedItem= props.responce.playlist.localstorage[props.setData] 
   ActiontoSelectedData({...selectedData,currentIndex:props.setData,currentData:selectedItem})
},[props.responce.playlist])

const HandleChange=()=>{
    ActiontoSelectedData({...selectedData,toggle:true})
}
const deleteSong =(e)=>{
    props.deletePlaylistSong(selectedData.currentIndex,e.target.name)
}

const shuffleOrder=()=>{
   let shuffleData= selectedData.currentData.songs.sort( () => Math.random() - 0.5)
   ActiontoSelectedData({...selectedData,currentData:{songs:shuffleData}})
}
const changeEvent=()=>{
    ActiontoSelectedData({...selectedData,toggle:false})
   props.getLocalstore()
}



return (
<div>
    {selectedData.toggle?<Allsongs currentItem={selectedData} onChangeEvent={()=>changeEvent()}/> :
 <div> 
     
<button className="btn btn-primary" onClick={()=>props.onChangeEvent()}> Back </button>
<button className="btn btn-primary" onClick={shuffleOrder}> Shuffle Order </button>
<button className="btn btn-primary" onClick={HandleChange}> Add Songs</button>
<label><b>{selectedData.currentData.name}</b></label>
{
    selectedData.currentData.songs.length? selectedData.currentData.songs.map((songs,index)=>{
        return <div className="card row" style={{margin: '5px'}} key={index}>        
            <div className="col-md-6">
                <label><b>Song Name : </b> { songs.title}</label>
                <label><b>Album Name : </b> { songs.albumName}</label>
            </div>
            <div className="col-md-12">
                <label><b>Created At : </b>  { songs.created_at}  </label>
                 <button className="btn btn-primary pull-right" onClick={(e)=>deleteSong(e)} name={index}>Delete Songs</button> 
            </div>
        </div>
    }) 
    
    : <div>Add Your Custom Songs</div>
}
</div>  
}
</div>
)
}


const mapStateToProps =state=>{
    return {
        responce:state
    }
}

const mapDispatchToProps =dispatch=>{
    return {
        getLocalstore: () =>{dispatch(getLocalstore())},
        deletePlaylistSong:(playlistIndex,songIndex)=>{dispatch(deletePlaylistSongs(playlistIndex,songIndex))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayPlaylist);