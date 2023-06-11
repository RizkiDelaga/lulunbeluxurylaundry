import {
    GET_PROFILE_ACCOUNT_CUSTOMER,
    GET_PROFILE_ACCOUNT_ADMIN
} from '../types';
const initialState = {
    data: [],
    isLoading: true,
    error: []
}


export const getProfileAccountAdminReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_PROFILE_ACCOUNT_ADMIN}_LOADING`:
            return {
                ...state,
            };
        case `${GET_PROFILE_ACCOUNT_ADMIN}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_PROFILE_ACCOUNT_ADMIN}_ERROR`:
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

export const getProfileAccountCustomerReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_PROFILE_ACCOUNT_CUSTOMER}_LOADING`:
            return {
                ...state,
            };
        case `${GET_PROFILE_ACCOUNT_CUSTOMER}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_PROFILE_ACCOUNT_CUSTOMER}_ERROR`:
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