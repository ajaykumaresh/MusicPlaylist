import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {createLocalstore,getLocalstore } from '../redux/localstorage/localstorageAction';
import DisplayPlaylist from './displayplaylist'

const Playlist= (props)=>{
 const [localStore,Actionlocalstore]=useState({
     value:[]
 })
 const [pageState,ActionOnPageState]=useState({
    toggle:false,
    selectedPlaylist:""
})
    useEffect(()=>{
        const browserlocalstore=props.responce.playlist.localstorage
        Actionlocalstore({value:browserlocalstore})
    },[props.responce.playlist])

    useEffect(props.getLocalstore,[])

    const HandleChange=(event)=>{
        ActionOnPageState({toggle:true,selectedPlaylist:event.target.name})
    }

  console.log(pageState)
    return(
    <div>
        {pageState.toggle? (<DisplayPlaylist setData={pageState.selectedPlaylist}/>):
        <div>
        <button className="btn btn-primary" onClick={props.addLocalstore}> Add Playlist</button>
         {localStore.value?localStore.value.map((playlist,index)=>{
            return <div className="card row" style={{margin: '5px'}} key={index}>        
            <div className="col-md-4">
            <label><h5>{ playlist.name}</h5></label>
        </div>
        <div className="col-md-12">
        <label><b>Created At : </b>  { playlist.created_at}  </label>
        <button className="btn btn-primary pull-right" name={index} onClick={(e)=>HandleChange(e)}> Add Songs</button>
        </div>
        </div>
        
        }):<div className="card" style={{margin: '5px'}}>Add Your Custom Playlist</div>}
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
        addLocalstore: () =>{dispatch(createLocalstore())},
        getLocalstore: () =>{dispatch(getLocalstore())}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Playlist);