import React, { useContext } from "react";


import { store } from "../models/store.js";
import netlifyIdentity from 'netlify-identity-widget';

import {useState} from "react";
import TaskRow from "./TaskRow";
import { Toggle } from 'rsuite';

export default function Overview(props){
    const [individual, setIndividual] = useState(false);
    const { globalState } = useContext(store);
    const user = netlifyIdentity.currentUser();
    console.groupCollapsed("state and user");
    console.log({user})
    console.log({globalState});
    console.groupEnd();
    const toggleIndividual=e=>{
        
    }
    return (
        <>
        <p>Show only my tasks <Toggle defaultChecked={individual} onChange={toggleIndividual} /></p>
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
        </>
    )
}
