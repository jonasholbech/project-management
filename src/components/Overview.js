import React, { useContext,useState } from "react";
import netlifyIdentity from 'netlify-identity-widget';
import { ButtonToolbar,ButtonGroup, Button } from 'rsuite';
import { store } from "../models/store.js";

import {getAllTasksByUser, getAllTasksForUser, getAllTasks} from "../utils/tasks"

import TaskRow from "./TaskRow";


export default function Overview(props){
    const [loading, setLoading] = useState(false);
    const { globalState, dispatch } = useContext(store);
    const user = netlifyIdentity.currentUser();
    console.groupCollapsed("state and user");
    console.log({user})
    console.log({globalState});
    console.groupEnd();
    const all=(e)=>{
        setLoading(true);
        dispatch({type:"SET_OVERVIEW_FILTER", payload:"all"})
        getAllTasks(user,dispatch, ()=>setLoading(false));
    }
    const assignedTo=(e)=>{
        dispatch({type:"SET_OVERVIEW_FILTER", payload:"assignedTo"})
        setLoading(true);
        getAllTasksForUser(user,dispatch, ()=>setLoading(false));
    }
    const createdBy=(e)=>{
        setLoading(true);
        dispatch({type:"SET_OVERVIEW_FILTER", payload:"createdBy"})
        getAllTasksByUser(user,dispatch, ()=>setLoading(false));
    }
    
    return (
        <section className="Overview">
            <header>
                  <ButtonToolbar>
                    <ButtonGroup>
                        <Button onClick={all} appearance={globalState.overviewFilter==="all" ? "primary":"ghost"}>All</Button>
                        <Button onClick={createdBy}  appearance={globalState.overviewFilter==="createdBy" ? "primary":"ghost"}>Created</Button>
                        <Button onClick={assignedTo} appearance={globalState.overviewFilter==="assignedTo" ? "primary":"ghost"}>Assigned</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </header>
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
                    {loading && (<tr>
                        <td colSpan="6">Loading</td>
                        
                    </tr>)}
                    {!loading && globalState.tasks.map(task=>
                        <TaskRow {...task} key={task._id}/>
                    )}
                    {!loading && globalState.tasks.length===0 && (<td colSpan="6">Nothing to show</td>)}
                </tbody>
            </table>
        </section>
    )
}
