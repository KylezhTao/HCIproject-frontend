import axios from "axios";
import { baseURL } from "@/api/util/apiConfig";

export async function login(params) {
    try {
        let response = await axios.post(baseURL + "/login", params);
        console.log(response)
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function register(params) {
    try {
        let response = await axios.post(baseURL + "/register", params);
        console.log(response)
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function logout() {
    try{
        let response = await axios.get(baseURL + "/logout");
        console.log(response)
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }

}