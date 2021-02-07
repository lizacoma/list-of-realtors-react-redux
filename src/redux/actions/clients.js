import {
    CLIENTS_FETCH_DATA_SUCCESS,
    POST_DATA_SUCCESS,
    ADD_NEW_CLIENT_SUCCESS,
    UPDATE_CLIENT,
    DELETE_CLIENT,
    GET_ALL_CLIENTS,
    CLIENT_WAS_UPDATED,
    OPEN_OR_CLOSE_COMPONENT,
    COMBINE_ALL
}
    from '../constants/types.js';

import { picturesFatchDataAction } from './pictures.js';
import { urlGettingPic } from '../constants/reqUrl.js';

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
const csrftoken = readCookie('csrftoken');

export function openOrCloseComponentAction(key, props = {}) {
    return {
        type: OPEN_OR_CLOSE_COMPONENT,
        key,
        props
    }
};

export function clientsFatchDataSuccess(clients) {
    return {
        type: CLIENTS_FETCH_DATA_SUCCESS,
        clients
    }
};

export function addNewClientSuccess(client) {
    return {
        type: ADD_NEW_CLIENT_SUCCESS,
        client
    }
};

export function updateClientSuccess(client) {
    return {
        type: UPDATE_CLIENT,
        client
    }
};

export function deleteClientSuccess(id) {
    return {
        type: DELETE_CLIENT,
        id
    }
};

export function clientsFatchDataAction(url, data) {
    return (dispatch) => {
        return fetch(url, {
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(clients => {
                dispatch(clientsFatchDataSuccess(clients));
                return clients;
            })
            .then(clients => {
                console.log('clientsFatchData work: ', clients);
                return clients;
            })
            .catch(error => console.log(console.error('Помилка з отриманням бази клієнтів: ', error.message))
            )
    }
};

export const AddClientAction = (url, data) => {
    return (dispatch) => {
       return  fetch(url, {
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
               dispatch(addNewClientSuccess(data));
                return data;
            })
            .catch(error => console.log(console.error('Помилка з додаванням клієнта: ', error.message))
            )
    }
};

export const UpdateClientAction = (url, data) => {
    return (dispatch) => {
        return  fetch(url, {
            method: "PUT",
            headers: {
                "X-CSRFToken": csrftoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                dispatch(updateClientSuccess(data));
                return data;
            })
            .catch(error => console.log(console.error('Помилка з оновленням клієнта: ', error.message))
            )
    }
};

export const DeleteClientAction = (url, data) => {
    return dispatch => {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRFToken": csrftoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then(res => {
                dispatch(deleteClientSuccess(data.id));
                return res;
            })
            .catch(error => console.log('Error with deleting:', error.message))
    }
};