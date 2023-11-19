import { IForm, IOrganization, IRules } from "./reduxTypes";

export interface IData {
    path: string,
    forms: IForm[],
    organizations: IOrganization[],
    rules: IRules,
    group: string
}

export interface IFile {
    fileName: string,
    unp: string,
    tables: any[]
}

export type TMonth = 'январь' | 'февраль' | 'март' | 'апрель' | 'май' | 'июнь' | 'июль' | 'август' | 'сентябрь' | 'октябрь' | 'ноябрь' | 'декабрь';