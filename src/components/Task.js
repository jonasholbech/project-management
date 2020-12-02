import {useContext} from "react";
import { store } from "../models/store.js";
import netlifyIdentity from 'netlify-identity-widget';
import persons from "../utils/persons";

export default function Task(props){
    const { globalState } = useContext(store);
    const user = netlifyIdentity.currentUser();

    const thisId = props.match.params.id;
    const thisTask = globalState.tasks.find(el=>el._id===thisId);
    return <div className="Task">
        <h1>Task: {thisTask.title}</h1>
        <AssigneeForm {...thisTask}/>
    </div>
}




function AssigneeForm({assigned}){
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
     
     function submit(e){
         e.preventDefault();
         console.log(e.target.elements)
     }
    return (
        <form className="AssigneeForm" onSubmit={submit}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
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
                        <td className="center"><input type="radio" name={person.initials} defaultChecked={completed} /></td>
                        <td className="center"><input type="radio" name={person.initials} defaultChecked={notCompleted}/></td>
                    </tr>
                )
            })}
            </tbody>
            </table>

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
                        <td className="center"><input type="checkbox" /></td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            <button>Save</button>
        </form>
    )
}