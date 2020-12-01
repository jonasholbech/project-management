import React, { useContext } from "react";

//import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import netlifyIdentity from 'netlify-identity-widget';

import TaskRow from "./TaskRow";
export default function Overview(props){
    const { globalState } = useContext(store);
    //const [state,send] = useContext(MachineContext);
    const user = netlifyIdentity.currentUser();
    console.log(user)
    
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
            {globalState.tasks.map(task=>
                <TaskRow {...task} key={task._id}/>
            )}
            </tbody>
        </table>
    )
}
