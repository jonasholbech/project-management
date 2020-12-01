import Completion from "./Completion";
import SecondaryOptions from "./SecondaryOptions";
export default function TaskRow(props){
    function pad(num){
        return String(num).padStart(2,'0');
    }
    let added = new Date(props.addedAt);
    added = `${pad(added.getDate())}/${pad(added.getMonth())} ${pad(added.getHours())}:${pad(added.getMinutes())}`
    let due = new Date(props.dueAt);
    due = `${pad(due.getDate())}/${pad(due.getMonth())} ${pad(due.getHours())}:${pad(due.getMinutes())}`
    return (
        <tr>
            <td>{props.title}</td>
            <td>{added}</td>
            <td>{props.description}</td>
            <td>{due}</td>
            <td className="progress"><Completion assigned={props.assigned}/></td>
            <td className="actions"><SecondaryOptions _id={props._id}/>
            </td>
        </tr>)
}
