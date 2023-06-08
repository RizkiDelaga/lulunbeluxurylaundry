import axios from "axios";
import {
    CREATE_EXAMPLE,
    GET_EXAMPLE,
    EDIT_EXAMPLE,
    DETELE_EXAMPLE
} from '../types';

export const getExample = () => {
    return (dispatch) => {
        dispatch({
            type: `${GET_EXAMPLE}_LOADING`
        });

        axios({
            method: 'GET',
            url: 'https://6266738863e0f382568253d1.mockapi.io/api/custom-todo'
        }).then((res) => {
            console.log("data.. ", res);
            console.log("data.. ", res.data);
            dispatch({
                type: `${GET_EXAMPLE}_FULFILLED`,
                payload: res.data
            });
        }).catch((err) => {
            dispatch({
                type: `${GET_EXAMPLE}_ERROR`,
                error: err.message
            })
        })
    }
}



export const createExample = (dataExample) => {

    return (dispatch) => {
        dispatch({
            type: `${CREATE_EXAMPLE}_LOADING`
        });

        axios({
            method: 'POST',
            url: 'https://6266738863e0f382568253d1.mockapi.io/api/custom-todo',
            data: dataExample,
            // headers: {
            //     'content-type': 'multipart/form-data',
            //     'authorization': `${localStorage.getItem('access_token')}`
            // }
        }).then((res) => {
            console.log("data.. create", res);
            dispatch({
                type: `${CREATE_EXAMPLE}_FULFILLED`,
                payload: res
            });
        }).catch((err) => {
            console.log("err.. create", err);
            dispatch({
                type: `${CREATE_EXAMPLE}_ERROR`,
                error: err
            })
        })
    }
}

export const editExample = (id, dataExample) => {

    return (dispatch) => {
        dispatch({
            type: `${EDIT_EXAMPLE}_LOADING`
        });
        console.log("data.. dataExample", dataExample);


        axios({
            method: 'PUT',
            url: `https://6266738863e0f382568253d1.mockapi.io/api/custom-todo/${id}`,
            data: dataExample,
            // headers: {
            //     'content-type': 'multipart/form-data',
            //     'authorization': `${localStorage.getItem('access_token')}`
            // }
        }).then((res) => {
            console.log("data.. edit", res);
            dispatch({
                type: `${EDIT_EXAMPLE}_FULFILLED`,
                payload: res
            });
            dispatch(getExample());
        }).catch((err) => {
            console.log("err.. edit", err);
            dispatch({
                type: `${EDIT_EXAMPLE}_ERROR`,
                error: err
            })
        })
    }
}

// export const deleteExample = (id) => {
//     return (dispatch) => {
//         dispatch({
//             type: `${DETELE_EXAMPLE}_LOADING`
//         });

//         axios({
//             method: 'DELETE',
//             url: `https://localla-api.herokuapp.com/api/v1/product/${id}`,
//             headers: {
//                 'authorization': `${localStorage.getItem('access_token')}`
//             }
//         }).then((res) => {
//             console.log("data.. delete ", res);
//             dispatch({
//                 type: `${DETELE_EXAMPLE}_FULFILLED`,
//             });
//             // dispatch(getProductBySellerId(localStorage.getItem('myId')));
//         }).catch((err) => {
//             console.log("error.. delete ", err);
//             dispatch({
//                 type: `${DETELE_EXAMPLE}_ERROR`,
//                 error: err.message
//             })
//         })
//     }
// }