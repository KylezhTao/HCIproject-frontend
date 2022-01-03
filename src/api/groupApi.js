import axios from "axios";
import { baseURL } from "@/api/util/apiConfig";

/**
 * 获得集团名列表
 * @returns {Promise<string[]>}
 */
export async function getGroupNameList() {
  let response = await axios.get(baseURL + "/getGroupNameList", {});
  return response.data;
}

/**
 * 根据集团名获得图谱
 * @param {string} groupName
 * @returns {Promise<null|*>}
 */
export async function getGraphByGroupName(groupName) {
  let params = {
    groupName: groupName
  };
  try {
    let response = await axios.post(baseURL + "/getGraphByGroupName", params);
    return response.data;
  } catch (e) {
    return null;
  }
}

/**
 * 通过集团名获得详细信息
 * @param {string} groupName
 * @returns {Promise<string>}
 */
export async function getDetailByGroupName(groupName) {
  let params = { groupName: groupName };
  try {
    let response = await axios.post(baseURL + "/getDetailByGroupName", params);
    return response.data.detail;
  } catch (e) {
    return "暂无信息。";
  }
}
