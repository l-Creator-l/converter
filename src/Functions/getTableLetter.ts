export default function getTableLetter(tableName: string, tableNumber: number) {
    if (tableName === '1-ссз' && tableNumber === 17) return 'P';
    else return 'T';
}