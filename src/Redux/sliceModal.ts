import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModal, TModalRemoveForm, TModalRemoveOrganization, TModalRmCellRule } from "../Types/reduxTypes";

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
    modalRemoveRmCellRule: {
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
        setModalVisibilityRm(state, action: PayloadAction<TModalRmCellRule>) {
            if (action.payload.ruleNumber || action.payload.ruleNumber === 0) state.modalRemoveRmCellRule = action.payload;
            else state.modalRemoveRmCellRule.visible = action.payload.visible;
        }
	}

})

export default sliceModal.reducer;