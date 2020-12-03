import {useContext} from "react";
import { store } from "../models/store.js";
//import netlifyIdentity from 'netlify-identity-widget';
import persons from "../utils/persons";
import {assignToTask,unassignFromTask} from "../utils/tasks";
import { BiTrash } from "react-icons/bi";


export default function Task(props){
    const { globalState } = useContext(store);
    //const user = netlifyIdentity.currentUser();

    const thisId = props.match.params.id;
    const thisTask = globalState.tasks.find(el=>el._id===thisId);
    return <div className="Task">
        <p className="titleLabel">Task</p>
        <h1>{thisTask.title}</h1>
        <section>{thisTask.description}</section>
        <AssigneeForm {...thisTask}/>
    </div>
}




function AssigneeForm({assigned, _id}){
    const { dispatch } = useContext(store);
    const assignedPersons=[];
    const notAssignedPersons=[];
    persons.forEach(person=>{
        const isAssigned = assigned.some(a=>a.initials===person.initials);
        if(isAssigned){
            assignedPersons.push(person);
        } else {
            notAssignedPersons.push(person)
        }
    })
    const clicked=(e, person)=>{
        e.preventDefault();
        const payload = {
            person,
            task:_id
        }
        unassignFromTask(payload)
        dispatch({
            type:"UNASSIGN_FROM_TASK",
            payload
        })
    }
    return (
        <form className="AssigneeForm">
            <div>
                <h2>Assigned</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Delete</th>
                        <th>Completed</th>
                        <th>Assigned</th>
                    </tr>
                </thead>
                <tbody> 

             {assignedPersons.map(person=>{

                const completed=assigned.filter(assignee=>assignee.initials===person.initials && assignee.completed).length>0
                const notCompleted=assigned.filter(assignee=>assignee.initials===person.initials && !assignee.completed).length>0
                
                return (
                    <tr key={person.initials}>
                        <td>{person.name}</td>
                        <td className="center"><button onClick={(e)=>{clicked(e, person)}}><BiTrash/></button></td>
                        <td className="center"><input type="radio" value="true"  name={`completed[${person.initials}]`} defaultChecked={completed} /></td>
                        <td className="center"><input type="radio" value="false" name={`completed[${person.initials}]`} defaultChecked={notCompleted}/></td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            </div>
            <div>
            <h2>Not Assigned</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody> 

             {notAssignedPersons.map(person=>{
                return (
                    <tr key={person.initials}>
                        <td>{person.name}</td>
                        <td className="center"><input onChange={()=>{
                            const payload = {
                                task:_id,
                                person:person
                            }
                            assignToTask(payload)
                            dispatch({
                                type:"ASSIGN_TO_TASK",
                                payload
                            })
                        }} name="assigned" value={person.initials} type="checkbox" /></td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            </div>
        </form>
    )
}