import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {getAlbum,getSongs } from '../redux/musicAction'
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
    // normal for loog used due to synchronous process
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
        console.log(selectedSong)
    }



    return(
        <div>
            <input 
            className="form-control form-control-lg"
            type="text"
            name="inputValue"
            placeholder="Enter song title to Search.."
            onChange={(e)=>handleChange(e)} 
            value={PageState.inputValue}
            ></input>
            {ProcessedData.SelectedArray.length ? ProcessedData.SelectedArray.map((Selecteditems)=>{
                      return <div className="card row" style={{margin: '5px'}} key={Selecteditems.id}>
                        
                            <div className="col-md-3">
                            <img src={ Selecteditems.thumbnailUrl} alt="thumbnail" / >
                        </div>
                        <div className="col-md-12">
                        <label>Album :</label> <p>{ Selecteditems.albumName}</p>
                       
                        </div>
                        <div className="col-md-12">
                        <label>Song :</label> <p>{ Selecteditems.title}</p>
                        {PageState.editable? <button className="btn btn-primary" name={Selecteditems.id} onClick={(e)=>{addToPlaylist(e)}}> Add To Playlist </button>:null}
                        </div>
                      </div>
            }): <div className="card" style={{margin: '5px'}}>{PageState.errordisplay} </div>}
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
        getSongs: () =>{dispatch(getSongs())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Allsongs);