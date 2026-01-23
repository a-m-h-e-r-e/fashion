import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
    validateStatus: (status) => status >= 200 && status < 300,
    maxRedirects: 5,
    maxContentLength: 10000000,
    maxBodyLength: 10000000,
});


httpClient.interceptors.request.use((request) => {
    return request;
});

httpClient.interceptors.response.use((response) => {
    return response;
});

export default httpClient;
