import React, { useContext } from "react";


import { store } from "../models/store.js";
import netlifyIdentity from 'netlify-identity-widget';

import TaskRow from "./TaskRow";
export default function Overview(props){
    const { globalState } = useContext(store);
    const user = netlifyIdentity.currentUser();
    console.groupCollapsed("state and user");
    console.log({user})
    console.log({globalState});
    console.groupEnd();
    
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
