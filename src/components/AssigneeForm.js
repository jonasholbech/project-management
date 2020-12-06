import {useContext} from "react";
import { store } from "../models/store.js";
import netlifyIdentity from 'netlify-identity-widget';
import {assignToTask,unassignFromTask, toggleCompleted} from "../utils/tasks";
import { BiTrash } from "react-icons/bi";
import { Alert } from 'rsuite';
import {alertDelay, persons} from "../models/settings";
function filterPersons(persons, assigned){
    const assignedPersons=[];
    const notAssignedPersons=[];
    //"Filter" persons for each "cat"
    persons.forEach(person=>{
        const isAssigned = assigned.some(a=>a.initials===person.initials);
        if(isAssigned){
            assignedPersons.push(person);
        } else {
            notAssignedPersons.push(person)
        }
    })
    return [assignedPersons, notAssignedPersons];
}
export default function AssigneeForm({assigned, _id}){
    const { globalState,dispatch } = useContext(store);
    const user = netlifyIdentity.currentUser();
    console.groupCollapsed("state and user");
    console.log({globalState});
    console.log({user})
    console.groupEnd();
    const [assignedPersons, notAssignedPersons] = filterPersons(persons, assigned);
    const deleteClicked= async(e, person)=>{
        e.preventDefault();
        const payload = {
            person,
            task:_id
        }
        unassignFromTask(user, payload, (data, person)=>{
            Alert.success(`${person.name} was removed from the task`, alertDelay)
        });
        dispatch({
            type:"UNASSIGN_FROM_TASK",
            payload
        })
    }

    const assignToTaskClicked = async(person)=>{
        console.log("assignToTaskClicked")
        person.completed=false;
        const payload = {
            task:_id,
            person:person
        }
        assignToTask(user,payload, (data,person)=>{
            console.log("alert called")
            Alert.success(`${person.name} was assigned to the task`, alertDelay)
        })
        console.log("calling dispatch")
        dispatch({
            type:"ASSIGN_TO_TASK",
            payload
        });
    }

    const setCompleted = async(e,person)=>{
        const payload = {
            completed:e.target.value==="true",
            person,
            _id
        }
        console.log(payload)
        toggleCompleted(user, payload, (data,person)=>{
            Alert.success(`${person.name} ${payload.completed ? "completed":"un-completed"} the task`, alertDelay)
        })
        
        dispatch({
            type:"TOGGLE_COMPLETED",
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
                        <td className="center"><button onClick={(e)=>{deleteClicked(e, person)}}><BiTrash/></button></td>
                        <td className="center"><input type="radio" value={true} onChange={(e)=>setCompleted(e, person)} name={`completed[${person.initials}]`} defaultChecked={completed} /></td>
                        <td className="center"><input type="radio" value={false} onChange={(e)=>setCompleted(e, person)} name={`completed[${person.initials}]`} defaultChecked={notCompleted}/></td>
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
                        <td className="center"><input onClick={()=>assignToTaskClicked(person)} name="assigned" value={person.initials} type="checkbox" /></td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            </div>
        </form>
    )
}