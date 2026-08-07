import API from "./api";

export const getTasks = (params) => {
    return API.get("/tasks",{params})
}

export const createTask = (task) => {
    return API.post("/tasks", task)
}

export const deleteTask = (id) => {
    return API.delete(`/tasks/${id}`)
}

export const editTask = (id, data) => {
    return API.patch(`/tasks/${id}`, data)
}

export const updateStatus = (id,status)=>{
    return API.patch(`/tasks/status/${id}`,{status});

}