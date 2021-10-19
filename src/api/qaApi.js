import axios from "axios";
import { baseURL, qaURL } from "@/api/util/apiConfig";

/**
 *
 * @param {string} question
 * @returns {Promise<string|{}>}
 */
export async function getAnswer(question) {
    let questionDetails = {};
    try {
        let response = await axios.post(qaURL + "/getQuestionDetails", {question: question});
        questionDetails = response.data;

        response = await axios.post(baseURL + "/getAnswer",
            {
                "questionIndex": Number(questionDetails.question.substr(1)) + 1,
                "groupName": questionDetails.nng,
                "brandName": questionDetails.nnb,
                "rankName": questionDetails.nnr,
                "vipName": questionDetails.nnv
            }
        );
        if (response.data.answer)
            return response.data.answer;
    } catch (e) {
        return "请检查网络连接。";
    }
}
