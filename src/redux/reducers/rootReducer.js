import { combineReducers } from "redux";
import { createExampleReducer, deleteExampleReducer, editExampleReducer, getExampleReducer } from "./exampleReducer";
import { getGeneralInformationReducer, getReasonWhyChooseUsReducer } from "./getBusinessInformationReducer";

export default combineReducers({
    // ======== Example Reducer ========
    createExample: createExampleReducer,
    getExample: getExampleReducer,
    getGeneralInformation: getGeneralInformationReducer,
    getReasonWhyChooseUs: getReasonWhyChooseUsReducer,
    editExample: editExampleReducer,
    deleteExample: deleteExampleReducer,

    // ======== Admin Reducer ========
    // createAdmin: createAdminReducer,
    // getAdmin: getAdminReducer,
    // editAdmin: editAdminReducer,
    // deleteAdmin: deleteAdminReducer,

    // ======== General Information Reducer ========
    // createGeneralInformation: createGeneralInformationReducer,
    // getGeneralInformation: getGeneralInformationReducer,
    // editGeneralInformation: editGeneralInformationReducer,
    // deleteGeneralInformation: deleteGeneralInformationReducer,

    // ======== Laundry Type Reducer ========
    // createLaundryType: createLaundryTypeReducer,
    // getLaundryType: getLaundryTypeReducer,
    // editLaundryType: editLaundryTypeReducer,
    // deleteLaundryType: deleteLaundryTypeReducer,

    // ======== Service Type Reducer ========
    // ======== About Us Reducer ========
    // ======== Reasons Why Choose Us Reducer ========
    // ======== ReasonsWhyChooseUs Reducer ========
    // ======== How To Order Reducer ========
    // ======== Gallery Reducer ========
    // ======== Frequently Asked Questions Reducer ========
    // ======== Payment Method Reducer ========

    // ======== Order Reducer ========
    // ======== Event Reducer ========
    // ======== Finance Reducer ========
    // ======== Customer Reducer ========
});