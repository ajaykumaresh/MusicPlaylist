import React, { useEffect, useState } from 'react';
import Allsongs from './allsongs'
import {connect} from 'react-redux';
import {getLocalstore } from '../redux/localstorage/localstorageAction';

const DisplayPlaylist= (props)=>{
useEffect(props.getLocalstore,[])
const [selectedData,ActiontoSelectedData]=useState({
currentIndex:"",
editpage:true,
toggle:false,
})
useEffect(()=>{
   let selectedItem= props.responce.playlist.localstorage[props.setData] 
   ActiontoSelectedData({...selectedData,currntIndex:selectedItem})
},[props.responce.playlist])

const HandleChange=()=>{
    ActiontoSelectedData({...selectedData,toggle:true})
}

return (
<div>
    {selectedData.toggle?<Allsongs currentItem={selectedData}/> :
 <div> 
<button className="btn btn-primary"> Shuffle Order </button>
<button className="btn btn-primary" onClick={HandleChange}> Add Songs</button>
{
    selectedData.songs? selectedData.songs.map((songs,index)=>{
        return <div className="card row" style={{margin: '5px'}} key={index}>        
            <div className="col-md-4">
                <label><h5>{ songs.name}</h5></label>
            </div>
            <div className="col-md-12">
                <label><b>Created At : </b>  { songs.created_at}  </label>
                {/* <button className="btn btn-primary pull-right" name={playlist.name} onClick={(e)=>HandleChange(e)}> Add Songs</button> */}
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
        getLocalstore: () =>{dispatch(getLocalstore())}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayPlaylist);