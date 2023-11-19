import getMonthNumber from './getMonthNumber';
import { IForm, IRules } from '../Types/reduxTypes';
import { IFile } from '../Types/electronTypes';


export default function xmlGenerator(file:IFile, dbForm:IForm, dbFormNumber:number, okpo:string, rules:IRules) {

return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE IAS_forms SYSTEM "..\\IAS_Documents.dtd">
<?xml-stylesheet type='text/xsl' href='..\\IAS_Documents.xsl'?>
<IAS_forms>
    <forma formCode="${dbForm.code}" formOkud="${okpo.slice(0, 8)}" formNum="" formType="" formShortName="${dbForm.name}" formFullName=" ">
        <keys>
            <key keyName="Год" keyValue="${dbForm.year}"/>
            <key keyName="${/здрав$/i.test(dbForm.name) ? 'УНП' : 'ОКПО'}" keyValue="${/здрав$/i.test(dbForm.name) ? file.unp : okpo}"/>
            ${dbForm.name === '4-нетрудоспособность' ? `<key keyName="Месяц" keyValue="${getMonthNumber(file.fileName)}"/>` : ''}
            <key keyName="Объем инф-ции" keyValue=""/>
            ${dbForm.name === '1-ссз' ? ` <key keyName="Форма собствен." keyValue=""/>` :
            dbForm.name === '1-медобеспечение ЧАЭС' ? `<key keyName="Ведомство" keyValue=""/>` :
            ''
            }
        </keys>
        <frm_Parts>
            ${(file.tables.map((table:[], tNumber) => 
            `${tNumber ? `\t\t` : ''}<frm_Part formPart="${tNumber + 1}" typePart="T" namePart="">
                <table tableName="T${dbForm.code}${String(tNumber + 1).length === 1 ? `0${tNumber + 1}` : tNumber + 1}T">
                    ${(table.map((row, i, array) => 
                        `${i ? `\t\t\t` : ''}<row idRow="${i + 1}">
                        ${(Object.values(row).map((cell:string, i, array) => {
                            if (!i) return;
                            for (const rule of rules.rmCellRules) {
                                if (dbFormNumber === rule.formNumber && (((tNumber === rule.table.number) && (rule.radio === 'one')) || ((tNumber >= Number(rule.table.from)) && (tNumber <= Number(rule.table.to)) && (rule.radio === 'range')) || rule.radio === 'all')) {
                                    const regexp = new RegExp(rule.regexp.value, rule.regexp.iFlag ? 'i' : '');
                                    if (regexp.test(cell)) return;
                                }
                            }
                           // if (/^чел\.|единиц$/i.test(cell)) return;
                            return `${i > 1 ? `\t\t\t` : ''}<td idCol="${i + 1}" value="${cell ? cell : 'NULL'}"/>${(i === array.length - 1) ? '' : '\n'}`
                        })).join('')}
                    </row>${(i === array.length - 1) ? '' : '\n'}`    
                    )).join('')}
                </table>
            </frm_Part>\n`
            )).join('')}
            <frm_Part formPart="98" typePart="B" namePart="">
                <table tableName="T${dbForm.code}98B">
                </table>
            </frm_Part>
            <frm_Part formPart="99" typePart="E" namePart="">
                <table tableName="T${dbForm.code}99E">
                </table>
            </frm_Part>
        </frm_Parts>
    </forma>
</IAS_forms>`

}