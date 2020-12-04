import {useState} from "react";

export default function Completion({assigned}){
    console.log(assigned)
    const [showDetails, setShowDetails] = useState(false);
    
    const total = assigned.length;
    if(total===0){
        return "Not assigned"
    }
    const completed = assigned.filter(a=>a.completed===true).length;
    const notCompletedBy = assigned.filter(a=>a.completed===false).map(a=>a.initials).join(", ")
    if(showDetails){
        return (
            <div onClick={()=>setShowDetails(false)}>Not completed:<br />{notCompletedBy}</div>
        )
    } else {
        return (
            <progress onClick={()=>setShowDetails(true)} value={completed} max={total} title={`Not completed by ${notCompletedBy}`}> TODO </progress>
        )
    }
    
    
    
}