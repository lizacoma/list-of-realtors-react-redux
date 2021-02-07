import {
    COMBINE_ALL
}
    from '../constants/types';

export const baseReducer = (state = [], action) => {
    switch (action.type) {

        case COMBINE_ALL:
            return action.clients.map(client => {
                return {...client,
                    clientLogo: action.logos.find(logo => logo.client === client.id)
                }
            });

        default:
            return state;
    };
};