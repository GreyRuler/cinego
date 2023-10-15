import axiosClient from "./axios-client.js";

export default async function update(id, data) {
    const {data: responseData} = await axiosClient.put(`/halls/${id}`, data)
    return responseData
}
