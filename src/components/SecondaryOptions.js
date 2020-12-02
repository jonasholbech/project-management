import {useState, useContext} from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {deleteTask} from "../utils/tasks";
import { store } from "../models/store.js";

export default function SecondaryOptions(props){
    const [showInner, setShowInner] = useState(props.open);
    const { dispatch } = useContext(store);

    //TODO: click on outside closes popup (så skal det være sin egen lille comp, så den "mounter" og kan bruge useEffects cleanup)
    return (
        
        <div className="SecondaryOptions">
        <BiDotsVerticalRounded onClick={()=>setShowInner(!showInner)}/>
            <div className="inner" style={{display:showInner ? "flex":"none"}}>
                <button onClick={()=>{deleteTask(props._id, dispatch)}}>Delete</button>
            </div>
        </div>
    )
}
