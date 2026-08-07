import API from "./api";

export const registerUser = (userData) => {
    return API.post("/users/register", userData)
}

export const loginUser = (userData) => {
    return API.post("/users/login", userData)
}