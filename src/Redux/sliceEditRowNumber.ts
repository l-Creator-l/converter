import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEditRowNumber, TSetRowNumber, TRulesForm, IDatabase } from "../Types/reduxTypes";

const initialState:TEditRowNumber = {
	form: {
		name: '',
		year: ''
	},
	tables: []
}

export const sliceEditRowNumber = createSlice({
	name: 'edit row number',
	initialState,
	reducers: {
        setForm(state, action:PayloadAction<TRulesForm>) {

            const database:IDatabase = JSON.parse(localStorage.getItem('database'));
            const rule = database.rules.editRowNumber.find(rule => rule.form.name === action.payload.name && rule.form.year === action.payload.year);

            if (rule) {
                state.form = rule.form;
                state.tables = rule.tables;
            }
            else {
                state.form = action.payload;
                state.tables = [];
            }

        },
		setTableAndRow(state, action:PayloadAction<TSetRowNumber>) {

            const index = state.tables.findIndex(table => table.tNumber === action.payload.tNumber);
            const tables = [...state.tables];

            if (index !== -1) tables[index] = { tNumber: action.payload.tNumber as number, firstRowNumber: action.payload.firstRowNumber as number }
            else tables.push({ tNumber: action.payload.tNumber as number, firstRowNumber: action.payload.firstRowNumber as number });

            tables.sort((a, b) => a.tNumber - b.tNumber);
            state.tables = tables;
            
		},
        removeRuleItem(state, action:PayloadAction<number>) {
            const tables = [...state.tables];
            tables.splice(action.payload, 1);
            state.tables = tables;
        }
	}
})

export default sliceEditRowNumber.reducer;