import {useContext} from "react";
import netlifyIdentity from 'netlify-identity-widget';
import { Button,ButtonToolbar,Alert } from 'rsuite';
import { store } from "../models/store.js";
import {addTask} from "../utils/tasks";
import {alertDelay} from "../models/settings";

export default function AddTask(props){
    const { dispatch,globalState } = useContext(store);
    const user = netlifyIdentity.currentUser();
    console.groupCollapsed("state and user");
    console.log({globalState});
    console.log({user});
    console.groupEnd();
    //const user = netlifyIdentity.currentUser();
    console.log(globalState, dispatch)
    function submit(e){
        e.preventDefault();
        const payload={
            title:e.target.elements.title.value,
            description:e.target.elements.description.value,
            dueAt:new Date(e.target.elements.dueAt.value).getTime()
        }
        addTask(user,payload,data=>{
            e.target.reset();
            Alert.success(`${payload.title} was created`, alertDelay);
            dispatch({
                type:"ADD_TASK",
                payload:data
            })
        })
    }
    return <div className="AddTask">
        <h2>Add Task</h2>
        <form onSubmit={submit}>
            <label>Task
                <input className="rs-input" type="text" required name="title" />
            </label>
            <label>Due Date
                <input className="rs-input" type="date" required name="dueAt" />
            </label>
            <label>Description
                <textarea className="rs-input" name="description"></textarea>
            </label>
            <ButtonToolbar>
                <Button appearance="primary" type="submit">Submit</Button>
                <Button appearance="subtle" type="reset">Reset</Button>
            </ButtonToolbar>
        </form>
    </div>
}