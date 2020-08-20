import axios, { AxiosResponse, AxiosError } from 'axios';
import { showFlashMessage } from '@helper/flashMessage';
const CancelToken = axios.CancelToken;

const get = (api: string) => {
    const cancelInstance = CancelToken.source();

    return {
        cancel: () => cancelInstance.cancel(),
        promise: () => axios
            .get(api)
            .then(response => handleResponse(response))
            .catch(error => handleError(error, api))
    }
}

const post = (api: string, data: Object) => {
    const cancelInstance = CancelToken.source();

    return {
        cancel: () => cancelInstance.cancel(),
        promise: () => axios
            .post(api, data)
            .then(response => handleResponse(response))
            .catch(error => handleError(error, api, data))
    }
}

const handleResponse = (response: AxiosResponse) => {
    return response;
}

const handleError = (error: AxiosError, api: string, data?: Object) => {
    console.log('handleError data', api, data);
    console.log('handleError error', error);
    const message = 'Error happened!\r' + error;
    showFlashMessage({
        type: 'danger',
        message
    })
}

export {
    get,
    post
};