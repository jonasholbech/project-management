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

const assignToTask = async(payload) => {
  const response = await fetch("/api/assign-to-task", {
    method:"post",
    body: JSON.stringify({_id:payload.task,assignee:payload.person})
  });
  await response.json();
}

const unassignFromTask = async(payload) => {
  const response = await fetch("/api/unassign-from-task", {
    method:"post",
    body: JSON.stringify({_id:payload.task,assignee:payload.person})
  });
  await response.json();
}

export {getAllTasks, deleteTask,assignToTask, unassignFromTask};  