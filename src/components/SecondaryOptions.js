import {useContext} from "react";
import { Popover, Whisper, Button } from 'rsuite';
import { BiDotsVerticalRounded } from "react-icons/bi";
import {deleteTask} from "../utils/tasks";
import { store } from "../models/store.js";

export default function SecondaryOptions(props){
    const { dispatch } = useContext(store);
    return (
        <div className="SecondaryOptions">
            <Whisper placement="bottom" trigger="click" speaker={
                <Popover title="Actions">
                    <Button onClick={()=>{deleteTask(props._id, dispatch)}}>Delete</Button>
                </Popover>}>
                    <BiDotsVerticalRounded/>
            </Whisper>
        </div>
    )
}
