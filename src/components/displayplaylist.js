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
   ActiontoSelectedData({...selectedData,currentData:{...selectedData.currentData,songs:shuffleData}})
}
const changeEvent=()=>{
    ActiontoSelectedData({...selectedData,toggle:false})
   props.getLocalstore()
}



return (
    <div>
    {selectedData.toggle ? <Allsongs currentItem={selectedData} onChangeEvent={() => changeEvent()} /> :
        <div className="p-3 border rounded">
            <div className="d-flex">
                <button className="btn btn-primary" onClick={() => props.onChangeEvent()}> Back </button>
                <label className="mr-auto ml-2 align-self-center mb-0"><h5 className="mb-0 font-weight-bold">{selectedData.currentData.name}</h5></label>
                <button className="btn btn-primary mx-2" onClick={shuffleOrder}> Shuffle Order </button>
                <button className="btn btn-primary" onClick={HandleChange}> Add Songs</button>
            </div>

            {
                selectedData.currentData.songs.length ? selectedData.currentData.songs.map((songs, index) => {
                    return <div className="card p-3 my-3" key={index}>
                        <div className="d-flex">
                        <img src={songs.thumbnailUrl} alt="thumbnail" className="card-image" />
                            <div className="mr-auto px-3">
                                <label><b>Song Name : </b> {songs.title}</label> <br/>
                                <label><b>Album Name : </b> {songs.albumName}</label><br/>
                                <label className="mb-0"><b>Created At : </b>  {songs.created_at}  </label>
                            </div>
                            <button className="btn btn-danger ml-3 align-self-start" onClick={(e) => deleteSong(e)} name={index}>Delete</button>
                        </div>
                    </div>
                })

                    : <div className="mt-3">Add Your Custom Songs</div>
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