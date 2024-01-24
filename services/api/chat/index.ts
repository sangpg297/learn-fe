import { ChatPayload } from "@/declares/models";
import axiosClient from "../axios-client";

const chatApi = {
  sendMessage(params: ChatPayload) {
    const url = "chat";
    return axiosClient.post(url, params);
  },
};

export default chatApi;
