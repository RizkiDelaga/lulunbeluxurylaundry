import {
    CREATE_EXAMPLE,
    GET_EXAMPLE,
    EDIT_EXAMPLE,
    DETELE_EXAMPLE
} from '../types';

const initialState = {
    data: [],
    isLoading: true,
    error: []
}

export const createExampleReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${CREATE_EXAMPLE}_LOADING`:
            return {
                isLoading: true
            };
        case `${CREATE_EXAMPLE}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${CREATE_EXAMPLE}_ERROR`:
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

export const getExampleReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_EXAMPLE}_LOADING`:
            return {
                ...state,
            };
        case `${GET_EXAMPLE}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_EXAMPLE}_ERROR`:
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

export const editExampleReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${EDIT_EXAMPLE}_LOADING`:
            return {
                isLoading: true
            };
        case `${EDIT_EXAMPLE}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false,
            };
        case `${EDIT_EXAMPLE}_ERROR`:
            return {
                ...state,
                isLoading: false,
                    error: error,
            };

        default:
            return {
                ...state
            }
    }
};


export const deleteExampleReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${DETELE_EXAMPLE}_LOADING`:
            return {
                isLoading: true
            };
        case `${DETELE_EXAMPLE}_FULFILLED`:
            return {
                ...state,
                isLoading: false
            };
        case `${DETELE_EXAMPLE}_ERROR`:
            return {
                ...state,
                isLoading: false,
                    error: error,
            };

        default:
            return {
                ...state
            }
    }
};