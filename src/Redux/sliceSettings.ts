import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettings } from "../Types/reduxTypes";

const initialState:ISettings = {
	group: 'by forms',
    version: ''
}

export const sliceSettings = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setGroup(state, action: PayloadAction<string>) {
			state.group = action.payload;
		},
        setVersion(state, action: PayloadAction<string>) {
			state.version = action.payload;
		}
	}

})

export default sliceSettings.reducer;