# Hungarian Bank Account Validator

A simple utility to validate and format Hungarian bank account numbers.

## Installation

```bash
npm install hu-bank-account-validator
```

## Usage

```javascript
const validateBankAccount = require('hu-bank-account-validator');

const result = validateBankAccount('123456781234567812345678');
console.log(result);
// Output: { name: 'OTP Bank', number: '12345678-12345678-12345678' }
```

## Features

- Validates Hungarian bank account numbers.
- Formats numbers in the Hungarian style.
- Identifies the associated bank by its prefix.
- Input can be a number or string, output will be in XXXXXXXX-YYYYYYYY-ZZZZZZZZ format

## Assets
Theres a helper script to fetch the most recent bank codes, BIC codes and bank names from MNB. Run `npm fetch-bank-codes` to generate a fresh validBankCodes.json file in the assets folder. Here you can find a bicCodes.json file too, which is used to name the bank better, because the name formiatting in the MNB excel file is sadly not perfect. If not found in bicCodes.json, it will fallback to the name found in the excel file.

## License

MIT
