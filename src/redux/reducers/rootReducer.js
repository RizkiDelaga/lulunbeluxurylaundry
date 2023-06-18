import {
    combineReducers
} from "redux";
import {
    getGeneralInformationReducer,
    getReasonWhyChooseUsReducer,
    getHowToOrderReducer,
    getTestimonyReducer,
    getFAQReducer,
    getGalleryReducer
} from "./getBusinessInformationReducer";
import {
    getProfileAccountAdminReducer,
    getProfileAccountCustomerReducer
} from "./getProfileAccountReducer";


export default combineReducers({
    // ======== Business Information Reducer ========
    getGeneralInformation: getGeneralInformationReducer,
    getReasonWhyChooseUs: getReasonWhyChooseUsReducer,
    getHowToOrder: getHowToOrderReducer,
    getTestimony: getTestimonyReducer,
    getFAQ: getFAQReducer,
    getGallery: getGalleryReducer,

    // ======== Profile Account Reducer ========
    getProfileAccountCustomer: getProfileAccountCustomerReducer,
    getProfileAccountAdmin: getProfileAccountAdminReducer,
});