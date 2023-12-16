import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModal, TModalRemoveForm, TModalRemoveOrganization, TModalRemoveRule } from "../Types/reduxTypes";

const initialState:IModal = {
    modalRemoveForm: {
        visible: false,
        formName: '',
        formNumber: 0
    },
    modalRemoveOrganization: {
        visible: false,
        organizationName: '',
        organizationNumber: 0
    },
    modalRemoveCell: {
        visible: false,
        ruleNumber: 0
    },
    modalRemoveNumberRule: {
        visible: false,
        ruleNumber: 0
    }
}

export const sliceModal = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalVisibilityF(state, action: PayloadAction<TModalRemoveForm>) {
            if (action.payload.formName) state.modalRemoveForm = action.payload;
            else state.modalRemoveForm.visible = action.payload.visible;
		},
        setModalVisibilityO(state, action: PayloadAction<TModalRemoveOrganization>) {
            if (action.payload.organizationName) state.modalRemoveOrganization = action.payload;
            else state.modalRemoveOrganization.visible = action.payload.visible;
		},
        setModalVisibilityRm(state, action: PayloadAction<TModalRemoveRule>) {
            if (action.payload.ruleNumber || action.payload.ruleNumber === 0) state.modalRemoveCell = action.payload;
            else state.modalRemoveCell.visible = action.payload.visible;
        },
        setModalVisibilityEd(state, action: PayloadAction<TModalRemoveRule>) {
            if (action.payload.ruleNumber || action.payload.ruleNumber === 0) state.modalRemoveNumberRule = action.payload;
            else state.modalRemoveNumberRule.visible = action.payload.visible;
        }
	}

})

export default sliceModal.reducer;