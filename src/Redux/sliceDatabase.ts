import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDatabase, IForm, TSortFormsBy, IOrganization, TSortOrganizationsBy, TEditForm, TEditOrganization, TRemoveCellForm, TEditRowNumber } from "../Types/reduxTypes";

const initialState: IDatabase = {
	forms: [],
	sortFormsBy: {
		value: '',
		from: ''
	},
	organizations: [],
	sortOrganizationsBy : {
		value: '',
		from: ''
	},
    rules: {
        removeCell: [],
        editRowNumber: []
    }
}

export const sliceDatabase = createSlice({
	name: 'database',
	initialState,
	reducers: {
		setDatabse(state, action: PayloadAction<IDatabase>) {
			state.forms = action.payload.forms;
			state.sortFormsBy = action.payload.sortFormsBy;
			state.organizations = action.payload.organizations;
			state.sortOrganizationsBy = action.payload.sortOrganizationsBy;
            state.rules = action.payload.rules;
		},
		setForm(state, action: PayloadAction<IForm>) {
			state.forms.push(action.payload);
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			database.forms.push(action.payload);
			localStorage.setItem('database', JSON.stringify(database));
		},
		removeForm(state, action: PayloadAction<number>) {
			state.forms.splice(action.payload, 1);
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			database.forms.splice(action.payload, 1);
			localStorage.setItem('database', JSON.stringify(database));
		},
		sortForms(state, action: PayloadAction<TSortFormsBy>) {
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			state.sortFormsBy = action.payload;
			if (state.sortFormsBy.value === 'name' && state.sortFormsBy.from === 'max') state.forms.sort((a:IForm, b:IForm) => a.name.localeCompare(b.name));
			else if (state.sortFormsBy.value === 'name' && state.sortFormsBy.from === 'min') state.forms.sort((a:IForm, b:IForm) => b.name.localeCompare(a.name));
			else if (state.sortFormsBy.value === 'code' && state.sortFormsBy.from === 'max') state.forms.sort((a:IForm, b:IForm) => Number(b.code) - Number(a.code));
			else if (state.sortFormsBy.value === 'code' && state.sortFormsBy.from === 'min') state.forms.sort((a:IForm, b:IForm) => Number(a.code) - Number(b.code));
			else if (state.sortFormsBy.value === 'year' && state.sortFormsBy.from === 'max') state.forms.sort((a:IForm, b:IForm) => Number(b.year) - Number(a.year));
			else if (state.sortFormsBy.value === 'year' && state.sortFormsBy.from === 'min') state.forms.sort((a:IForm, b:IForm) => Number(a.year) - Number(b.year));
			database.forms = state.forms;
			database.sortFormsBy = state.sortFormsBy;
			localStorage.setItem('database', JSON.stringify(database));
        },
        resetForm(state, action: PayloadAction<TEditForm>) {
            const database:IDatabase = JSON.parse(localStorage.getItem('database'));
		    database.forms[action.payload.number] = {
                name: action.payload.name,
                code: action.payload.code,
                year: action.payload.year
            };
            state.forms = database.forms;
            localStorage.setItem('database', JSON.stringify(database));
        },
		setOrganization(state, action: PayloadAction<IOrganization>) {
			state.organizations.push(action.payload);
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			database.organizations.push(action.payload);
			localStorage.setItem('database', JSON.stringify(database));
		},
		removeOrganization(state, action: PayloadAction<number>) {
			state.organizations.splice(action.payload, 1);
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			database.organizations.splice(action.payload, 1);
			localStorage.setItem('database', JSON.stringify(database));
		},
		sortOrganizations(state, action: PayloadAction<TSortOrganizationsBy>) {
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			state.sortOrganizationsBy = action.payload;
			if (state.sortOrganizationsBy.value === 'name' && state.sortOrganizationsBy.from === 'max') state.organizations.sort((a:IOrganization, b:IOrganization) => a.name.localeCompare(b.name));
			else if (state.sortOrganizationsBy.value === 'name' && state.sortOrganizationsBy.from === 'min') state.organizations.sort((a:IOrganization, b:IOrganization) => b.name.localeCompare(a.name));
			else if (state.sortOrganizationsBy.value === 'okpoGood' && state.sortOrganizationsBy.from === 'max') state.organizations.sort((a:IOrganization, b:IOrganization) => Number(b.okpoGood) - Number(a.okpoGood));
			else if (state.sortOrganizationsBy.value === 'okpoGood' && state.sortOrganizationsBy.from === 'min') state.organizations.sort((a:IOrganization, b:IOrganization) => Number(a.okpoGood) - Number(b.okpoGood));
			else if (state.sortOrganizationsBy.value === 'okpoBad' && state.sortOrganizationsBy.from === 'max') state.organizations.sort((a:IOrganization, b:IOrganization) => Number(b.okpoBad) - Number(a.okpoBad));
			else if (state.sortOrganizationsBy.value === 'okpoBad' && state.sortOrganizationsBy.from === 'min') state.organizations.sort((a:IOrganization, b:IOrganization) => Number(a.okpoBad) - Number(b.okpoBad));
			database.organizations = state.organizations;
			database.sortOrganizationsBy = state.sortOrganizationsBy;
			localStorage.setItem('database', JSON.stringify(database));
        },
        resetOrganization(state, action: PayloadAction<TEditOrganization>) {
            const database:IDatabase = JSON.parse(localStorage.getItem('database'));
		    database.organizations[action.payload.number] = {
                name: action.payload.name,
                okpoGood: action.payload.okpoGood,
                okpoBad: action.payload.okpoBad
            };
            state.organizations = database.organizations;
            localStorage.setItem('database', JSON.stringify(database));
        },
        setRmCellRule(state, action: PayloadAction<TRemoveCellForm>) {
            const newRule = {
                form: {
                    name: action.payload.formNumber === 'all' ? '' : state.forms[Number(action.payload.formNumber)].name,
                    year: action.payload.formNumber === 'all' ? '' : state.forms[Number(action.payload.formNumber)].year,
                    all: action.payload.formNumber === 'all' ? true : false
                },
                radio: action.payload.radio,
                table: action.payload.table,
                regexp: action.payload.regexp
            };
            state.rules.removeCell.push(newRule);
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			database.rules.removeCell.push(newRule);
			localStorage.setItem('database', JSON.stringify(database));
        },
        removeRmCellRule(state, action: PayloadAction<number>) {
			state.rules.removeCell.splice(action.payload, 1);
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			database.rules.removeCell.splice(action.payload, 1);
			localStorage.setItem('database', JSON.stringify(database));
		},
        setEdRowNumberRule(state, action: PayloadAction<TEditRowNumber>) {
            const database:IDatabase = JSON.parse(localStorage.getItem('database'));
            const index = database.rules.editRowNumber.findIndex(rule => rule.form.name === action.payload.form.name && rule.form.year === action.payload.form.year);
            const newRule = action.payload;

            if (index !== -1) {
                database.rules.editRowNumber[index] = newRule;
                state.rules.editRowNumber[index] = newRule;
            }
            else {
                database.rules.editRowNumber.push(newRule);
                state.rules.editRowNumber.push(newRule);
            }

            localStorage.setItem('database', JSON.stringify(database));
        },
        removeEdRowNumberRule(state, action: PayloadAction<number>) {
			state.rules.editRowNumber.splice(action.payload, 1);
			const database:IDatabase = JSON.parse(localStorage.getItem('database'));
			database.rules.editRowNumber.splice(action.payload, 1);
			localStorage.setItem('database', JSON.stringify(database));
		}
	}

})

export default sliceDatabase.reducer;