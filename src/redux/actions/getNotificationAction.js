import axios from "axios";
import {
    GET_NOTIFICATION_ADMIN,
    GET_NOTIFICATION_CUSTOMER
} from '../types';


export const getNotificationAdmin = (next) => {
    return (dispatch) => {
        dispatch({
            type: `${GET_NOTIFICATION_ADMIN}_LOADING`
        });

        
        axios({
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token_admin')}`,
            },
            url: `${process.env.REACT_APP_API_KEY}/notifikasi/all/admin`
        }).then((res) => {
            console.log("data.. ", res);
            console.log("data.. ", res.data);

            dispatch({
                type: `${GET_NOTIFICATION_ADMIN}_FULFILLED`,
                payload: res.data.data
            });
        }).catch((err) => {
            dispatch({
                type: `${GET_NOTIFICATION_ADMIN}_ERROR`,
                error: err.message
            })
        })
    }
}