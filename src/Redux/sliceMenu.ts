import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMenu } from "../Types/reduxTypes";

const initialState:IMenu = {
	active: 'converter'
}

export const sliceMenu = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setActiveItem(state, action: PayloadAction<'converter' | 'forms' | 'organizations' | 'rules' | 'settings'>) {
			state.active = action.payload;
		}
	}

})

export default sliceMenu.reducer;