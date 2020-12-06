const getAllTasks = async (user, dispatch) => {
  const bearer = 'Bearer '+user.token.access_token;
  const response = await fetch("/api/get-all-tasks",{
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,    
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  dispatch({
    type: "SET_INITIAL_DATA",
    payload: data,
  });  
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

const closeTask = async(user,_id,dispatch)   => {
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
  if(data.deletedCount>0){
    dispatch({
      type: "TASK_DELETED",
      payload: _id,
    });
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
export {getAllTasks, deleteTask,assignToTask, unassignFromTask, toggleCompleted, addTask, closeTask};  