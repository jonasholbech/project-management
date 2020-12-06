import Completion from "./Completion";
import SecondaryOptions from "./SecondaryOptions";
import {Link} from 'react-router-dom';

export default function TaskRow(props){
    function pad(num){
        return String(num).padStart(2,'0');
    }
    let added = new Date(props.addedAt);
    added = `${pad(added.getDate())}/${pad(added.getMonth()+1)} ${pad(added.getHours())}:${pad(added.getMinutes())}`
    let due = new Date(props.dueAt);
    due = `${pad(due.getDate())}/${pad(due.getMonth()+1)} ${pad(due.getHours())}:${pad(due.getMinutes())}`
    const now = Date.now();
    return (
        <tr className={props.dueAt < now ? "timeExceeded TaskRow":"TaskRow"}>
            <td><Link to={`/overview/${props._id}`}>{props.title}</Link></td>
            <td>{added}</td>
            <td>{props.description.substring(0,20)}...</td>
            <td>{due}</td>
            <td className="progress"><Completion assigned={props.assigned}/></td>
            <td className="actions"><SecondaryOptions createdBy={props.createdBy} assigned={props.assigned} _id={props._id}/>
            </td>
        </tr>
    )
}
