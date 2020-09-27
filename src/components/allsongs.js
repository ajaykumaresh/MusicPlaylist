import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {getAlbum,getSongs } from '../redux/musicAction';
import {addSongsLocalstore } from '../redux/localstorage/localstorageAction';

const Allsongs= (props)=>{
    const [DisplayData,ActionToDispalay]=useState({})
    const [ProcessedData,ActionToProsses]=useState({
        SelectedArray:[]
    })
    const [PageState,ActionToPageState]=useState({
        inputValue:"",
        editable:false,
        errordisplay:'Loading on your request...'
    })
    useEffect(props.getAllbum,[]);
    useEffect(props.getSongs,[])
    useEffect(()=>{
        ActionToDispalay(props.responce.songs)
        //if user comes from playlist to add song
        if(props.currentItem) {
            let pageContent={...PageState, editable:true}
            ActionToPageState(pageContent)
        }
       if(DisplayData.album && DisplayData.songs) processAllbumData(DisplayData)       
    },[props.responce,DisplayData])

    // need to match songs id with albumid
    // normal for loop used due to synchronous process
    const processAllbumData=(DisplayData)=>{
        let AlbumObject={};
        let {album,songs}=DisplayData
        for (let i=0;i<album.length;i++){
            let dynamickey=album[i]['id']
            AlbumObject={
                ...AlbumObject,
                [dynamickey]:album[i]['title']
            }
        }
        for (let j=0;j<100;j++){
            let songAlbumKey=songs[j]['albumId'];
            if(AlbumObject[songAlbumKey]) songs[j]['albumName']=AlbumObject[songAlbumKey]
        }
         let processArray={...songs,SelectedArray:songs,DisplayArray:songs}
            ActionToProsses(processArray) 
        return songs
        
    }

    const handleChange=(event)=>{
        let modifiedObject={...PageState,[event.target.name]:event.target.value};
        let value=modifiedObject.inputValue
        ActionToPageState(modifiedObject)
        let filteredArray=ProcessedData.DisplayArray.filter(dataToBe=>dataToBe.title.startsWith(value));
        ActionToProsses({...ProcessedData,SelectedArray:filteredArray}) 
        if(!filteredArray.length) ActionToPageState({...PageState,errordisplay:"No Songs Found",[event.target.name]:event.target.value})
    }
    // for adding songs to selected play list
    const addToPlaylist=async (event)=>{
        let selectedId=event.target.name
        let selectedSong=await ProcessedData.SelectedArray.filter(dataToBe=>dataToBe.id===Number(selectedId));
        await props.addSongs(props.currentItem.currentIndex,selectedSong)
        props.onChangeEvent()
    }



    return(
        <div>
        <input
            className="form-control form-control-lg"
            type="text"
            name="inputValue"
            placeholder="Enter song title to Search.."
            onChange={(e) => handleChange(e)}
            value={PageState.inputValue}
        ></input>
        {ProcessedData.SelectedArray.length ? ProcessedData.SelectedArray.map((Selecteditems) => {
            return <div className="card p-3 my-3" key={Selecteditems.id}>
                <div className="d-flex">
                    <img src={Selecteditems.thumbnailUrl} alt="thumbnail" className="card-image" />
                    <div className="mr-auto  px-3">
                        <label className="mb-0 font-weight-bold">Album :</label>
                        <div className="mb-2">{Selecteditems.albumName}</div>
                        <label className="mb-0 font-weight-bold">Song :</label>
                        <div>{Selecteditems.title}</div>
                    </div>
                    {PageState.editable ? <button className="btn btn-primary ml-3 align-self-start" name={Selecteditems.id} onClick={(e) => { addToPlaylist(e) }}> Add To Playlist </button> : null}
                </div>
            </div>
        }) : <div className="card my-3 p-3 text-center font-weight-bold">{PageState.errordisplay} </div>}
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
        getAllbum: () =>{dispatch(getAlbum())},
        getSongs: () =>{dispatch(getSongs())},
        addSongs: (index,songs)=>{dispatch(addSongsLocalstore(index,songs))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Allsongs);