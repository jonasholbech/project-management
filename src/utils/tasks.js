const getAllTasks = async (user, dispatch, callback=null) => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/get-all-tasks",{
    method:"POST",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({})
  });
  const data = await response.json();
  
  dispatch({
    type: "SET_INITIAL_DATA",
    payload: data,
  });  
  if(callback){
    callback();
  }
};
//TODO: de næste to funktion skal have et foot print a la assign to task
const getAllTasksForUser = async (user, dispatch,callback) => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/get-all-tasks",{
    method:"POST",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({type:"assignedTo",email:user.email})
  });
  const data = await response.json();
  
  dispatch({
    type: "SET_INITIAL_DATA",
    payload: data,
  });  
  callback();
};
const getAllTasksByUser = async (user, dispatch, callback) => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/get-all-tasks",{
    method:"POST",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({type:"createdBy",email:user.email})
  });
  const data = await response.json();
  
  dispatch({
    type: "SET_INITIAL_DATA",
    payload: data,
  });  
  callback()
};
const deleteTask = async(user,_id,callback)   => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/delete-task", {
    method:"post",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({_id})
  });
  const data = await response.json();
  if(data.deletedCount>0){
    callback(data)
  } else {
    console.error("SOMETHING BAD HAPPENED")
  }
}

const closeTask = async(user, _id, callback)   => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/close-task", {
    method:"post",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({_id})
  });
  const data = await response.json();
  console.log(data)
  if(data.insertedCount>0){
    callback(data);
  } else {
    console.error("SOMETHING BAD HAPPENED")
  }
}

const assignToTask = async(user,payload, callback) => {
  console.log("async assignToTask");
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/assign-to-task", {
    method:"post",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({_id:payload.task,assignee:payload.person})
  });
  const data = await response.json();
  console.log(data);
  callback(data, payload.person)
}

const unassignFromTask = async(user,payload,callback) => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/unassign-from-task", {
    method:"post",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({_id:payload.task,assignee:payload.person})
  });
  const data = await response.json();
  callback(data, payload.person)
}

const toggleCompleted = async(user, payload, callback) => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/toggle-completed", {
    method:"post",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  callback(data, payload.person)
}

const addTask = async(user,payload, callback) => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/add-task", {
    method:"post",
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  callback(data)
}
export {getAllTasks, deleteTask,assignToTask, unassignFromTask, toggleCompleted, addTask, closeTask, getAllTasksForUser, getAllTasksByUser};  