import axios from "axios";
import { baseURL } from "@/api/util/apiConfig";
import { MessageBox, Message } from "element-ui";

export async function login(params) {
  try {
    let response = await axios.post(baseURL + "/login", params);
    console.log(response);
    return response;
  } catch (e) {
    console.error(e);
    Message.error("服务器异常");
    return false;
  }
}

export async function register(params) {
  try {
    let response = await axios.post(baseURL + "/register", params);
    console.log(response);
    return response;
  } catch (e) {
    console.error(e);
    Message.error("服务器异常");
    return false;
  }
}

export async function logout() {
  try {
    let response = await axios.get(baseURL + "/logout");
    console.log(response);
    return response;
  } catch (e) {
    console.error(e);
    Message.error("服务器异常");
    return false;
  }
}
