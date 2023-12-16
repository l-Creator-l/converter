import getMonthNumber from './getMonthNumber';

export default function getAdditionalKey(formName:string, fileName:string, region:number) {

    switch(formName) {

        case '4-нетрудоспособность':
            return `${getMonthNumber(fileName)}_1${region}`;
        break;

        case '1-медобеспечение ЧАЭС':
            return `1${region}_`;
        break;

        case '1-ссз':
            return `1${region}_`;
        break;

        default: return `1${region}`;

    }

}