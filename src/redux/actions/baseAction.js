import {
    COMBINE_ALL
}
    from '../constants/types.js';

export function connectClientsWithPic(clients, logos) {
    return {
        type: COMBINE_ALL,
        clients,
        logos
    }
};