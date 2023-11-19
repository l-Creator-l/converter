import { TMonth } from '../Types/electronTypes';

export default function getMonthNumber(fileName:string) {

    const months = {
        'январь': '01',
        'февраль': '02',
        'март': '03',
        'апрель': '04',
        'май': '05',
        'июнь': '06',
        'июль': '07',
        'август': '08',
        'сентябрь': '09',
        'октябрь': '10',
        'ноябрь': '11',
        'декабрь': '12'
    }

    const monthName = fileName.match(/([а-яё]+) \d{4}_/i)[1] as TMonth;

    const monthNumber = months[monthName];

    return monthNumber;

}