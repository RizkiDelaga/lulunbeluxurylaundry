import {
    GET_NOTIFICATION_ADMIN,
    GET_NOTIFICATION_CUSTOMER
} from '../types';
const initialState = {
    data: [],
    isLoading: true,
    error: []
}


export const getNotificationAdminReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_NOTIFICATION_ADMIN}_LOADING`:
            return {
                ...state,
            };
        case `${GET_NOTIFICATION_ADMIN}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_NOTIFICATION_ADMIN}_ERROR`:
            return {
                ...state,
                isLoading: false,
                    error: error
            };

        default:
            return {
                ...state
            }
    }
};