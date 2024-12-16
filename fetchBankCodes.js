const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// URL of the online Excel file
const excelUrl = 'https://www.mnb.hu/letoltes/sht.xlsx';

// Path to the bicCodes.json file
const bicCodesPath = path.join(__dirname, 'assets', 'bicCodes.json');

// Fetch the Excel file and process it
const fetchBankCodes = async () => {
    try {
        // Load the bicCodes.json file
        const bicCodes = JSON.parse(fs.readFileSync(bicCodesPath, 'utf8'));
        const response = await fetch(excelUrl);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = xlsx.read(arrayBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // Process the data to extract bank codes and names
        const validBankCodes = {};
        jsonData.forEach(row => {
            const bankCode = parseInt(row['Branch office code'].toString().slice(0, 3), 10);
            const bicCode = row['BIC code'];
            let bankName = row['Name of the branch office'];

            // Override the bank name if the BIC code exists in bicCodes.json
            if (bicCodes[bicCode]) {
                bankName = bicCodes[bicCode];
            }

            if (bankCode && bicCode && bankName) {
                if (!validBankCodes[bankCode]) {
                    validBankCodes[bankCode] = {
                        bicCode: bicCode,
                        bankName: bankName
                    };
                }
            }
        });

        // Generate a JavaScript file
        const jsContent = `module.exports = ${JSON.stringify(validBankCodes, null, 2)};`;
        fs.writeFileSync(path.join(__dirname, 'assets/validBankCodes.js'), jsContent);

        // Generate a JSON file (optional)
        fs.writeFileSync(path.join(__dirname, 'assets/validBankCodes.json'), JSON.stringify(validBankCodes, null, 2));

        console.log('Bank codes fetched and files generated successfully.');
    } catch (error) {
        console.error('Error fetching bank codes:', error);
    }
};

fetchBankCodes();