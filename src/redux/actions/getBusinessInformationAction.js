import axios from "axios";
import {
    GET_GENERAL_INFORMATION,
    GET_REASON_WHY_CHOOSE_US,
    GET_HOW_TO_ORDER,
    GET_TESTIMONY,
    GET_FAQ,
    GET_GALLERY
} from '../types';

export const getGeneralInformation = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_GENERAL_INFORMATION}_LOADING`
        });

        if (!sessionStorage.getItem('business_information')) {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_KEY}/infoumum`
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                sessionStorage.setItem('business_information', JSON.stringify(res.data.data[0]));

                dispatch({
                    type: `${GET_GENERAL_INFORMATION}_FULFILLED`,
                    payload: res.data.data[0]
                });
            }).catch((err) => {
                dispatch({
                    type: `${GET_GENERAL_INFORMATION}_ERROR`,
                    error: err.message
                })
            })
        } else {
            dispatch({
                type: `${GET_GENERAL_INFORMATION}_FULFILLED`,
                payload: JSON.parse(sessionStorage.getItem('business_information'))
            });
        }

    }
}


export const getReasonWhyChooseUs = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_REASON_WHY_CHOOSE_US}_LOADING`
        });

        if (!sessionStorage.getItem('reason_why_choose_us')) {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_KEY}/alasan`
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                sessionStorage.setItem('reason_why_choose_us', JSON.stringify(res.data.data)||null);

                dispatch({
                    type: `${GET_REASON_WHY_CHOOSE_US}_FULFILLED`,
                    payload: res.data.data
                });
            }).catch((err) => {
                dispatch({
                    type: `${GET_REASON_WHY_CHOOSE_US}_ERROR`,
                    error: err.message
                })
            })
        } else {
            dispatch({
                type: `${GET_REASON_WHY_CHOOSE_US}_FULFILLED`,
                payload: JSON.parse(sessionStorage.getItem('reason_why_choose_us'))
            });
        }

    }
}

export const getHowToOrder = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_HOW_TO_ORDER}_LOADING`
        });

        if (!sessionStorage.getItem('how_to_order')) {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_KEY}/carapesan`
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                sessionStorage.setItem('how_to_order', JSON.stringify(res.data.data));

                dispatch({
                    type: `${GET_HOW_TO_ORDER}_FULFILLED`,
                    payload: res.data.data
                });
            }).catch((err) => {
                dispatch({
                    type: `${GET_HOW_TO_ORDER}_ERROR`,
                    error: err.message
                })
            })
        } else {
            dispatch({
                type: `${GET_HOW_TO_ORDER}_FULFILLED`,
                payload: JSON.parse(sessionStorage.getItem('how_to_order'))
            });
        }

    }
}

export const getTestimony = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_TESTIMONY}_LOADING`
        });

        if (!sessionStorage.getItem('testimony')) {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_KEY}/review`
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                sessionStorage.setItem('testimony', JSON.stringify(res.data.data));

                dispatch({
                    type: `${GET_TESTIMONY}_FULFILLED`,
                    payload: res.data.data
                });
            }).catch((err) => {
                dispatch({
                    type: `${GET_TESTIMONY}_ERROR`,
                    error: err.message
                })
            })
        } else {
            dispatch({
                type: `${GET_TESTIMONY}_FULFILLED`,
                payload: JSON.parse(sessionStorage.getItem('testimony'))
            });
        }

    }
}

export const getFAQ = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_FAQ}_LOADING`
        });

        if (!sessionStorage.getItem('faq')) {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_KEY}/faq`
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                sessionStorage.setItem('faq', JSON.stringify(res.data.data));

                dispatch({
                    type: `${GET_FAQ}_FULFILLED`,
                    payload: res.data.data
                });
            }).catch((err) => {
                dispatch({
                    type: `${GET_FAQ}_ERROR`,
                    error: err.message
                })
            })
        } else {
            dispatch({
                type: `${GET_FAQ}_FULFILLED`,
                payload: JSON.parse(sessionStorage.getItem('faq'))
            });
        }

    }
}

export const getGallery = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_GALLERY}_LOADING`
        });

        if (!sessionStorage.getItem('gallery')) {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_KEY}/galeri`
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                sessionStorage.setItem('gallery', JSON.stringify(res.data.data) ||null);

                dispatch({
                    type: `${GET_GALLERY}_FULFILLED`,
                    payload: res.data.data
                });
            }).catch((err) => {
                dispatch({
                    type: `${GET_GALLERY}_ERROR`,
                    error: err.message
                })
            })
        } else {
            dispatch({
                type: `${GET_GALLERY}_FULFILLED`,
                payload: JSON.parse(sessionStorage.getItem('gallery'))
            });
        }

    }
}