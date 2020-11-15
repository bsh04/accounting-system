import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

export const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData); // Создание объектов полей
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'}); // Создание книги из данных
    const data = new Blob([excelBuffer], {type: fileType}); // Создание таблицы
    FileSaver.saveAs(data, fileName + fileExtension); // Сохранение на ПК
}
