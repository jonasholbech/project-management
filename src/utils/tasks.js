const getAllTasks = async (dispatch) => {
  const response = await fetch("/api/get-all-tasks");
  const data = await response.json();
  dispatch({
    type: "SET_INITIAL_DATA",
    payload: data,
  });  
};

const deleteTask = async(_id,dispatch)   => {
  const response = await fetch("/api/delete-task", {
    method:"post",
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

const assignToTask = async(payload, callback) => {
  const response = await fetch("/api/assign-to-task", {
    method:"post",
    body: JSON.stringify({_id:payload.task,assignee:payload.person})
  });
  const data = await response.json();
  callback(data, payload.person)
}

const unassignFromTask = async(payload,callback) => {
  const response = await fetch("/api/unassign-from-task", {
    method:"post",
    body: JSON.stringify({_id:payload.task,assignee:payload.person})
  });
  const data = await response.json();
  callback(data, payload.person)
}

const toggleCompleted = async(payload, callback) => {
  const response = await fetch("/api/toggle-completed", {
    method:"post",
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  callback(data, payload.person)
}

export {getAllTasks, deleteTask,assignToTask, unassignFromTask, toggleCompleted};  