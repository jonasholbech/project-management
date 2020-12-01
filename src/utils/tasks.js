const getAllTasks = async (dispatch,send) => {
    const response = await fetch("/api/get-all-tasks");
    const data = await response.json();
    dispatch({
      type: "SET_INITIAL_DATA",
      payload: data,
    });
    send("OVERVIEW")
  };
const deleteTask = async(_id,dispatch,send)   => {
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
      //send("OVERVIEW") */
    } else {
      console.error("SOMETHING BAS HAPPENED")
    }
    
}
  export {getAllTasks, deleteTask};

  