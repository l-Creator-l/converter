import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditForm } from "../Types/reduxTypes";

const initialState:IEditForm = {
	editMode: false,
    editTarget: {
        number: 0,
        name: '',
        code: '',
        year: ''
    },
    editInputs: {
        name: '',
        code: '',
        year: '',
        nameError: false,
        codeError: false,
        yearError: false
    }
}

export const sliceEditForm = createSlice({
	name: 'edit forms',
	initialState,
	reducers: {
		setEditForm(state, action: PayloadAction<number>) {
            const database = JSON.parse(localStorage.getItem('database'));
		    const form = database.forms[action.payload];
			state.editMode = true;
            state.editTarget = {
                number: action.payload,
                name: form.name,
                code: form.code,
                year: form.year
            };
            state.editInputs = {
                name: form.name,
                code: form.code,
                year: form.year,
                nameError: false,
                codeError: false,
                yearError: false
            }
		},
        editName(state, action: PayloadAction<string>) {
            state.editInputs.name = action.payload;
        },
        editCode(state, action: PayloadAction<string>) {
            state.editInputs.code = action.payload;
            if (/^[\da-z]*$/i.test(action.payload)) state.editInputs.codeError = false;
            else state.editInputs.codeError = true;
        },
        editYear(state, action: PayloadAction<string>) {
            state.editInputs.year = action.payload;
            if (/^\d*$/.test(action.payload)) state.editInputs.yearError = false;
            else state.editInputs.yearError = true;
        },
        closeEditForm(state) {
            state.editMode = false;
            state.editTarget = initialState.editTarget;
            state.editInputs = initialState.editInputs;
        },
	}
})

export default sliceEditForm.reducer;