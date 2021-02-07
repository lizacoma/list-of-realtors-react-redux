import {
    CLIENTS_FETCH_DATA_SUCCESS,
    ADD_NEW_CLIENT_SUCCESS,
    UPDATE_CLIENT,
    DELETE_CLIENT,
    GET_ALL_CLIENTS,
    CLIENT_WAS_UPDATED,
    OPEN_OR_CLOSE_COMPONENT
}
    from '../constants/types';


export const clientReducer = (state = [], action) => {
    switch (action.type) {

        case CLIENTS_FETCH_DATA_SUCCESS:
            return action.clients;

        case ADD_NEW_CLIENT_SUCCESS:
            return [...state, action.client];

        case UPDATE_CLIENT:
            return state.map(client => {
                    if (client.id !== action.client.id) {
                        return client
                    } else {
                        return action.client
                        }
                    });

        case DELETE_CLIENT:
            return state.filter(client => client.id !== action.id);

        default:
            return state;
    };
};

const initialState = {
    key: 'create-or-edit',
    props: {}
}

export const openOrCloseComponentReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_OR_CLOSE_COMPONENT:
            return {
                key: action.key,
                props: action.props
            };

    default:
        return state;
    };
};



