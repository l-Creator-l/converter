import { rootReducer, setStore } from "../Redux/store";

export interface IDatabase {
    forms: IForm[],
    sortFormsBy: TSortFormsBy,
    organizations: IOrganization[],
    sortOrganizationsBy: TSortOrganizationsBy,
    rules: IRules
}

export interface IForm {
    name: string,
    code: string,
    year: string
}

export type TSortFormsBy = {
	value: 'name' | 'code' | 'year' | '',
	from: 'max' | 'min' | ''
}

export interface IOrganization {
    name: string,
    okpoGood: string,
    okpoBad: string,
}

export type TSortOrganizationsBy = {
	value: 'name' | 'okpoGood' | 'okpoBad' | '',
	from: 'max' | 'min' | ''
}

export interface IMenu {
    active: 'converter' | 'forms' | 'organizations' | 'rules' | 'settings'
}

export interface IConverter {
    inputValue: string,
    isValid: boolean,
    loading: boolean,
    result: TConverterResult,
    showResult: boolean
}

export type TConverterResult = {
    success: number,
    notFound: string[],
    copy: string[],
    error: string
}

export interface IEditForm {
    editMode: boolean,
    editTarget: TEditForm,
    editInputs: {
        name: string,
        code: string,
        year: string,
        nameError: boolean,
        codeError: boolean,
        yearError: boolean
    }
}

export type TEditForm = {
    number: number,
    name: string,
    code: string,
    year: string
}

export interface IEditOrganization {
    editMode: boolean,
    editTarget: TEditOrganization,
    editInputs: {
        name: string,
        okpoGood: string,
        okpoBad: string,
        nameError: boolean,
        okpoGoodError: boolean,
        okpoBadError: boolean
    }
}

export type TEditOrganization = {
    number: number,
    name: string,
    okpoGood: string,
    okpoBad: string
}

export interface IRules {
    removeCell: TRemoveCell[],
    editRowNumber: TEditRowNumber[]
}

export type TRemoveCell = {
    form: {
        name: string,
        year: string,
        all: boolean
    }
    radio: 'one' | 'range' | 'all',
    table: {
        number: number | '',
        from: number | '',
        to: number | ''
    },
    regexp: {
        value: string,
        iFlag: boolean
    }
}

export type TRemoveCellForm = {
    formNumber: number | 'all' | '',
    radio: 'one' | 'range' | 'all',
    table: {
        number: number | '',
        from: number | '',
        to: number | ''
    },
    regexp: {
        value: string,
        iFlag: boolean
    }
}

export type TEditRowNumber = {
    form: TRulesForm,
    tables: TEditTable[]
}

export type TEditTable = {
    tNumber: number,
    firstRowNumber: number
}

export type TEditRowNumberForm = {
    formNumber: number | '',
	tNumber: number | '',
	firstRowNumber: number | ''
}

export type TSetRowNumber = {
	tNumber: number | '',
	firstRowNumber: number | ''
}

export type TRulesForm = {
    name: string,
    year: string
}

export interface ISettings {
    group: string,
    version: string
}

export interface IModal {
    modalRemoveForm: TModalRemoveForm,
    modalRemoveOrganization: TModalRemoveOrganization,
    modalRemoveCell: TModalRemoveRule,
    modalRemoveNumberRule: TModalRemoveRule
}

export type TModalRemoveForm = {
    visible: boolean
    formName?: string,
    formNumber?: number
}

export type TModalRemoveOrganization = {
    visible: boolean
    organizationName?: string,
    organizationNumber?: number
}

export type TModalRemoveRule = {
    visible: boolean,
    ruleNumber?: number
}

export type TRootReducer = ReturnType<typeof rootReducer>;

type TStore = ReturnType<typeof setStore>;

export type TDispatch = TStore["dispatch"];