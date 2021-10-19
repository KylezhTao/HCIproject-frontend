import axios from "axios";
import {baseURL} from "@/api/util/apiConfig";

/**
 * 获得酒店图谱
 * @returns {Promise<null|*>}
 */
export async function getCoin() {
    let response = {};
    try {
        response = await axios.get(baseURL + "/getCoin", {});
        if (response.data.nodes.length === 0)
            return null;
        return response.data;
    } catch (e) {
        return null;
    }
}

/**
 * 添加group
 * 添加成功结果为group的uuid，添加失败结果为"fail"
 * @param {string} name
 * @param {string} introduction
 * @param {string} VIP
 * @param {string} headquarter
 * @param {string} platform
 * @param {string} homepage
 * @returns {Promise<string>}
 */
export async function addGroup(name, introduction, VIP, headquarter, platform, homepage) {
    let params = {
        "name": name,
        "introduction": introduction,
        "VIP": VIP,
        "headquarter": headquarter,
        "platform": platform,
        "homepage": homepage
    };
    try {
        let response = await axios.post(baseURL + "/addGroup", params);
        return response.data.uuid;
    } catch (e) {
        return "fail";
    }
}

/**
 * 通过uuid删除group，同时也会在数据库中删除所有关联的brand
 * 删除成功结果为ture，否则结果为false
 * @param {string} uuid
 * @returns {Promise<boolean>}
 */
export async function deleteGroupByUuid(uuid) {
    let params = {"uuid": uuid};
    try {
        let response = await axios.post(baseURL + "/deleteGroupByUuid", params);
        return response.data.deleted;
    } catch (e) {
        return false;
    }
}

/**
 * 添加brand
 * 添加成功结果为brand的uuid，添加失败结果为"fail"
 * @param {string} name
 * @param {string} groupUuid
 * @param {string} rankUuid
 * @param {string} priority
 * @param {string} discount
 * @param {string} checkout
 * @param {string} breakfast
 * @returns {Promise<string>}
 */
export async function addBrand(name, groupUuid, rankUuid, priority, discount, checkout, breakfast) {
    let gid = parseInt(groupUuid.substr(5));
    let rid = parseInt(rankUuid.substr(4));
    let params = {
        "name": name,
        "priority": priority,
        "discount": discount,
        "checkout": checkout,
        "breakfast": breakfast,
        "gid": gid,
        "rid": rid
    };
    try {
        let response = await axios.post(baseURL + "/addBrand", params);
        return response.data.uuid;
    } catch (e) {
        return "fail";
    }
}

/**
 * 通过uuid删除brand
 * 删除成功结果为ture，否则结果为false
 * @param {string} uuid
 * @returns {Promise<boolean>}
 */
export async function deleteBrandByUuid(uuid) {
    let params = {"uuid": uuid};
    try {
        let response = await axios.post(baseURL + "/deleteBrandByUuid", params);
        return response.data.deleted;
    } catch (e) {
        return false;
    }
}


/**
 * 通过酒店名获得详细信息
 * @param {string} brandName
 * @returns {Promise<string>}
 */
export async function getDetailByBrandName(brandName) {
    let params = {"brandName": brandName};
    try {
        let response = await axios.post(baseURL + "/getDetailByBrandName", params);
        return response.data.detail;
    } catch (e) {
        return "暂无信息。";
    }
}

/**
 * 通过酒店名获得logo url
 * @param {string} brandName
 * @returns {Promise<string>}
 */
export async function getPicByBrandName(brandName) {
    let params = {"brandName": brandName};
    try {
        let response = await axios.post(baseURL + "/getPicByBrandName", params);
        return response.data.detail;
    } catch (e) {
        return "";
    }
}
