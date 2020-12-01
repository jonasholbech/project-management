import React, {  useContext, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
//import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";

export default function Overview(props){
    const { globalState } = useContext(store);
    //const [state,send] = useContext(MachineContext);
    function pad(num){
        return String(num).padStart(2,'0');
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Added</th>
                    <th>Description</th>
                    <th>Due</th>
                    <th>Completion</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {globalState.tasks.map(task=>{
                let added = new Date(task.addedAt);
                added = `${pad(added.getDate())}/${pad(added.getMonth())} ${pad(added.getHours())}:${pad(added.getMinutes())}`
                return (
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{added}</td>
                        <td>{task.description}</td>
                        <td>{task.dueAt}</td>
                        <td className="progress"><Completion assigned={task.assigned}/></td>
                        <td className="actions"><BiDotsVerticalRounded /></td>
                    </tr>)
            })}
            </tbody>
        </table>
    )
}
function Completion({assigned}){
    const [showDetails, setShowDetails] = useState(false);
    
    const total = assigned.length;
    if(total===0){
        return "Not assigned"
    }
    const completed = assigned.filter(a=>a.completed===true).length;
    const notCompletedBy = assigned.filter(a=>a.completed===false).map(a=>a.initials).join(",")
    if(showDetails){
        return (
            <div onClick={()=>setShowDetails(false)}>Not completed:<br />{notCompletedBy}</div>
        )
    } else {
        return (
            <progress onClick={()=>setShowDetails(true)} value={completed} max={total} title={`Not completed by ${notCompletedBy}`}> 32% </progress>
        )
    }
    
    
    
}