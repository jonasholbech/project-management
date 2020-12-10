import {useContext} from "react";
import { store } from "../models/store.js";
//import netlifyIdentity from 'netlify-identity-widget';
import AssigneeForm from "./AssigneeForm";

export default function Task(props){
    const { globalState,dispatch } = useContext(store);
    //const user = netlifyIdentity.currentUser();

    const thisId = props.match.params.id;
    const thisTask = globalState.tasks.find(el=>el._id===thisId);
    
    return <div className="Task">
        <p className="titleLabel">Task</p>
        <h1>{thisTask.title}</h1>
        <p>by {thisTask.createdBy}</p>
        <section className="description">{thisTask.description}</section>
        <AssigneeForm {...thisTask}/>
    </div>
}