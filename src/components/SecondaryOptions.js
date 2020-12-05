import {useContext} from "react";
import netlifyIdentity from 'netlify-identity-widget';
import { Popover, Whisper, Button } from 'rsuite';
import { BiDotsVerticalRounded } from "react-icons/bi";
import {deleteTask} from "../utils/tasks";
import {canDeleteTask} from "../utils/helpers";
import { store } from "../models/store.js";

export default function SecondaryOptions(props){
    const { dispatch } = useContext(store);
    const user = netlifyIdentity.currentUser();
    return (
        <div className="SecondaryOptions">
            <Whisper placement="bottom" trigger="click" speaker={
                <Popover title="Actions">
                    {canDeleteTask(user,props.createdBy) && <Button onClick={()=>{deleteTask(user,props._id, dispatch)}}>Delete</Button>}
                </Popover>}>
                    <BiDotsVerticalRounded/>
            </Whisper>
        </div>
    )
}
