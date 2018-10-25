import { GET_ERRORS } from "./types";
import axios from "axios";

export const loginAction = (credentials, history) => dispatch => {
  axios
    .post("/api/users/login", credentials)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
