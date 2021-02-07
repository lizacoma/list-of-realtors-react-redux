import {
    GET_ALL_PICTURES,
    ADD_NEW_PICTURE,
    UPDATE_PICTURE,
    DELETE_PICTURE,
    PICTURES_FETCH_DATA_SUCCESS
}
    from '../constants/types';

const initialState = {
    pictures: []
};

export function picturesReducer (state = [], action) {
    switch (action.type) {

        case PICTURES_FETCH_DATA_SUCCESS:
            return action.pictures;

        case ADD_NEW_PICTURE:
            return  [...state, action.picture];

        case UPDATE_PICTURE:
            return  state.map(picture => {
                    if (picture.id !== action.picture.id) {
                        return picture
                    } else {
                        return action.picture
                    }
                });

        case DELETE_PICTURE:
            return state.filter(picture => picture.id !== action.id);

        default:
            return state;
    };
};