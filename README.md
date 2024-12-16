# Hungarian Bank Account Validator

A simple utility to validate and format Hungarian bank account numbers.

## Installation

```bash
npm install hu-bank-account-validator
```

## Usage

```javascript
const validateBankAccount = require('hu-bank-account-validator');

const result = validateBankAccount('10002003-93489306');
console.log(result);
// Output: { name: 'Magyar Államkincstár', number: '10002003-93489306-00000000', bic: 'HUSTHUHB', iban: 'HU90100020039348930600000000' }
```

## Features

- Validates Hungarian bank account numbers based on the check digits
- Identifies the associated bank by its prefix
- Input can be a number or string, it can have additional characters other than numbers(everything will be removed first)
- Output will be in XXXXXXXX-YYYYYYYY-ZZZZZZZZ format(suffixed with 00000000 if it was only 16 digits)
- Also calculates a valid IBAN number from the validated bank account number

## Assets
Theres a helper script to fetch the most recent bank codes, BIC codes and bank names from MNB. Run `npm fetch-bank-codes` to generate a fresh validBankCodes.json file in the assets folder. Here you can find a bicCodes.json file too, which is used to name the bank better, because the name formiatting in the MNB excel file is sadly not perfect. If not found in bicCodes.json, it will fallback to the name found in the excel file.

## License

MIT
