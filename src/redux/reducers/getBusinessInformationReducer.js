import {
    GET_GENERAL_INFORMATION,
    GET_REASON_WHY_CHOOSE_US
} from '../types';
const initialState = {
    data: [],
    isLoading: true,
    error: []
}

export const getGeneralInformationReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_GENERAL_INFORMATION}_LOADING`:
            return {
                ...state,
            };
        case `${GET_GENERAL_INFORMATION}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_GENERAL_INFORMATION}_ERROR`:
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


export const getReasonWhyChooseUsReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_REASON_WHY_CHOOSE_US}_LOADING`:
            return {
                ...state,
            };
        case `${GET_REASON_WHY_CHOOSE_US}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_REASON_WHY_CHOOSE_US}_ERROR`:
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