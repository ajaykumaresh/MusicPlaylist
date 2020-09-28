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

    const changeEvent=()=>{
        ActionOnPageState({...pageState,toggle:false})
       props.getLocalstore()
    }
    return(
        <div>
        {pageState.toggle ? (<DisplayPlaylist setData={pageState.selectedPlaylist} onChangeEvent={() => changeEvent()} />) :
            <div>
                <button className="btn btn-primary" onClick={props.addLocalstore} > Add Playlist</button>
                {localStore.value ? localStore.value.map((playlist, index) => {
                    return <div className="card my-3 p-3" key={index}>
                        <div className="d-flex">
                            <div className="mr-auto">
                                <label className="mb-2"><h5 className="font-weight-bold mb-0">{playlist.name}</h5></label><br/>
                                <label className="mb-0"><b>Created At : </b>  {playlist.created_at}  </label>
                            </div>
                            <button className="btn btn-info ml-3 align-self-center" name={index} onClick={(e) => HandleChange(e)}> Add Songs</button>
                        </div>
                    </div>

                }) : <div className="card my-3 p-3">Add Your Custom Playlist</div>}
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