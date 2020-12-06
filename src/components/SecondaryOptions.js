import {useContext} from "react";
import netlifyIdentity from 'netlify-identity-widget';
import { Popover, Whisper, Button } from 'rsuite';
import { BiDotsVerticalRounded } from "react-icons/bi";
import {deleteTask, closeTask} from "../utils/tasks";
import {canDeleteTask} from "../utils/helpers";
import { store } from "../models/store.js";
import { Alert } from 'rsuite';
import {alertDelay} from "../models/settings";

export default function SecondaryOptions(props){
    const { dispatch } = useContext(store);
    const user = netlifyIdentity.currentUser();
    const deleteTaskClicked = (e) => {
        e.preventDefault();
        deleteTask(user,props._id, (data)=>{
            Alert.success(`The task was deleted`, alertDelay)
        });
        dispatch({
            type: "TASK_DELETED",
            payload: props._id,
          });
    };
    const closeTaskClicked = () => {
        closeTask(user,props._id)
    };
    return (
        <div className="SecondaryOptions">
            <Whisper placement="bottom" trigger="click" speaker={
                <Popover title="Actions">
                    {canDeleteTask(user,props.createdBy) && <Button onClick={closeTaskClicked}>Close</Button>}
                    {canDeleteTask(user,props.createdBy) && <Button onClick={deleteTaskClicked}>Delete</Button>}
                </Popover>}>
                    <BiDotsVerticalRounded/>
            </Whisper>
        </div>
    )
}
