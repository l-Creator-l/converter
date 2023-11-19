import getMonthNumber from './getMonthNumber';

export default function getAdditionalKey(formName:string, fileName:string) {

    switch(formName) {

        case '4-нетрудоспособность':
            return getMonthNumber(fileName);
        break;

        default: return false;

    }

}