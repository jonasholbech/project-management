const getTasks = async (dispatch,send) => {
    const response = await fetch("/api/get-all-tasks");
    const data = await response.json();
    dispatch({
      type: "SET_INITIAL_DATA",
      payload: data,
    });
    send("SUCCESS")
  };
  export {getTasks};
  