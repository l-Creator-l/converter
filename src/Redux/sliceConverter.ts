import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConverter, TConverterResult } from "../Types/reduxTypes";

const initialState: IConverter = {
	inputValue: '',
	isValid: false,
    loading: false,
    result: {
        success: 0,
        notFound: [],
        copy: [],
        error: ''
    },
    showResult: false
}

export const sliceConverter = createSlice({
	name: 'converter',
	initialState,
	reducers: {
		setInputValue(state, action: PayloadAction<string>) {
			const value = action.payload;
			state.inputValue = value;
			if (/^[a-z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*$/i.test(value)) state.isValid = true;
			else state.isValid = false;
		},
        setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
        setResult(state, action: PayloadAction<TConverterResult>) {
			state.result = action.payload;
		},
        resultVisibilityChange(state, action: PayloadAction<boolean>) {
			state.showResult = action.payload;
		}
	}

})

export default sliceConverter.reducer;