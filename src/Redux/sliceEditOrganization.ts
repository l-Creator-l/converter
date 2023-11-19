import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditOrganization } from "../Types/reduxTypes";

const initialState:IEditOrganization = {
	editMode: false,
    editTarget: {
        number: 0,
        name: '',
        okpoGood: '',
        okpoBad: ''
    },
    editInputs: {
        name: '',
        okpoGood: '',
        okpoBad: '',
        nameError: false,
        okpoGoodError: false,
        okpoBadError: false
    }
}

export const sliceEditOrganization = createSlice({
	name: 'edit organization',
	initialState,
	reducers: {
		setEditOrganization(state, action: PayloadAction<number>) {
            const database = JSON.parse(localStorage.getItem('database'));
		    const organization = database.organizations[action.payload];
			state.editMode = true;
            state.editTarget = {
                number: action.payload,
                name: organization.name,
                okpoGood: organization.okpoGood,
                okpoBad: organization.okpoBad
            };
            state.editInputs = {
                name: organization.name,
                okpoGood: organization.okpoGood,
                okpoBad: organization.okpoBad,
                nameError: false,
                okpoGoodError: false,
                okpoBadError: false
            }
		},
        editName(state, action: PayloadAction<string>) {
            state.editInputs.name = action.payload;
        },
        editOKPOGood(state, action: PayloadAction<string>) {
            state.editInputs.okpoGood = action.payload;
            if (/^\d*$/i.test(action.payload)) state.editInputs.okpoGoodError = false;
            else state.editInputs.okpoGoodError = true;
        },
        editOKPOBad(state, action: PayloadAction<string>) {
            state.editInputs.okpoBad = action.payload;
            if (/^\d*$/.test(action.payload)) state.editInputs.okpoBadError = false;
            else state.editInputs.okpoBadError = true;
        },
        closeEditOrganization(state) {
            state.editMode = false;
            state.editTarget = initialState.editTarget;
            state.editInputs = initialState.editInputs;
        },
	}
})

export default sliceEditOrganization.reducer;