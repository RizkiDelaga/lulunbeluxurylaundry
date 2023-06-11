import axios from "axios";
import {
    GET_PROFILE_ACCOUNT_CUSTOMER,
    GET_PROFILE_ACCOUNT_ADMIN,
} from '../types';


export const getProfileAccountAdmin = (access_token_admin) => {
    return (dispatch) => {
        dispatch({
            type: `${GET_PROFILE_ACCOUNT_ADMIN}_LOADING`
        });

        if (!localStorage.getItem('admin_profile_account')) {
            axios({
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token_admin|| localStorage.getItem('access_token_admin')}`,
                },
                url: `${process.env.REACT_APP_API_KEY}/admin/my/profile`
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                localStorage.setItem('admin_profile_account', JSON.stringify(res.data.data));

                dispatch({
                    type: `${GET_PROFILE_ACCOUNT_ADMIN}_FULFILLED`,
                    payload: res.data.data
                });
            }).catch((err) => {
                dispatch({
                    type: `${GET_PROFILE_ACCOUNT_ADMIN}_ERROR`,
                    error: err.message
                })
            })
        } else {
            dispatch({
                type: `${GET_PROFILE_ACCOUNT_ADMIN}_FULFILLED`,
                payload: JSON.parse(localStorage.getItem('admin_profile_account'))
            });
        }

    }
}


export const getProfileAccountCustomer = (access_token) => {
    return (dispatch) => {
        dispatch({
            type: `${GET_PROFILE_ACCOUNT_CUSTOMER}_LOADING`
        });

        if (!localStorage.getItem('my_profile_account')) {
            axios({
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token|| localStorage.getItem('access_token')}`,
                },
                url: `${process.env.REACT_APP_API_KEY}/user`
            }).then((res) => {
                console.log("data.. ", res);
                console.log("data.. ", res.data);
                localStorage.setItem('my_profile_account', JSON.stringify(res.data.data));

                dispatch({
                    type: `${GET_PROFILE_ACCOUNT_CUSTOMER}_FULFILLED`,
                    payload: res.data.data
                });
            }).catch((err) => {
                dispatch({
                    type: `${GET_PROFILE_ACCOUNT_CUSTOMER}_ERROR`,
                    error: err.message
                })
            })
        } else {
            dispatch({
                type: `${GET_PROFILE_ACCOUNT_CUSTOMER}_FULFILLED`,
                payload: JSON.parse(localStorage.getItem('my_profile_account'))
            });
        }

    }
}