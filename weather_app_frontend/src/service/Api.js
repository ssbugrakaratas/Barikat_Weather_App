import axios from 'axios';
import store from '../store';

const API_BASE_URL = 'http://localhost:8000/api/';

var axios_ = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token') ?
            sessionStorage.getItem('token') :
            '',
    },
});

export default {
    get(url, params = {}) {
        return new Promise(async(resolve, reject) => {
            params['user'] = {
                username: store.getters.user.username,
                password: store.getters.user.password,
            };
            axios_
                .get(API_BASE_URL + url, { params: params })
                .then(function(response) {
                    resolve(response);
                })
                .catch(async error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    post(url, data = {}) {
        return new Promise(async(resolve, reject) => {
            data['user'] = {
                username: store.getters.user.username,
                password: store.getters.user.password,
            };
            axios_
                .post(API_BASE_URL + url, data)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(async error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
};