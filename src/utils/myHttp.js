import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000', // 设置你的服务器地址
    timeout: 5000, // 设置请求超时时间（毫秒）
});

const request = async (method, url, data, params) => {
    try {
        const response = await instance({
            method,
            url,
            data,
            params,
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // 服务器返回了错误响应
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        } else if (error.request) {
            // 请求已发送，但服务器未响应
            console.error('No response was received:', error.request);
        } else {
            // 发送请求时出现其他错误
            console.error('Error:', error.message);
        }

        throw error;
    }
};

export default {
    get: (url, params) => request('get', url, null, params),
    post: (url, data) => request('post', url, data),
    put: (url, data) => request('put', url, data),
    delete: (url, data) => request('delete', url, data),
};
