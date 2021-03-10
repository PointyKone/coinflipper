const { EBUSY } = require('constants');
const Excel = require('exceljs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('How many coin tosses do you want to do? ', async (amount) => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    let htotal = 0;
    let ttotal = 0;

    worksheet.columns = [
        {key: 'flip', width: 50},
        {key: 'totals', width: 20},
    ];
    for (let i = 0; i < amount; i++) {
        let random = Math.random();
        let result;
        if (random < 0.5) {
            result = 'heads';
            htotal++
        } else {
            result = 'tails';
            ttotal++
        }
        worksheet.addRow({flip: result});
    }

    worksheet.getCell('B2').value = `Heads: `
    worksheet.getCell('B3').value = `Tails: `
    worksheet.getCell('C2').value = `${htotal}`
    worksheet.getCell('C3').value = `${ttotal}`

    readline.close();
    await workbook.xlsx.writeFile('results.xlsx').catch(EBUSY => console.log('Cannot edit file while it\'s open!'))
});