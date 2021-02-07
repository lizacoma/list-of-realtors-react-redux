import {
    GET_ALL_PICTURES,
    ADD_NEW_PICTURE,
    UPDATE_PICTURE,
    DELETE_PICTURE,
    PICTURES_FETCH_DATA_SUCCESS,
    PUSH_DATA_SUCCESS
}
    from '../constants/types';

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

// const boundary = String(Math.random()).slice(2);

export function picturesFatchDataSuccess(pictures) {
    return {
        type: PICTURES_FETCH_DATA_SUCCESS,
        pictures
    }
};

export function addPictureSuccess(picture) {
    return {
        type: ADD_NEW_PICTURE,
        picture
    }
};

export function updatePictureSuccess(picture) {
    return {
        type: UPDATE_PICTURE,
        picture
    }
};

export function deletePictureAction(id) {
    return {
        type: DELETE_PICTURE,
        id
    }
};

export function picturesFatchDataAction(url, data) {
    return (dispatch) => {
        return fetch(url, {
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(pictures => {
                dispatch(picturesFatchDataSuccess(pictures));
                return pictures;
            })
            .then(pictures => {
                console.log('picturesFatchData work: ', pictures);
                return pictures;
            })
            .catch(error => console.log(console.error('Помилка з отриманням бази logo: ', error.message))
            )
    }
};

export const addPictureAction = (url, data) => {
    return (dispatch) => {
        return  fetch(url, {
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken
            },
            body: data
        })
            .then(res => res.json())
            .then(data => {
                dispatch(addPictureSuccess(data));
                console.log('Picture adding success: ', data);
                return data;
            })
            .catch(error => console.log(error))
    }
};

export const updatePictureAction = (url, data) => {
    return (dispatch) => {
        return  fetch(url, {
            method: "PUT",
            headers: {
                "X-CSRFToken": csrftoken
            },
            body: data
        })
            .then(res => res.json())
            .then(data => {
                dispatch(updatePictureSuccess(data));
                console.log('Picture updating success: ', data);
                return data;
            })
            .catch(error => console.log(console.error('Помилка з оновленням картинки: ', error.message))
            )
    }
};

export const DeletePictureAction = (url, data) => {
    return dispatch => {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "multipart/form-data"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then(res => {
                dispatch(deletePictureSuccess(data.id));
                console.log('Picture deleting success');
                return res;
            })
            .catch(error => console.log('Error with deleting picture:', error.message))
    }
};