import { combineReducers } from "redux";
import { createExampleReducer, deleteExampleReducer, editExampleReducer, getExampleReducer } from "./exampleReducer";

export default combineReducers({
    createExample: createExampleReducer,
    getExample: getExampleReducer,
    editExample: editExampleReducer,
    deleteExample: deleteExampleReducer,
});