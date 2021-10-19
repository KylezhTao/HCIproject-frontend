import axios from "axios";
import {baseURL} from "@/api/util/apiConfig";

export async function addGraph(params) {
    try {
        await axios.post(baseURL + "/addGraph", params);
        return true;
    } catch (e) {
        return false;
    }
}

export async function getOnlineGraph() {
    let response = {};
    try {
        response = await axios.get(baseURL + "/getGraph", {});
        if (response.data.nodes.length === 0)
            return null;
        return response.data;
    } catch (e) {
        return null;
    }
}

export async function getLocalGraph() {
    let response = await axios.get("/static/kgData.json", {});
    let res = {};
    res.nodes = response.data.node;
    res.links = response.data.relationship;
    return res;
}
