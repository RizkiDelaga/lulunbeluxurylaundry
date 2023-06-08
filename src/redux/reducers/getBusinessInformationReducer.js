import {
    GET_GENERAL_INFORMATION,
    GET_REASON_WHY_CHOOSE_US,
    GET_HOW_TO_ORDER,
    GET_TESTIMONY,
    GET_FAQ,
    GET_GALLERY
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

export const getHowToOrderReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_HOW_TO_ORDER}_LOADING`:
            return {
                ...state,
            };
        case `${GET_HOW_TO_ORDER}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_HOW_TO_ORDER}_ERROR`:
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

export const getTestimonyReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_TESTIMONY}_LOADING`:
            return {
                ...state,
            };
        case `${GET_TESTIMONY}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_TESTIMONY}_ERROR`:
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

export const getFAQReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_FAQ}_LOADING`:
            return {
                ...state,
            };
        case `${GET_FAQ}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_FAQ}_ERROR`:
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

export const getGalleryReducer = (state = initialState, action) => {
    const {
        type,
        payload,
        error
    } = action;

    switch (type) {
        case `${GET_GALLERY}_LOADING`:
            return {
                ...state,
            };
        case `${GET_GALLERY}_FULFILLED`:
            return {
                ...state,
                data: payload,
                    isLoading: false
            };
        case `${GET_GALLERY}_ERROR`:
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