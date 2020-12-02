import {useState, useContext} from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {deleteTask} from "../utils/tasks";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";


import {Link} from 'react-router-dom';

export default function SecondaryOptions(props){
    const [showInner, setShowInner] = useState(props.open);
    const { dispatch } = useContext(store);
    const [,send] = useContext(MachineContext);
    //TODO: click on outside closes popup (så skal det være sin egen lille comp, så den "mounter" og kan bruge useEffects cleanup)
    return (
        
        <div className="SecondaryOptions">
        <BiDotsVerticalRounded onClick={()=>setShowInner(!showInner)}/>
            <div className="inner" style={{display:showInner ? "flex":"none"}}>
                <button onClick={()=>{deleteTask(props._id, dispatch, send)}}>Delete</button>
                <Link to={`/task/${props._id}`}>Assign</Link>
                
            </div>
        </div>
    )
}
