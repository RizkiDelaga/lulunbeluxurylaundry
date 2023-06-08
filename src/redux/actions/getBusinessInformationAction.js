import axios from "axios";
import {
    GET_GENERAL_INFORMATION,
    GET_REASON_WHY_CHOOSE_US
} from '../types';

export const getGeneralInformation = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_GENERAL_INFORMATION}_LOADING`
        });

        if (!sessionStorage.getItem('business-information')) {
            axios({
                method: 'GET',
                url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/infoumum'
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                sessionStorage.setItem('business-information', JSON.stringify(res.data.data[0]));

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
                payload: JSON.parse(sessionStorage.getItem('business-information'))
            });
        }

    }
}


export const getReasonWhyChooseUs = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_REASON_WHY_CHOOSE_US}_LOADING`
        });

        if (!sessionStorage.getItem('reason-why-choose-us')) {
            axios({
                method: 'GET',
                url: 'https://api-tugasakhir-lulu-laundry-git-develop-raihaniqbalpasya.vercel.app/api/v1/alasan'
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                sessionStorage.setItem('reason-why-choose-us', JSON.stringify(res.data.data)||null);

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
                payload: JSON.parse(sessionStorage.getItem('reason-why-choose-us'))
            });
        }

    }
}