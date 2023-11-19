import {combineReducers, configureStore} from "@reduxjs/toolkit";
import sliceDatabase from "./sliceDatabase";
import sliceMenu from "./sliceMenu";
import sliceConverter from "./sliceConverter";
import sliceEditForm from "./sliceEditForm";
import sliceEditOrganization from "./sliceEditOrganization";
import sliceSettings from "./sliceSettings";
import sliceModal from "./sliceModal";

export const rootReducer = combineReducers({
    sliceDatabase,
    sliceMenu,
    sliceConverter,
    sliceEditForm,
    sliceEditOrganization,
    sliceSettings,
    sliceModal
});

export const setStore = () => configureStore({reducer: rootReducer});